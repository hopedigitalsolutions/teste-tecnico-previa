interface ReviewInput {
  rating: number;
  comment: string;
  bookId: string;
}

export const postReview = async (newReview: ReviewInput) => {
    const res = await fetch(`http://localhost:3001/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
    });

    if (!res.ok) {
        throw new Error('Erro ao enviar review');
    }

    return res.json();
}