import AccountView from "../views/Account/AccountView";
import LobbyView from "../views/Lobby/LobbyView";
import GameView from "../views/Game/GameView";
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
  },
  {
    path: "/game",
    element: <GameView/>,
  }
];

export default routes;