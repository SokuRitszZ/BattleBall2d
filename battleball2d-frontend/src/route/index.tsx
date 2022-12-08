import AccountView from "../views/Account/AccountView";
import LobbyView from "../views/Lobby/LobbyView";
import SingleGameView from "../views/Game/SingleGame/SingleGameView";
import EnterView from "../views/EnterView";
import MultiGameView from "../views/Game/MultiGame/MultiGameView";

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
    path: "/singlegame",
    element: <SingleGameView/>,
  },
  {
    path: "/multigame",
    element: <MultiGameView/>
  }
];

export default routes;