import {getInfoApi} from "../script/api/user";

const UserStore: {
  token: string
  info: UserInfo
} = {
  token: "",
  info: null
};

export type UserInfo = {
  id: number
  username: string
  headIcon: string
} | null;

export function setToken(token: string) {
  UserStore.token = token;
  localStorage.setItem("token", token);
}

export function setInfo(info: UserInfo) {
  UserStore.info = info!;
}

export function getInfo() {
  return getInfoApi()
    .then((info: any) => {
      setInfo(info);
      return Promise.resolve();
    });
}

export async function logout() {
  setToken("");
  setInfo(null);
  return ;
}

export default UserStore;