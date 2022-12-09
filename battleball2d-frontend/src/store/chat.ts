import {Message} from "../views/Lobby/GlobalChat/GlobalChatView";

export type Chat = {
  messages: Message[]
}

const initChat: Chat = {
  messages: []
};

const ChatStore: Chat = initChat;

export async function addMessage(message: Message) {
  ChatStore.messages.push(message);
  return ChatStore.messages;
};

export default ChatStore;