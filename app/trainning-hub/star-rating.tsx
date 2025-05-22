"use client"

import { Star, StarHalf } from "lucide-react"

export function StarRating({ rating }: { rating: number }) {
  // Convert rating to array of full, half, or empty stars
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex items-center gap-1 mt-2 mb-1">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      ))}

      {/* Half star if needed */}
      {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}

      {/* Empty stars */}
      {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400/40" />
      ))}

      <span className="text-xs text-yellow-400/90 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}
