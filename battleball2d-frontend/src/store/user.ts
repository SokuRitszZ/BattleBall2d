import {getInfoApi} from "../script/api/user";

const UserStore: {
  token: string
  info: UserInfo
  status: "unlogin" | "logined"
} = {
  token: "",
  info: null,
  status: "unlogin"
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
      UserStore.status = "logined";
      return Promise.resolve(true);
    });
}

export async function logout() {
  setToken("");
  setInfo(null);
  UserStore.status = "unlogin";
  return ;
}

export function isLogin() {
  return UserStore.status === "logined";
}

export async function checkIfCanLogin() {
  return await getInfo();
}

export default UserStore;