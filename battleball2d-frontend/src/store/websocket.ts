import UserStore from "./user";

const WebSocketStore: {
  websocket: WebSocket | null
} = {
  websocket: null
};

type TypeCallback = void | (() => void);

export function connect(url: string, callback: (messageEvent?: MessageEvent) => TypeCallback) {
  const ws = new WebSocket(`ws://${url}/${UserStore.token}`);
  ws.onopen = () => console.log("open websocket");
  ws.onclose = callback() || (() => {});
  ws.onerror = error => console.log(error.type);
  ws.onmessage = callback;
  WebSocketStore.websocket = ws;
}

export function sendMessage(message: any) {
  if (!WebSocketStore.websocket) return ;
  WebSocketStore.websocket.send(JSON.stringify(message));
}

export default WebSocketStore;