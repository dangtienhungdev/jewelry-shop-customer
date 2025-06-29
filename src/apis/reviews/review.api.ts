import type {
	CanReviewResponse,
	CreateReviewDto,
	Review,
	ReviewQueryParams,
	ReviewStats,
	ReviewsResponse,
	UpdateReviewDto,
} from '@/types/review.type';

import { api } from '@/configs';

export const reviewApi = {
	// GET /reviews - Get all reviews with filters
	getReviews: (params?: ReviewQueryParams) => {
		return api.get<ReviewsResponse>('/reviews', { params });
	},

	// GET /reviews/:id - Get a specific review
	getReviewById: (id: string) => {
		return api.get<Review>(`/reviews/${id}`);
	},

	// POST /reviews - Create a new review
	createReview: (data: CreateReviewDto & { customerId: string }) => {
		return api.post<Review>('/reviews', data);
	},

	// PATCH /reviews/:id - Update own review
	updateReview: (id: string, data: UpdateReviewDto) => {
		return api.patch<Review>(`/reviews/${id}`, data);
	},

	// DELETE /reviews/:id - Delete own review
	deleteReview: (id: string) => {
		return api.delete(`/reviews/${id}`);
	},

	// POST /reviews/can-review/:productId - Check if can review product
	canReviewProduct: (productId: string, customerId: string) => {
		return api.post<CanReviewResponse>(`/reviews/can-review/${productId}`, {
			customerId,
		});
	},

	// PATCH /reviews/:id/helpful - Mark review as helpful
	markReviewHelpful: (id: string) => {
		return api.patch<Review>(`/reviews/${id}/helpful`);
	},

	// GET /reviews/product/:productId/stats - Get product review statistics
	getProductReviewStats: (productId: string) => {
		return api.get<ReviewStats>(`/reviews/product/${productId}/stats`);
	},

	// GET /reviews?productId=xxx&isApproved=true - Get approved reviews for a product
	getProductReviews: (
		productId: string,
		params?: Omit<ReviewQueryParams, 'productId'>
	) => {
		return api.get<ReviewsResponse>('/reviews', {
			params: {
				productId,
				isApproved: true,
				...params,
			},
		});
	},

	// GET /reviews?customerId=xxx - Get customer's reviews
	getCustomerReviews: (
		customerId: string,
		params?: Omit<ReviewQueryParams, 'customerId'>
	) => {
		return api.get<ReviewsResponse>('/reviews', {
			params: {
				customerId,
				...params,
			},
		});
	},
};
