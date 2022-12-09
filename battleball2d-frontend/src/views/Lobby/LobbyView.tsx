import React, {useEffect, useRef, useState} from 'react';

import style from "./LobbyView.module.scss";
import {useNavigate} from "react-router-dom";
import UserStore, {logout, UserInfo} from "../../store/user";
import useAuth from "../../useAuth";
import SettingsView from "./Settings/SettingsView";
import GlobalChatView from "./GlobalChat/GlobalChatView";

import {mode, ws} from "../../../config.json";
import PrepareGameView from "./PrepareGame/PrepareGameView";
import WebSocketStore, {connect} from "../../store/websocket";

function LobbyView() {
  const navigate = useNavigate();

  const $frame = useRef<HTMLDivElement>(null);
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  const showingView =  useState<string>("null");
  const canUseSubview = useState<boolean>(false);

  // didmount
  useEffect(() => {
    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
        if (!WebSocketStore.websocket) {
          connect(`${ws[mode]}`);
        }
        canUseSubview[1](true);
      });
  }, []);

  // will unmount
  useEffect(() => {
    return () => {
    };
  }, [])

  const getCurrent = () => {
    const now = new Date();
    const hours = now.getHours();
    if (6 <= hours && hours <= 11) return "Good Morning!";
    if (12 <= hours && hours <= 19) return "Good Afternoon!";
    return "Good Evening!";
  };

  const view = () => {
    switch (showingView[0]) {
      case "settings":
        return <SettingsView/>
      case "globalchat":
        return <GlobalChatView/>
      case "preparegame":
        return <PrepareGameView/>
      default:
        return ""
    }
  };

  const handleSingleMode = () => {
    navigate("/singlegame");
  };

  const handleChangeSubview = (subview: string) => {
    if (!canUseSubview[0]) return ;
    if (showingView[0] === subview) showingView[1]("null");
    else showingView[1](subview);
  }

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
          <div className={style.button} onClick={() => handleChangeSubview("preparegame")}>多人游戏</div>
          <div className={style.button} onClick={() => handleChangeSubview("globalchat")}>公共聊天</div>
          <div className={style.button} onClick={() => handleChangeSubview("settings")}>账号设置</div>
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