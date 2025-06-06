import { useQuery } from '@tanstack/react-query';
import { getReviewsByBookId } from '@/services/getReviewsByBookId';
import { IReview } from '@/app/interfaces/IReviews';

export const useReviews = (bookId?: string) => {
  return useQuery<IReview[]>({
    queryKey: ['reviews', bookId],
    queryFn: () => getReviewsByBookId(bookId!),
    enabled: !!bookId,
    staleTime: 0
  });
};