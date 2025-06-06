import { postReview } from '@/services/postReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';


export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReview,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
    queryKey: ['reviews', variables.bookId]
    })
    },
  });
}