import {RouteProps} from "react-router-dom";
import AccountView from "../views/Account/AccountView";
import LobbyView from "../views/Lobby/LobbyView";
import GameView from "../views/Game/GameView";
import SettingsView from "../views/Lobby/Settings/SettingsView";
import EnterView from "../views/EnterView";

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
    auth: true,
    children: [
      {
        path: "settings",
        element: <SettingsView/>
      }
    ]
  },
  {
    path: "/game",
    auth: true,
    element: <GameView/>,
  }
];

export default routes;