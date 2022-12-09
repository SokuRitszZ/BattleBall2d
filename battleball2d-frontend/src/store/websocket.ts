import UserStore from "./user";

export type WebSocketHandler = {
  service: string
  handle: (data: any) => void
};

const WebSocketStore: {
  websocket: WebSocket | null
  handlers: WebSocketHandler[]
} = {
  websocket: null,
  handlers: []
};

export function addHandler(service: string, handle: (data: any) => void) {
  WebSocketStore.handlers = [...WebSocketStore.handlers.filter(handler => handler.service !== service), {
    service: service,
    handle: handle
  }];
};

function handleService(service: string, data: any) {
  WebSocketStore
    .handlers
    .forEach(
      handler => handler.service === service
        && handler.handle(data)
    );
};

function callback(messageEvent: MessageEvent) {
  const {service, data} = JSON.parse(messageEvent.data);
  handleService(service, data);
};

export function connect(url: string) {
  const ws = new WebSocket(`ws://${url}/${UserStore.token}`);
  ws.onopen = () => console.log("open websocket");
  ws.onclose = () => console.log("close websocket");
  ws.onerror = error => console.log(error.type);
  ws.onmessage = callback;
  WebSocketStore.websocket = ws;
};

export function sendMessage(message: any) {
  if (!WebSocketStore.websocket) return ;
  WebSocketStore.websocket.send(JSON.stringify(message));
};

export default WebSocketStore;