"use client"

import { useBook } from "../../hooks/useBook"
import { useReviews } from "../../hooks/useReviews"
import { useParams } from "next/navigation"
import Link from "next/link"
import ReviewForm from "./components/ReviewForm"

export default function BookPage() {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : undefined

  const { data: book, isLoading: bookLoading, isError: bookError } = useBook(id)
  const { data: reviews, isLoading: reviewsLoading, isError: reviewsError } = useReviews(id)

  if (bookLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading book...</p>
      </div>
    )

  if (bookError || !book)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Book wasn't found</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <Link href="/">
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium">
              ← Back to home
            </span>
          </Link>
        </div>

        <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow mb-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-black">{book.name}</h1>

            <p className="text-gray-700 leading-relaxed">{book.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Author:</span> {book.author_name}
                </p>
                {book.avgRating !== undefined && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">General Rating:</span> {book.avgRating}
                  </p>
                )}
                {book.reviewCount !== undefined && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total Rating:</span> {book.reviewCount}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-black">Avaliações</h2>

          <ReviewForm />


          {reviewsLoading && (
            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
              <p className="text-center text-gray-600">Carregando avaliações...</p>
            </div>
          )}

          {reviewsError && (
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <p className="text-center text-red-600">Erro ao carregar avaliações.</p>
            </div>
          )}

          {!reviewsLoading && reviews && reviews.length === 0 && (
            <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
              <p className="text-center text-gray-600 italic">Nenhuma avaliação encontrada.</p>
            </div>
          )}

          {!reviewsLoading && reviews && reviews.length > 0 && (
            <div className="grid gap-6">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-black">Nota:</span>
                      <span className="text-xl font-bold text-black">{review.rating}/5</span>
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium text-gray-900">Comentário:</span> {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
