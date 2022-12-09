import React, {useEffect, useRef, useState} from 'react';

import style from "./PrepareGameView.module.scss";
import UserStore from "../../../store/user";
import {addHandler, sendMessage} from "../../../store/websocket";
import PrepareStore, {initializePrepare, removePlayer, setOk, setPlayers} from "../../../store/prepare";
import {useNavigate} from "react-router-dom";
import Prepare from "../../../store/prepare";

export type Player = {
  id: number
  username: string
  headIcon: string
  isOk: boolean
};

function PrepareGameView() {
  const navigate = useNavigate();

  const $input = useRef<HTMLInputElement>(null);
  const $body = useRef<HTMLDivElement>(null);

  const textInButton = useState<string>("随机加入");
  const players = useState<Player[]>(PrepareStore.players);
  const roomId = useState<string>(Prepare.roomId);

  // did mount
  useEffect(() => {
    addHandler("game", data => {
      switch (data.action) {
        case "member":
          roomId[1](data.roomId);
          setPlayers(data.members).then(newPlayers => players[1](_ => [...newPlayers]));
          break;
        case "exit":
          removePlayer(data.id).then(newPlayers => players[1](_ => [...newPlayers]));
          break;
        case "prepare":
          setOk(data.id, data.isOk).then(newPlayers => players[1](_ => [...newPlayers]));
          break;
        case "start":
          navigate("/multigame");
          break;
        default:
          console.log(`未知动作：${data.action}`);
          break;
      }
    });
  }, []);

  // will unmount
  useEffect(() => {
    return () => {}
  }, []);

  const handleChange = () => {
    if (!$input.current) return ;
    textInButton[1]($input.current.value.trim() ? "查找房间" : "随机加入");
  };

  const handleJoin = () => {
    if ($input.current) {
      sendMessage({
        service: "game",
        data: {
          action: "join",
          roomId: $input.current.value
        }
      });
    }
  };

  const handlePrepare = (id: number) => {
    if (id !== UserStore.info.id) return ;
    sendMessage({
      service: "game",
      data: {
        action: "prepare"
      }
    });
  };

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
      <div className={style.belt}>房间号：{roomId[0]}</div>
      <div ref={$body} className={style.waist}>
        {
          players[0].map(player => {
            return (
              <div
                key={player.id}
                className={style.player + " " + (player.isOk ? style.active : "")}
                onClick={() => handlePrepare(player.id)}
              >
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