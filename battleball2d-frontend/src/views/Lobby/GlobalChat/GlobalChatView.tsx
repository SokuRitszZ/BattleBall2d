import React, {useEffect, useState} from 'react';

import style from "./GlobalChatView.module.scss";
import dayjs from "dayjs";

type Message = {
  id: string
  time: Date
  content: string
  sender: string
}

function GlobalChatView() {
  const message: Message = {
    id: "293yrwohfjn",
    time: dayjs().toDate(),
    content: "Content",
    sender: "Andrew"
  } as Message;
  const messages = useState<Message[]>([
    message,
    {...message},
    {...message},
    {...message},
    {...message},
    {...message},
    {...message}
  ]);
  return (
    <div style={{maxWidth: "480px"}} className="rounded-2xl overflow-hidden shadow-xl">
      <div className={style.header}>公共频道（吹水窗口）</div>
      <div className={style.body}>
        {
          messages[0].map(message => {
            return (
              <div key={message.id} className={style.message}>
                <div className={style.messageHeader}>
                  {message.sender}
                  <span>{dayjs(message.time).format("YYYY-MM-DD HH:mm:ss")}</span>
                </div>
                <div className={style.messageBody}>
                  {message.content}
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={style.footer}>
        <input type="text" placeholder="友善交流"/>
        <button>发送</button>
      </div>
    </div>
  );
}

export default GlobalChatView;