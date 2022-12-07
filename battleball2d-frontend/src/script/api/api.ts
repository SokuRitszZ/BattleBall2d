import axios from "axios";
import UserStore from "../../store/user";

import {host} from "../../../config.json";

const api = axios.create({
  baseURL: `http://${host}:8080/api`
});

api.interceptors.response.use(res => {
  return res.data;
}, err => {
  return Promise.reject(err);
});

api.interceptors.request.use(req => {
  const token = UserStore.token;
  req.headers = {
    ...req.headers,
    Authorization: `Bearer ${token}`
  };
  return req;
}, err => {
  return Promise.reject(err);
});

export default api;