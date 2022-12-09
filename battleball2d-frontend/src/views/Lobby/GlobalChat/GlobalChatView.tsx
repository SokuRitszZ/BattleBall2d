import React, {useEffect, useRef, useState} from 'react';

import style from "./GlobalChatView.module.scss";
import dayjs from "dayjs";
import ChatStore, {addMessage} from "../../../store/chat";
import {addHandler, sendMessage} from "../../../store/websocket";

export type Message = {
  id: string
  time: Date
  content: string
  sender: string
}

function GlobalChatView() {
  const $input = useRef<HTMLInputElement>(null);
  const $body = useRef<HTMLDivElement>(null);
  const messages = useState<Message[]>(ChatStore.messages);

  // did mount
  useEffect(() => {
    addHandler("chat", data => {
      addMessage(data.message).then(newMessages => {
        messages[1](_ => [...newMessages]);
        if ($body.current)
          setTimeout(() => {
            if ($body.current)
              $body.current.scrollTop = $body.current.scrollHeight;
          });
      });
    });
  }, []);

  // will unmount
  useEffect(() => {
    return () => {

    }
  });

  const handleAddMessage = () => {
    if ($input.current) {
      const text = $input.current.value;
      if (!text) return ;
      sendMessage({
        service: "chat",
        data: {
          content: text
        }
      });
      $input.current.value = "";
    }
  }

  return (
    <div style={{maxWidth: "480px"}} className={style.frame}>
      <div className={style.header}>公共频道（吹水窗口）</div>
      <div ref={$body} className={style.body}> {
        messages[0].map(message => (
          <div key={message.id} className={style.message}>
            <div className={style.messageHeader}>
              {message.sender}
              <span>{dayjs(message.time).format("YYYY-MM-DD HH:mm:ss")}</span>
            </div>
            <div className={style.messageBody}>
              {message.content}
            </div>
          </div>
        ))
      } </div>
      <div className={style.footer}>
        <input onKeyUp={(e) => e.key === "Enter" && handleAddMessage()} ref={$input} type="text" placeholder="友善交流"/>
        <button onClick={handleAddMessage}>发送</button>
      </div>
    </div>
  );
}

export default GlobalChatView;