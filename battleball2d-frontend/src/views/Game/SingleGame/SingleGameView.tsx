import React, {useEffect, useRef} from 'react';

import style from "./SingleGameView.module.scss";
import Game from "../../../script/game/base/Game";
import UserStore from "../../../store/user";
import useAuth from "../../../useAuth";
import {useNavigate} from "react-router-dom";

function SingleGameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  let game: Game;
  const navigate = useNavigate();
  useEffect(() => {
    useAuth(navigate)
      .then(() => {
        game = new Game($parent.current!, $canvas.current!);
        game.addPlayer(UserStore.info, true);
        game.start("single");
      });
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

export default SingleGameView;