import { useQuery } from "@tanstack/react-query";
import { getBook } from "../service/mainService";

const queryKeys = {
  Book: (query) => ["Book", query],
};

export const useGetBook = (query, enable = false) =>
    useQuery({
      queryKey: queryKeys.Book(query),
      queryFn: () => getBook(query),
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: enable,
    });
  