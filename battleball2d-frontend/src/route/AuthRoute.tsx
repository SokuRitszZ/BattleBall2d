import routes from "./index";
import UserStore from "../store/user";
import {Navigate, NavLink, Route, Routes, useLocation} from "react-router-dom";
import EnterView from "../views/EnterView";
import AccountView from "../views/Account/AccountView";

function AuthRoute() {
  const pathname = useLocation().pathname;
  const targetRouter = routes.find(item => item.path === pathname);
  const isLogin = UserStore.status === "logined";

  const view = () => {
    if (!targetRouter) return <Route path="/" element={<EnterView/>}/>;
    if (isLogin) return <Route path={pathname} element={targetRouter.element}/>;
    return <Route path="/account" element={<AccountView/>}/>;
  };

  return (
    <Routes>
      {view()}
    </Routes>
  )
}

export default AuthRoute;