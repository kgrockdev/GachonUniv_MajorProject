import axios from "axios";
import store from "module/redux/configStore";
import { jwtUtils } from "./jwtUtils";

const instance = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "" : "",
});

instance.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const token = store.getState().Auth.token;
    try {
      if (token && jwtUtils.isAuth(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (err) {
      console.error("[_axios.interceptors.request] config : " + err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
