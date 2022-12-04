import React, {useRef} from 'react';

import style from "./LobbyView.module.scss";
import {useNavigate} from "react-router-dom";
import UserStore, {logout} from "../../store/user";

function LobbyView() {
  const $frame = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  setTimeout(() => {
    const dom = $frame.current!;
    const resize = () => {
      const clientWidth = window.innerWidth / 12 * 11;
      const clientHeight = window.innerHeight / 6 * 5;
      const ratio = [16, 9];
      const scale = Math.min(clientWidth / ratio[0], clientHeight / ratio[1]);
      dom.style.width = `${scale * ratio[0]}px`;
      dom.style.height = `${scale * ratio[1]}px`;
    }
    window.addEventListener("resize", (e) => {
      resize();
    });
    resize();
  }, 0);

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
        <img src={UserStore.info!.headIcon} alt=""/>
        <div>{getCurrent()} {UserStore.info!.username}</div>
      </div>
      <div className={style.button} onClick={handleSingleMode}>单人游戏</div>
      <div className={style.button} onClick={handleMultiMode}>多人游戏</div>
      <div className={style.button} onClick={handleLogout}>退出账号</div>
    </div>
  );
}

export default LobbyView;