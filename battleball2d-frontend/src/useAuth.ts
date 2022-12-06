import {NavigateFunction, useNavigate} from "react-router-dom";
import UserStore, {getInfo, isLogin, UserInfo} from "./store/user";

function useAuth(navigate: NavigateFunction, info: [UserInfo, ((value: (((prevState: UserInfo) => UserInfo) | UserInfo)) => void)]) {
  if (!isLogin())
    getInfo()
      .then(() => {
        if (info) info[1](UserStore.info);
      })
      .catch(() => {
        navigate("/account");
      });
};

export default useAuth;