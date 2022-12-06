import React, {useEffect, useRef, useState} from 'react';

import style from "./LobbyView.module.scss";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {logout, UserInfo} from "../../store/user";
import useAuth from "../../useAuth";

function LobbyView() {
  const $frame = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  useEffect(() => {
    useAuth(navigate, info);
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
          <div className={style.button} onClick={handleMultiMode}>多人游戏</div>
          <Link to="/lobby/settings" className={style.button}>账号设置</Link>
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