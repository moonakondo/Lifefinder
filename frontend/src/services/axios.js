import { message } from "antd";
import Axios from "axios";
import { apiUrl } from "../apiUrl";

const axios = Axios.create({
  baseURL: apiUrl,
});

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    const errMessage = err.response?.data?.message || err.message;
    message.error(errMessage);
    console.log("🚀 ~ errMessage:", errMessage);
    return Promise.reject(errMessage);
  }
);

export default axios;
