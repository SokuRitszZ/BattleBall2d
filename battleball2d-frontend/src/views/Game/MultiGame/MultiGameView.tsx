import React, {useEffect, useRef} from 'react';

import style from "./MultiGameView.module.scss";
import Game, {tagReceiveAct} from "../../../script/game/base/Game";
import {useNavigate} from "react-router-dom";
import UserStore, {UserInfo} from "../../../store/user";
import useAuth from "../../../useAuth";
import {addHandler} from "../../../store/websocket";
import pubsub from "pubsub-js";
import PrepareStore, {initializePrepare} from "../../../store/prepare";
import Prepare from "../../../store/prepare";

function MultiGameView() {
  const $parent = useRef<HTMLDivElement>(null);
  const $canvas = useRef<HTMLCanvasElement>(null);
  let game: Game;
  const navigate = useNavigate();

  useEffect(() => {
    useAuth(navigate).then(() => {
      addHandler("game", data => {
        switch (data.action) {
          case "play":
            pubsub.publish(tagReceiveAct, data);
            break;
          default:
            console.log(`未知动作：${data.action}`);
            break;
        }
      });

      game = new Game($parent.current!, $canvas.current!);
      const players = [...PrepareStore.players];
      players.forEach((player: UserInfo) => {
        game.addPlayer(player, player.id === UserStore.info.id, false);
      });
      initializePrepare();
      console.log(PrepareStore.players);
      game.start("multi");
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

export default MultiGameView;