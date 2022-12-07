import React, {useEffect, useRef} from 'react';

import style from "./GlobalChatView.module.scss";
import dayjs from "dayjs";
import pubsub from "pubsub-js";
import {tagSendText} from "../LobbyView";

export type Message = {
  id: string
  time: Date
  content: string
  sender: string
}

export const tagReceiveMsg = "tagReceiveMsg";

function GlobalChatView(props: {
  messages: Message[]
}) {
  const $input = useRef<HTMLInputElement>(null);
  const $body = useRef<HTMLDivElement>(null);
  const handleAddMessage = () => {
    if ($input.current) {
      const text = $input.current.value;
      if (!text) return ;
      pubsub.publish(tagSendText, text);
      $input.current.value = "";
    }
  }

  useEffect(() => {
    pubsub.subscribe(tagReceiveMsg, () => {
      setTimeout(() => {
        if ($body.current)
          $body.current.scrollTop = $body.current.scrollHeight;
      });
    });
    return () => {
      pubsub.unsubscribe(tagReceiveMsg);
    };
  }, []);

  return (
    <div style={{maxWidth: "480px"}} className={style.frame}>
      <div className={style.header}>公共频道（吹水窗口）</div>
      <div ref={$body} className={style.body}>
        {
          props.messages.map(message => (
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
        }
      </div>
      <div className={style.footer}>
        <input onKeyUp={(e) => e.key === "Enter" && handleAddMessage()} ref={$input} type="text" placeholder="友善交流"/>
        <button onClick={handleAddMessage}>发送</button>
      </div>
    </div>
  );
}

export default GlobalChatView;