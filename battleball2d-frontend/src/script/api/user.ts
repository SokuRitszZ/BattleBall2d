import api from "./api";

export function registerApi(username: string, password: string, confirmedPassword: string) {
  return api.post("/user/register", {
    username, password, confirmedPassword
  });
};

export function loginApi(username: string, password: string) {
  return api({
    url: "/user/login",
    method: "GET",
    params: {
      username, password
    }
  });
};
