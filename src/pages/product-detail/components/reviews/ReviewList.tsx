import React, { useState } from 'react';
import { useProductReviews } from '@/apis/reviews';
import ReviewCard from './ReviewCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Loader2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { ReviewFilterState } from '@/types/review.type';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const [filters, setFilters] = useState<ReviewFilterState>({
    sortBy: 'newest',
    page: 1,
    limit: 5,
  });

  const { data, isLoading, isError } = useProductReviews(productId, {
    rating: filters.rating,
    page: filters.page,
    limit: filters.limit,
  });

  const handleFilterChange = (field: keyof ReviewFilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      page: field !== 'page' ? 1 : value, // Reset to page 1 when changing filters
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-600">Đang tải đánh giá...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">Không thể tải đánh giá. Vui lòng thử lại sau.</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.reviews.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
          <p className="text-sm text-gray-400 mt-1">
            Hãy là người đầu tiên đánh giá sản phẩm!
          </p>
        </CardContent>
      </Card>
    );
  }

  const { reviews, total, page, totalPages } = data;

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Lọc theo:</span>
            </div>
            
            {/* Rating Filter */}
            <Select
              value={filters.rating?.toString() || 'all'}
              onValueChange={(value) => 
                handleFilterChange('rating', value === 'all' ? undefined : parseInt(value))
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Số sao" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="5">5 sao</SelectItem>
                <SelectItem value="4">4 sao</SelectItem>
                <SelectItem value="3">3 sao</SelectItem>
                <SelectItem value="2">2 sao</SelectItem>
                <SelectItem value="1">1 sao</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <Select
              value={filters.sortBy}
              onValueChange={(value) => 
                handleFilterChange('sortBy', value as ReviewFilterState['sortBy'])
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sắp xếp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="rating-high">Đánh giá cao</SelectItem>
                <SelectItem value="rating-low">Đánh giá thấp</SelectItem>
                <SelectItem value="helpful">Hữu ích nhất</SelectItem>
              </SelectContent>
            </Select>

            {/* Show total */}
            <div className="text-sm text-gray-500 ml-auto">
              Hiển thị {reviews.length} / {total} đánh giá
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Trang {page} / {totalPages}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Trước
                </Button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, page - 2) + i;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                >
                  Sau
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewList;
