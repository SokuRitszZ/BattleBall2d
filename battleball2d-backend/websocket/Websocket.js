const ws = require("nodejs-websocket");
const jwt = require("jsonwebtoken");
const {JWT_SECRETKEY} = require("../config.json");
const GlobalChatWebsocketServer = require("./GlobalChatWebsocketServer");

const conns = new Set();

const server = ws.createServer(conn => {
  const [_, service, token] = conn.path.split('/');
  try {
    jwt.verify(token, JWT_SECRETKEY);
    conns.add(conn);
    switch (service) {
      case "chat":
        conn.__server = new GlobalChatWebsocketServer(token, conn);
        break;
      default:
        conns.delete(conn);
        conn.close();
    }
    conn.on("close", (code, reason) => {
      console.log("Connection closed");
      conns.delete(conn);
      conn.__server.close();
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