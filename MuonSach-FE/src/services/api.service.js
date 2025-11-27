import axios from "axios";

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

export default (baseURL) => {
  const instance = axios.create({
    baseURL,
    ...commonConfig,
  });
  instance.interceptors.request.use(
    (config) => {
      // Lấy token từ LocalStorage
      const token = localStorage.getItem("token");

      // Nếu có token -> Đính kèm vào Header
      if (token) {
        // Cấu trúc chuẩn: "Bearer <token>"
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return instance;
};
