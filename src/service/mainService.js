import axiosInstance from "./axiosInstance";
export const getBook = (query, pagination) => {
  const pageIndex = pagination?.pageIndex || 1;
  const pageSize = pagination?.pageSize || 5;
  return axiosInstance
    .get(`search.json?q=${query}&limit=${pageSize}&page=${pageIndex}`)
    .then((res) => res.data);
};
