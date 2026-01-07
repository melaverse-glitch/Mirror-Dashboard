"use client";

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating?: number; // 0-5, can be undefined for empty state
  size?: number;
}

export default function StarRating({ rating = 0, size = 20 }: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-none text-gray-600'
          } transition-colors`}
        />
      ))}
    </div>
  );
}
