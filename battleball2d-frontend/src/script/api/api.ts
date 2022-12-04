import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.response.use(res => {
  return res.data;
}, err => {
  if (!err) return Promise.reject("无法连接服务器");
  return Promise.reject(err);
});

export default api;