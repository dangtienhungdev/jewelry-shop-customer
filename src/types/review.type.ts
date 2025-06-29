// Review interfaces based on backend API

export interface Review {
  _id: string;
  productId: string;
  customerId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: string;
  isApproved: boolean;
  approvedBy?: string;
  approvedAt?: string;
  response?: string;
  responseDate?: string;
  helpfulCount: number;
  isVerifiedPurchase: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  customer?: {
    _id: string;
    fullName: string;
  };
  product?: {
    _id: string;
    productName: string;
  };
}

export interface CreateReviewDto {
  productId: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
}

export interface UpdateReviewDto {
  rating?: number;
  title?: string;
  comment?: string;
  images?: string[];
  helpfulCount?: number;
}

export interface ReviewQueryParams {
  productId?: string;
  customerId?: string;
  rating?: number;
  isApproved?: boolean;
  page?: number;
  limit?: number;
}

export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface CanReviewResponse {
  canReview: boolean;
}

// Form interfaces for frontend
export interface ReviewFormData {
  rating: number;
  title: string;
  comment: string;
  images?: File[];
}

export interface ReviewFilterState {
  rating?: number;
  sortBy: 'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'helpful';
  page: number;
  limit: number;
}
