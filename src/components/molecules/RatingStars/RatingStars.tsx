// src/components/molecules/RatingStars/RatingStars.tsx
import React, { useState } from 'react';

interface RatingStarsProps {
  gameId?: string; // Make optional
  initialRating: number;
  onUpdateRating?: (rating: number) => void; // Make optional
  readOnly?: boolean; // Add this
  size?: 'small' | 'medium' | 'large'; // Add this
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  initialRating,
  onUpdateRating = () => {}, // Default no-op function
  readOnly = false,
  size = 'medium',
}: RatingStarsProps) => {
  const [rating, setRating] = useState(Math.round(initialRating));
  const [hover, setHover] = useState(0);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const handleClick = (selectedRating: number) => {
    if (readOnly) return;
    setRating(selectedRating);
    onUpdateRating(selectedRating);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={index}
            type="button"
            className={`focus:outline-none ${
              readOnly ? 'cursor-default' : 'cursor-pointer'
            }`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
          >
            <svg
              className={`${sizeClasses[size]} ${
                starValue <= (hover || rating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              fill={starValue <= (hover || rating) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        );
      })}
    </div>
  );
};
