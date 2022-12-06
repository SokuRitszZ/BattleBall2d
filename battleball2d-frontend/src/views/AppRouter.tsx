import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import App from "../App";
import AccountView from "./Account/AccountView";
import LobbyView from "./Lobby/LobbyView";
import GameView from "./Game/GameView";
import {ReactNode} from "react";
import {isLogin} from "../store/user";
import SettingsView from "./Lobby/SettingsView";
import EnterView from "./EnterView";

function AppRouter() {
  type RouterItem = {
    path: string
    auth: boolean
    component: ReactNode
    child?: RouterItem[]
  };
  const routes: RouterItem[] = [
    {
      path: "/",
      auth: false,
      component: <EnterView/>
    },
    {
      path: "/account",
      auth: false,
      component: <AccountView/>
    },
    {
      path: "/lobby",
      auth: true,
      component: <LobbyView/>,
      child: [
        {
          path: "/lobby/settings",
          auth: true,
          component: <SettingsView/>
        }
      ]
    },
    {
      path: "/game",
      auth: true,
      component: <GameView/>
    }
  ];

  const view = (param: any) => {
    return (
      param.map((item: RouterItem) => {
         return (
           <Route
             path={item.path}
             element={item.auth && !isLogin() ? <Navigate to="/account" replace={true}/> : item.component}
             key={item.path}
           >
             { item?.child && view(item.child) }
           </Route>
         )
      })
    );
  }

  return (
    <Routes>
      {view(routes)}
    </Routes>
  );
};

export default AppRouter;