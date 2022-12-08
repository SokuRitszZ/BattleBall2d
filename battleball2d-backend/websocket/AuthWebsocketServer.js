const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

class AuthWebsocketServer {
  conn;
  promiseGetUser;
  user;

  constructor(token, conn) {
    token = jwt.decode(token);
    this.conn = conn;
    this.promiseGetUser = User.findOne({
      where: {
        id: token.id
      }
    })
      .then(user => {
        this.user = user.toJSON();
        this.onStart();
        return ;
      });
  }

  sendMessage(message) {
    this.conn.sendText(JSON.stringify(message));
  }

  onStart() {}

  close() {}

  handle(data) {}
}

module.exports = AuthWebsocketServer;