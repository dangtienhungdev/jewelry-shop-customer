import type {
	CanReviewResponse,
	CreateReviewDto,
	Review,
	ReviewQueryParams,
	ReviewStats,
	ReviewsResponse,
	UpdateReviewDto,
} from '@/types/review.type';
import type {
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { reviewApi } from './review.api';
import { toast } from 'sonner';

// Query keys for React Query
export const reviewKeys = {
	all: ['reviews'] as const,
	lists: () => [...reviewKeys.all, 'list'] as const,
	list: (params?: ReviewQueryParams) =>
		[...reviewKeys.lists(), params] as const,
	details: () => [...reviewKeys.all, 'detail'] as const,
	detail: (id: string) => [...reviewKeys.details(), id] as const,
	productReviews: (productId: string) =>
		[...reviewKeys.all, 'product', productId] as const,
	productStats: (productId: string) =>
		[...reviewKeys.all, 'stats', productId] as const,
	customerReviews: (customerId: string) =>
		[...reviewKeys.all, 'customer', customerId] as const,
	canReview: (productId: string) =>
		[...reviewKeys.all, 'can-review', productId] as const,
};

// Hook to get all reviews with filters
export const useReviews = (
	params?: ReviewQueryParams,
	options?: UseQueryOptions<ReviewsResponse>
) => {
	return useQuery({
		queryKey: reviewKeys.list(params),
		queryFn: async () => {
			const response = await reviewApi.getReviews(params);
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		...options,
	});
};

// Hook to get a specific review
export const useReview = (id: string, options?: UseQueryOptions<Review>) => {
	return useQuery({
		queryKey: reviewKeys.detail(id),
		queryFn: async () => {
			const response = await reviewApi.getReviewById(id);
			return response.data;
		},
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutes
		...options,
	});
};

// Hook to get reviews for a specific product
export const useProductReviews = (
	productId: string,
	params?: Omit<ReviewQueryParams, 'productId'>,
	options?: UseQueryOptions<ReviewsResponse>
) => {
	return useQuery({
		queryKey: reviewKeys.productReviews(productId),
		queryFn: async () => {
			const response = await reviewApi.getProductReviews(productId, params);
			return response.data;
		},
		enabled: !!productId,
		staleTime: 2 * 60 * 1000, // 2 minutes
		...options,
	});
};

// Hook to get product review statistics
export const useProductReviewStats = (
	productId: string,
	options?: UseQueryOptions<ReviewStats>
) => {
	return useQuery({
		queryKey: reviewKeys.productStats(productId),
		queryFn: async () => {
			const response = await reviewApi.getProductReviewStats(productId);
			return response.data;
		},
		enabled: !!productId,
		staleTime: 10 * 60 * 1000, // 10 minutes
		...options,
	});
};

// Hook to get customer's reviews
export const useCustomerReviews = (
	customerId: string,
	params?: Omit<ReviewQueryParams, 'customerId'>,
	options?: UseQueryOptions<ReviewsResponse>
) => {
	return useQuery({
		queryKey: reviewKeys.customerReviews(customerId),
		queryFn: async () => {
			const response = await reviewApi.getCustomerReviews(customerId, params);
			return response.data;
		},
		enabled: !!customerId,
		staleTime: 5 * 60 * 1000, // 5 minutes
		...options,
	});
};

// Hook to check if customer can review a product
export const useCanReviewProduct = (
	productId: string,
	customerId?: string,
	options?: UseQueryOptions<CanReviewResponse>
) => {
	return useQuery({
		queryKey: reviewKeys.canReview(productId),
		queryFn: async () => {
			if (!customerId) {
				throw new Error('Customer ID is required');
			}
			const response = await reviewApi.canReviewProduct(productId, customerId);
			return response.data;
		},
		enabled: !!productId && !!customerId,
		staleTime: 30 * 1000, // 30 seconds (short cache for dynamic check)
		...options,
	});
};

// Hook to create a new review
export const useCreateReview = (
	options?: UseMutationOptions<
		Review,
		Error,
		CreateReviewDto & { customerId: string }
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateReviewDto & { customerId: string }) => {
			const response = await reviewApi.createReview(data);
			return response.data;
		},
		onSuccess: (data, variables) => {
			// Invalidate and refetch related queries
			queryClient.invalidateQueries({
				queryKey: reviewKeys.productReviews(variables.productId),
			});
			queryClient.invalidateQueries({
				queryKey: reviewKeys.productStats(variables.productId),
			});
			queryClient.invalidateQueries({
				queryKey: reviewKeys.canReview(variables.productId),
			});
			queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });

			// Add new review to cache
			queryClient.setQueryData(reviewKeys.detail(data._id), data);

			toast.success('Đánh giá của bạn đã được gửi và đang chờ duyệt!');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Gửi đánh giá thất bại';
			toast.error(message);
		},
		...options,
	});
};

// Hook to update a review
export const useUpdateReview = (
	options?: UseMutationOptions<
		Review,
		Error,
		{ id: string; data: UpdateReviewDto }
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, data }: { id: string; data: UpdateReviewDto }) => {
			const response = await reviewApi.updateReview(id, data);
			return response.data;
		},
		onSuccess: (data) => {
			// Update review in cache
			queryClient.setQueryData(reviewKeys.detail(data._id), data);

			// Invalidate related queries
			queryClient.invalidateQueries({
				queryKey: reviewKeys.productReviews(data.productId),
			});
			queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });

			toast.success('Cập nhật đánh giá thành công!');
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.message || 'Cập nhật đánh giá thất bại';
			toast.error(message);
		},
		...options,
	});
};

// Hook to delete a review
export const useDeleteReview = (
	options?: UseMutationOptions<void, Error, string>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await reviewApi.deleteReview(id);
		},
		onSuccess: (_, deletedId) => {
			// Remove review from cache
			queryClient.removeQueries({ queryKey: reviewKeys.detail(deletedId) });

			// Invalidate related queries
			queryClient.invalidateQueries({ queryKey: reviewKeys.lists() });
			queryClient.invalidateQueries({ queryKey: reviewKeys.all });

			toast.success('Xóa đánh giá thành công!');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Xóa đánh giá thất bại';
			toast.error(message);
		},
		...options,
	});
};

// Hook to mark review as helpful
export const useMarkReviewHelpful = (
	options?: UseMutationOptions<Review, Error, string>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const response = await reviewApi.markReviewHelpful(id);
			return response.data;
		},
		onSuccess: (data) => {
			// Update review in cache
			queryClient.setQueryData(reviewKeys.detail(data._id), data);

			// Update in lists if exists
			queryClient.invalidateQueries({
				queryKey: reviewKeys.productReviews(data.productId),
			});

			toast.success('Cảm ơn bạn đã đánh giá hữu ích!');
		},
		onError: (error: any) => {
			const message =
				error?.response?.data?.message || 'Đánh dấu hữu ích thất bại';
			toast.error(message);
		},
		...options,
	});
};

// Helper hooks
export const useReviewHelpers = () => {
	const formatReviewDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const getStarDisplay = (rating: number) => {
		return '★'.repeat(rating) + '☆'.repeat(5 - rating);
	};

	const getReviewStatusText = (review: Review) => {
		if (review.isApproved) return 'Đã duyệt';
		return 'Đang chờ duyệt';
	};

	const getReviewStatusColor = (review: Review) => {
		if (review.isApproved) return 'text-green-600 bg-green-100';
		return 'text-yellow-600 bg-yellow-100';
	};

	return {
		formatReviewDate,
		getStarDisplay,
		getReviewStatusText,
		getReviewStatusColor,
	};
};
