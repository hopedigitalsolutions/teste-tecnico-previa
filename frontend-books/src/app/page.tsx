"use client";
import { useTopBooks } from "@/hooks/useTopBooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page(){
  const { data, isLoading, error } = useTopBooks();

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Loading...</p>
    </div>  
  );
  
  if (error) return ( 
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-red-600">error loading books.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Top Books</h1>
        
        <div className="grid gap-6">
          {data?.map((book) => (
            <div key={book._id} className="border border-gray-300 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-3">
                <h2 className="text-2xl font-bold text-black">{book.name}</h2>
                
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Author:</span> {book.author_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Rating:</span> {book.avgRating.toFixed(1)} ({book.reviewCount} reviews)
                    </p>
                  </div>
                  
                  <Link href={`/${book._id}`} className="mt-4 sm:mt-0">
                    <span className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors cursor-pointer text-sm font-medium">
                      See details
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};