import React from 'react';
import { Review } from '@/types/review.type';
import { useReviewHelpers, useMarkReviewHelpful } from '@/apis/reviews';
import StarRating from './StarRating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ThumbsUp, Shield, Calendar } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  showProductName?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  showProductName = false
}) => {
  const { formatReviewDate } = useReviewHelpers();
  const markHelpfulMutation = useMarkReviewHelpful();

  const handleMarkHelpful = () => {
    markHelpfulMutation.mutate(review._id);
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-medium text-gray-900">
                  {review.customer??.fullName || 'Khách hàng'}
                </h4>
                {review.isVerifiedPurchase && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Đã mua hàng
                  </Badge>
                )}
              </div>

              {showProductName && review.product && (
                <p className="text-sm text-gray-500 mb-2">
                  Sản phẩm: {review.product.productName}
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatReviewDate(review.reviewDate)}
              </div>
            </div>
          </div>

          {/* Rating and Title */}
          <div className="space-y-2">
            <StarRating rating={review.rating} size="sm" />
            <h5 className="font-medium text-gray-900">{review.title}</h5>
          </div>

          {/* Comment */}
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          )}

          {/* Admin Response */}
          {review.response && (
            <div className="bg-gray-50 border-l-4 border-primary p-4 rounded-r-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Phản hồi từ shop
                </Badge>
                {review.responseDate && (
                  <span className="text-xs text-gray-500">
                    {formatReviewDate(review.responseDate)}
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm">{review.response}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkHelpful}
              disabled={markHelpfulMutation.isPending}
              className="text-gray-500 hover:text-primary"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Hữu ích ({review.helpfulCount})
            </Button>

            {!review.isApproved && (
              <Badge variant="secondary" className="text-xs">
                Đang chờ duyệt
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
