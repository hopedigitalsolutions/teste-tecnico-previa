import { TopBook } from '@/app/interfaces/ITopBook';
import { useQuery } from '@tanstack/react-query';
import { getBook } from '@/services/getBook';

export const useBook = (id?: string) => {
  return useQuery({
    queryKey: ['book', id],
    queryFn: () => getBook(id!),
    enabled: !!id, 
  });
};