import { IReview } from "@/app/interfaces/IReviews";

export const getReviewsByBookId = async (bookId: string): Promise<IReview[]> => {
  const res = await fetch(`http://localhost:3001/review/${bookId}`);
  if (!res.ok) {
    throw new Error('Failed to fetch reviews');
  }
  return res.json();
};



