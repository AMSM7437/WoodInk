import axiosInstance from "./axiosInstance";
export const getBook = (query) => {
  debugger;
  return axiosInstance.get(`search.json?q=${query}`).then((res) => res.data);
};
