import {NavigateFunction, useNavigate} from "react-router-dom";
import {getInfo, isLogin} from "./store/user";

function useAuth(navigate: NavigateFunction) {
  if (!isLogin())
    return getInfo()
      .catch(() => {
        navigate("/account");
      });
  return Promise.resolve();
};

export default useAuth;