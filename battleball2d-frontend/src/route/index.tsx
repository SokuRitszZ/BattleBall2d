import {RouteProps} from "react-router-dom";
import AccountView from "../views/Account/AccountView";
import LobbyView from "../views/Lobby/LobbyView";
import GameView from "../views/Game/GameView";
import SettingsView from "../views/Lobby/Settings/SettingsView";
import EnterView from "../views/EnterView";
import GlobalChatView from "../views/Lobby/GlobalChat/GlobalChatView";

const routes: any[] = [
  {
    path: "/",
    element: <EnterView/>
  },
  {
    path: "/account",
    element: <AccountView/>,
  },
  {
    path: "/lobby",
    element: <LobbyView/>,
    children: [
      {
        path: "settings",
        element: <SettingsView/>
      },
      {
        path: "globalchat",
        element: <GlobalChatView/>
      }
    ]
  },
  {
    path: "/game",
    element: <GameView/>,
  }
];

export default routes;