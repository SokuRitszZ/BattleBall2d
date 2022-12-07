const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

const nanoid = size => {
  let string = new Array(size).fill(0);
  return string.map(c => Math.floor(Math.random() * 16).toString(16)).join("");
}

class GlobalChatWebsocketServer {
  static pool = new Set();
  conn;
  user;

  constructor(token, conn) {
    token = jwt.decode(token);

    this.conn = conn;
    User.findOne({
      where: {
        id: token.id
      }
    })
      .then(user => {
        this.user = user;
        GlobalChatWebsocketServer.pool.add(this);
        // 信息
        conn.on("text", str => {
          const message = {
            id: nanoid(11),
            content: str,
            time: new Date(),
            sender: this.user.username
          };
          GlobalChatWebsocketServer.broadCast(message);
        });

        const message = {
          id: nanoid(11),
          content: `${this.user.username}上线了！`,
          time: new Date(),
          sender: "Server"
        };
        GlobalChatWebsocketServer.broadCast(message);
      });
  }

  static broadCast(msg) {
    GlobalChatWebsocketServer.pool.forEach(server => {
      server.sendText(msg);
    });
  }

  sendText(msg) {
    this.conn.sendText(JSON.stringify(msg));
  }

  close() {
    GlobalChatWebsocketServer.pool.delete(this);
    const message = {
      id: nanoid(11),
      content: `${this.user.username}下线了...`,
      time: new Date(),
      sender: "Server"
    };
    GlobalChatWebsocketServer.broadCast(message);
  }
};

module.exports = GlobalChatWebsocketServer;