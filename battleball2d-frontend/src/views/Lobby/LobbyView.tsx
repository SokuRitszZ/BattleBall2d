import React, {useEffect, useRef, useState} from 'react';

import style from "./LobbyView.module.scss";
import {useNavigate} from "react-router-dom";
import UserStore, {logout, UserInfo} from "../../store/user";
import useAuth from "../../useAuth";
import SettingsView from "./Settings/SettingsView";
import GlobalChatView, {Message, tagReceiveMsg} from "./GlobalChat/GlobalChatView";
import pubsub from "pubsub-js";

import {host} from "../../../config.json";
import PrepareGameView, {PrepareGameProps} from "./PrepareGame/PrepareGameView";
import {connect, sendMessage} from "../../store/websocket";

export const tagSendText = "tagSendText";
export const tagGame = "tagGame";

function LobbyView() {
  const navigate = useNavigate();

  const $frame = useRef<HTMLDivElement>(null);
  const info = useState<UserInfo>({
    headIcon: "", id: 0, username: ""
  });
  const showingView =  useState<string>("null");
  const messages = useState<Message[]>([]);
  const canUseSubview = useState<boolean>(false);

  const pgProps = useState<PrepareGameProps>({
    players: [], roomId: "未加入房间"
  });

  useEffect(() => {
    pubsub.subscribe(tagSendText, (tg, text) => {
      sendMessage({
        service: "chat",
        data: {
          content: text
        }
      });
    });
    pubsub.subscribe(tagGame, (tg, data) => {
      sendMessage({
        service: "game",
        data
      });
    });
    useAuth(navigate)
      .then(() => {
        info[1](UserStore.info);
        connect(`${host}:3000`, (messageEvent?: MessageEvent) => {
          if (!messageEvent) return () => {
            console.log("close websocket");
          }
          const message = JSON.parse(messageEvent.data);
          const data = message.data;
          switch (message.service) {
            case "chat":
              handleChat(data);
              break;
            case "game":
              handleGame(data);
              break;
            default:
              break;
          }
          canUseSubview[1](true);
        });
      });
    return () => {
      pubsub.unsubscribe(tagSendText);
      pubsub.unsubscribe(tagGame);
    }
  }, []);

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
      case "preparegame":
        return <PrepareGameView {...pgProps[0]}/>
      default:
        return ""
    }
  };

  const handleChat = (data: any) => {
    addMessage(data.message);
  }

  const handleGame = (data: any) => {
    switch (data.action) {
      case "member":
        pgProps[1](state => {
          return {
            roomId: data.roomId,
            players: data.members
          }
        });
        break;
      case "exit":
        pgProps[1](state => {
          return {
            ...state,
            players: state.players.filter(member => member.id !== data.id)
          }
        });
        break;
      case "prepare":
        pgProps[1](pre => {
          const players = pre.players;
          players.forEach(player => player.id === data.id ? player.isOk = data.isOk : "");
          pre = {...pre, players};
          return pre;
        });
        break;
      default:
        console.log(`未知动作：${data.action}`);
        break;
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