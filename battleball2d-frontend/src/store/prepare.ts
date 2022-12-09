import { Player } from "../views/Lobby/PrepareGame/PrepareGameView";

export type Prepare = {
  roomId: string
  players: Player[]
};

const initPrepare: Prepare = {
  roomId: "未加入房间",
  players: []
};

const PrepareStore: Prepare = JSON.parse(JSON.stringify(initPrepare));

export async function setOk(id: number, ok: boolean) {
  PrepareStore.players.forEach(player => player.id === id && (player.isOk = ok));
  return PrepareStore.players;
};

export async function removePlayer(id: number) {
  return PrepareStore.players = PrepareStore.players.filter(player => player.id !== id);
};

export async function setPlayers(players: Player[]) {
  PrepareStore.players = [...players];
  return PrepareStore.players;
};

export function initializePrepare() {
  Object.assign(PrepareStore, {...initPrepare});
}

export default PrepareStore;