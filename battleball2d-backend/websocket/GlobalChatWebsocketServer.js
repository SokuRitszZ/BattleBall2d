const {nanoid} = require("nanoid");
const AuthWebsocketServer = require("./AuthWebsocketServer");

class GlobalChatWebsocketServer extends AuthWebsocketServer {
  static pool = new Set();

  static broadCast(msg) {
    GlobalChatWebsocketServer.pool.forEach(server => {
      server.sendMessage({
        service: "chat",
        data: {
          message: msg
        }
      });
    });
  }

  constructor(token, conn) {
    super(token, conn);
  }

  onStart() {
    GlobalChatWebsocketServer.pool.add(this);
    const message = {
      id: nanoid(11),
      content: `${this.user.username}上线了！`,
      time: new Date(),
      sender: "Server"
    };
    GlobalChatWebsocketServer.broadCast(message);
  }

  handle(data) {
    this.promiseGetUser.then(() => {
      const content = data.content;
      const message = {
        id: nanoid(11),
        content: content,
        time: new Date(),
        sender: this.user.username
      };
      GlobalChatWebsocketServer.broadCast(message);
    });
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