import { useQuery } from "@tanstack/react-query";
import { getTopBooks } from "@/services/getTopBooks";

export const useTopBooks = () => {
  return useQuery({
    queryKey: ["top-books"],
    queryFn: getTopBooks,
  });
};