const ws = require("nodejs-websocket");
const jwt = require("jsonwebtoken");
const {JWT_SECRETKEY} = require("../config.json");
const GlobalChatWebsocketServer = require("./GlobalChatWebsocketServer");
const GameWebsocketServer = require("./GameWebsocketServer");

const conns = new Set();

const server = ws.createServer(conn => {
  const [_, token] = conn.path.split('/');
  try {
    jwt.verify(token, JWT_SECRETKEY);
    conns.add(conn);
    conn.__server = {};
    conn.__server["chat"] = new GlobalChatWebsocketServer(token, conn);
    conn.on("text", str => {
      const message = JSON.parse(str);
      const service = message["service"];
      switch (service) {
        case "chat":
          break;
        case "game":
          if (!conn.__server[service])
            conn.__server[service] = new GameWebsocketServer(token, conn);
          break;
        default:
          conns.delete(conn);
          conn.close();
          return ;
      }
      conn.__server[service].handle(message.data);
    });
    conn.on("close", (code, reason) => {
      console.log("Connection closed");
      conns.delete(conn);
      Object.values(conn.__server).forEach(server => server.close());
    });
    conn.on("error", err => {
      console.log(err); // 用Edge测试的时候会报错，用mozilla的不会 ?
    })
  } catch (e) {
    console.log(e);
    conn.close();
  }
}).listen(3000)

module.exports = server