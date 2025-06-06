"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useCreateReview } from "@/hooks/useCreateReview"

export default function ReviewForm() {
  const params = useParams()
  const id = typeof params?.id === "string" ? params.id : ""
  const [bookId, setBookId] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const createReview = useCreateReview()

  useEffect(() => {
    if (id) setBookId(id)
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookId) return

    createReview.mutate({ bookId, rating, comment })
    setComment("")
    setRating(5)
  }

  return (
    <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-2xl font-bold text-black mb-6">Leave a rating</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate (1 to 5):</label>
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="w-20 px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-vertical"
            placeholder="Escreva seu comentário sobre o livro..."
          />
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={createReview.isPending}
            className={`inline-block px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              createReview.isPending
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 cursor-pointer"
            }`}
          >
            {createReview.isPending ? "Enviando..." : "Enviar Avaliação"}
          </button>
        </div>

        {createReview.isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">Error sending avaliation.</p>
          </div>
        )}

        {createReview.isSuccess && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">Erro sending avaliation!</p>
          </div>
        )}
      </form>
    </div>
  )
}
