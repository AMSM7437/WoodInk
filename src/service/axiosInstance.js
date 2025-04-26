import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://openlibrary.orgtest/",
  // headers: {
  //   "User-Agent": "Woodink/1.0 (amsm7437@gmail.com)",
  //   Accept: "application/json",
  // },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
