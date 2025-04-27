import axiosInstance from "./axiosInstance";
export const getBook = (query) => {
  return axiosInstance.get(`search.json?q=${query}`).then((res) => res.data);
};
