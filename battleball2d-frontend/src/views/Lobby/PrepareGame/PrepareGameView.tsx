import React, {useEffect, useRef, useState} from 'react';

import style from "./PrepareGameView.module.scss";
import pubsub from "pubsub-js";
import UserStore from "../../../store/user";
import {tagGame} from "../LobbyView";

type Player = {
  id: number
  username: string
  headIcon: string
  isOk: boolean
};

export type PrepareGameProps = {
  roomId: string
  players: Player[]
};

export const tagJoin = "tagJoin";

function PrepareGameView(props: PrepareGameProps) {
  const $input = useRef<HTMLInputElement>(null);
  const textInButton = useState<string>("随机加入");

  useEffect(() => {
  }, []);

  const handleChange = () => {
    if (!$input.current) return ;
    textInButton[1]($input.current.value.trim() ? "查找房间" : "随机加入");
  };

  const handleJoin = () => {
    if ($input.current) {
      pubsub.publish(tagGame, {
        action: "join",
        roomId: $input.current.value
      });
    }
  };

  const handlePrepare = (id: number) => {
    if (id !== UserStore.info.id) return ;
    pubsub.publish(tagGame, {
      action: "prepare"
    });
  }

  return (
    <div className={style.frame}>
      <div className={style.header}>
        准备开始多人运动
      </div>
      <div className={style.tip}>请输入房间号加入，或者不输入而随机加入</div>
      <div className={style.tip}>点击自己的头像来准备或取消准备</div>
      <div className={style.body}>
        <input onChange={handleChange} ref={$input} type="text"/>
        <button onClick={handleJoin}>{textInButton[0]}</button>
      </div>
      <div className={style.belt}>房间号：{props.roomId}</div>
      <div className={style.waist}>
        {
          props.players.map(player => {
            return (
              <div key={player.id} className={style.player + " " + (player.isOk ? style.active : "")} onClick={() => handlePrepare(player.id)}>
                <img src={player.headIcon} alt=""/>
                <div className={style.title}>
                  {player.username}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  )
};

export default PrepareGameView;