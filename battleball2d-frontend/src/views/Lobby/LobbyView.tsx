import React, {useEffect, useRef, useState} from 'react';

import style from "./LobbyView.module.scss";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import UserStore, {logout, UserInfo} from "../../store/user";
import useAuth from "../../useAuth";

function LobbyView() {
  const navigate = useNavigate();
  const location = useLocation();

  const $frame = useRef<HTMLDivElement>(null);
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  useEffect(() => {
    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
      });
  }, []);

  const getCurrent = () => {
    const now = new Date();
    const hours = now.getHours();
    if (6 <= hours && hours <= 11) return "Good Morning!";
    if (12 <= hours && hours <= 19) return "Good Afternoon!";
    return "Good Evening!";
  }

  const handleSingleMode = () => {
    navigate("/game");
  };

  const handleMultiMode = () => {

  };

  const handleGlobalChat = () => {
    if (location.pathname === "/lobby/globalchat") navigate("/lobby");
    else navigate("/lobby/globalchat");
  }

  const handleSettings = () => {
    if (location.pathname === "/lobby/settings") navigate("/lobby");
    else navigate("/lobby/settings");
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
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default LobbyView;