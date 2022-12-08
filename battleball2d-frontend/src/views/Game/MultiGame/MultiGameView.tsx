import React, {useEffect, useRef} from 'react';

import style from "./MultiGameView.module.scss";
import Game from "../../../script/game/base/Game";
import {useLocation} from "react-router-dom";
import UserStore, {UserInfo} from "../../../store/user";

function MultiGameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  let game: Game;
  const location = useLocation();
  useEffect(() => {
    game = new Game($parent.current!, $canvas.current!);
    const {players} = location.state;
    players.forEach((player: UserInfo) => {
      game.addPlayer(player, player.id === UserStore.info.id, false);
    });
    // game.addPlayer(UserStore.info, true);
    game.start("multi");
    return () => {
      game.stop();
    };
  }, []);

  return (
    <div ref={$parent} className={style.frame}>
      <canvas ref={$canvas} className={style.canvas}/>
    </div>
  );
}

export default MultiGameView;