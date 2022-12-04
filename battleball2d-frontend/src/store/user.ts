const UserStore: {
  token: string,
  info: UserInfo
} = {
  token: "",
  info: null
};

export type UserInfo = {
  id: number
  username: string
} | null;

export function setToken(token: string) {
  UserStore.token = token;
  localStorage.setItem("token", token);
}

export function setInfo(info: UserInfo) {
  UserStore.info = info!;
}

export default UserStore;