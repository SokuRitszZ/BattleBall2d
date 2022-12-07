import React, {useEffect, useRef, useState} from 'react';

import style from "./LobbyView.module.scss";
import {useNavigate} from "react-router-dom";
import UserStore, {logout, UserInfo} from "../../store/user";
import useAuth from "../../useAuth";
import SettingsView from "./Settings/SettingsView";
import GlobalChatView, {Message, tagReceiveMsg} from "./GlobalChat/GlobalChatView";
import pubsub from "pubsub-js";

import {host} from "../../../config.json";

export const tagSendText = "tagSendText";

function LobbyView() {
  const navigate = useNavigate();

  const $frame = useRef<HTMLDivElement>(null);
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  const showingView =  useState<string>("null");
  const messages = useState<Message[]>([]);

  let ws: WebSocket;

  useEffect(() => {
    pubsub.subscribe(tagSendText, (tg, text) => {
      // console.log(msg, data);
      ws.send(text);
    });

    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
        ws = new WebSocket(`ws://${host}:3000/chat/${UserStore.token}`);
        ws.onopen = () => console.log("open websocket.");
        ws.onclose = () => console.log("close websocket.");
        ws.onmessage = (msge: MessageEvent) => {
          const msg: Message = JSON.parse(msge.data) as Message;
          addMessage(msg);
        }
      });
    return () => {
      pubsub.unsubscribe(tagSendText);
      ws.close();
    }
  }, []);

  // const messages = useState<Message[]>([]);
  const addMessage = (msg: Message) => {
    messages[1](list => [...list, msg]);
    pubsub.publish(tagReceiveMsg);
  };

  const getCurrent = () => {
    const now = new Date();
    const hours = now.getHours();
    if (6 <= hours && hours <= 11) return "Good Morning!";
    if (12 <= hours && hours <= 19) return "Good Afternoon!";
    return "Good Evening!";
  }

  const view = () => {
    switch (showingView[0]) {
      case "settings":
        return <SettingsView/>
      case "globalchat":
        return <GlobalChatView messages={messages[0]}/>
      default:
        return ""
    }
  };

  const handleSingleMode = () => {
    navigate("/game");
  };

  const handleMultiMode = () => {

  };

  const handleGlobalChat = () => {
    if (showingView[0] === "globalchat") showingView[1]("null");
    else showingView[1]("globalchat");
  }

  const handleSettings = () => {
    if (showingView[0] === "settings") showingView[1]("null");
    else showingView[1]("settings");
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        navigate("/account");
      });
  };

  return (
    <div ref={$frame} className={style.frame}>
      <div className={style.header}>
        <img src={info[0].headIcon} alt=""/>
        <div>{getCurrent()} {info[0].username}</div>
      </div>
      <div className={style.body}>
        <div className={style.left}>
          <div className={style.button} onClick={handleSingleMode}>单人游戏</div>
          <div className={style.button} onClick={handleMultiMode}>多人游戏</div>
          <div className={style.button} onClick={handleGlobalChat}>公共聊天</div>
          <div className={style.button} onClick={handleSettings}>账号设置</div>
          <div className={style.button} onClick={handleLogout}>退出账号</div>
        </div>
        <div className={style.right}>
          {view()}
        </div>
      </div>
    </div>
  );
}

export default LobbyView;