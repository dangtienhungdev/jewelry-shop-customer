import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating?: number;
  totalReviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  totalReviews = 0,
  size = 'sm',
  showCount = true,
  className,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Stars */}
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.floor(rating);
          const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;
          
          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                isFilled || isHalfFilled
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 fill-gray-300'
              )}
            />
          );
        })}
      </div>
      
      {/* Rating and Review Count */}
      {showCount && (rating > 0 || totalReviews > 0) && (
        <span className={cn('text-gray-600', textSizeClasses[size])}>
          {rating > 0 && (
            <>
              {rating.toFixed(1)}
              {totalReviews > 0 && (
                <span className="text-gray-400 ml-1">
                  ({totalReviews})
                </span>
              )}
            </>
          )}
          {rating === 0 && totalReviews === 0 && (
            <span className="text-gray-400">Chưa có đánh giá</span>
          )}
        </span>
      )}
    </div>
  );
};

export default StarRating;
