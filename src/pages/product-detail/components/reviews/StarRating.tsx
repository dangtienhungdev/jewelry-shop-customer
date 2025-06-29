import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  const getStarColor = (starIndex: number) => {
    const currentRating = hoverRating || rating;
    
    if (starIndex <= currentRating) {
      return 'text-yellow-400 fill-yellow-400';
    }
    return 'text-gray-300 fill-gray-300';
  };

  return (
    <div 
      className={cn(
        'flex items-center gap-1',
        interactive && 'cursor-pointer',
        className
      )}
    >
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1;
        
        return (
          <Star
            key={index}
            className={cn(
              sizeClasses[size],
              getStarColor(starRating),
              interactive && 'transition-colors hover:scale-110'
            )}
            onClick={() => handleClick(starRating)}
            onMouseEnter={() => handleMouseEnter(starRating)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
      
      {!interactive && (
        <span className="ml-1 text-sm text-gray-600">
          ({rating}/{maxRating})
        </span>
      )}
    </div>
  );
};

export default StarRating;
