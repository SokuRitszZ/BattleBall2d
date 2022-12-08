const {nanoid} = require("nanoid");
const AuthWebsocketServer = require("./AuthWebsocketServer");

class GameWebsocketServer extends AuthWebsocketServer {
  static Rooms = new Map();

  roomId = "";
  isOk = false;
  gameRoom = [];

  static getNewRoomId() {
    let code;
    while (GameWebsocketServer.Rooms.has(code = nanoid(11)));
    GameWebsocketServer.Rooms.set(code, []);
    return code;
  }

  static broadCast(roomId, data) {
    GameWebsocketServer.Rooms.get(roomId).forEach(server => {
      server.sendMessage({
        service: "game",
        data: data
      });
    });
  }

  static setGameRoom(roomId) {
    const room = GameWebsocketServer.Rooms.get(roomId);
    room.forEach(server => {
      server.gameRoom = room;
      server.roomId = "";
    });
  }

  static startGame(roomId) {
    this.broadCast(roomId, {
      action: "start"
    });
    this.setGameRoom(roomId);
    this.Rooms.delete(roomId);
  }

  constructor(token, conn) {
    super(token, conn);
  }

  handle(data) {
    switch (data.action) {
      case "join":
        const {roomId} = data;
        this.toJoin(roomId);
        break;
      case "prepare":
        this.prepare();
        break;
      default:
        console.log(`未知事件：${data.action}`);
        break;
    }
  }

  getRoom(roomId) {
    return GameWebsocketServer.Rooms.get(roomId);
  }

  toJoin(roomId) {
    roomId = roomId.trim();
    if (roomId && roomId === this.roomId) return ;
    if (!roomId) {
      const roomIds = [...GameWebsocketServer.Rooms.keys()].filter(roomId => {
        const room = this.getRoom(roomId);
        return !~room.indexOf(this) && room.length < 3;
      });
      if (roomIds.length) roomId = roomIds[Math.floor(Math.random() * roomIds.length)];
      else roomId = GameWebsocketServer.getNewRoomId();
    }
    if (!GameWebsocketServer.Rooms.has(roomId)) GameWebsocketServer.Rooms.set(roomId, []);
    this.join(roomId);
  }

  join(roomId) {
    this.user = {...this.user, isOk: false};
    if (this.roomId !== "") this.exit();
    this.promiseGetUser
      .then(() => {
        const room = this.getRoom(roomId);
        if (!room) return ;
        this.roomId = roomId;
        room.push(this);
        const message = {
          action: "member",
          roomId,
          members: room.map(server => ({...server.user, password: undefined}))
        };
        GameWebsocketServer.broadCast(roomId, message);
      });
  }

  prepare() {
    this.user.isOk = !this.user.isOk;
    if (this.roomId) {
      GameWebsocketServer.broadCast(this.roomId, {
        action: "prepare",
        id: this.user.id,
        isOk: this.user.isOk
      });
      const allOk = this.getRoom(this.roomId).reduce((pre, cur) => pre && cur.user.isOk, true);
      if (allOk) GameWebsocketServer.startGame(this.roomId);
    }
  }

  broadCast(data) {
    this.gameRoom.forEach(server => {
      server.sendMessage({
        service: "game",
        data
      });
    });
  }

  close() {
    this.exit();
  }

  exit() {
    if (this.roomId === "") return ;
    const room = GameWebsocketServer.Rooms.get(this.roomId).filter(server => server !== this);
    if (room.length === 0) GameWebsocketServer.Rooms.delete(this.roomId);
    else GameWebsocketServer.Rooms.set(this.roomId, room);
    if (GameWebsocketServer.Rooms.has(this.roomId)) {
      GameWebsocketServer.broadCast(this.roomId, {
        action: "exit",
        id: this.user.id
      });
    }
    this.roomId = "";
  }
}

module.exports = GameWebsocketServer;