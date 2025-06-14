import type { ApiResponse, PaginatedApiResponse } from '@/types/api.type';
import type {
	CreateProductPayload,
	Product,
	ProductQueryParams,
	UpdateProductPayload,
} from '@/types/product.type';
import type {
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { productApi } from './product.api';

// Query keys for React Query
export const productKeys = {
	all: ['products'] as const,
	lists: () => [...productKeys.all, 'list'] as const,
	list: (params?: ProductQueryParams) =>
		[...productKeys.lists(), params] as const,
	details: () => [...productKeys.all, 'detail'] as const,
	detail: (id: string) => [...productKeys.details(), id] as const,
	featured: () => [...productKeys.all, 'featured'] as const,
	search: (params: Pick<ProductQueryParams, 'search' | 'page' | 'limit'>) =>
		[...productKeys.all, 'search', params] as const,
};

// Hook để lấy danh sách sản phẩm
export const useProducts = (
	params?: ProductQueryParams,
	options?: UseQueryOptions<PaginatedApiResponse<Product>>
) => {
	return useQuery({
		queryKey: productKeys.list(params),
		queryFn: async () => {
			const response = await productApi.getProducts(params);
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		...options,
	});
};

// Hook để lấy chi tiết sản phẩm
export const useProduct = (id: string, options?: UseQueryOptions<Product>) => {
	return useQuery({
		queryKey: productKeys.detail(id),
		queryFn: async () => {
			const response = await productApi.getProductById(id);
			return response.data;
		},
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutes
		...options,
	});
};

// Hook để lấy sản phẩm nổi bật
export const useFeaturedProducts = (
	params?: Omit<ProductQueryParams, 'isFeatured'>,
	options?: UseQueryOptions<PaginatedApiResponse<Product>>
) => {
	return useQuery({
		queryKey: productKeys.featured(),
		queryFn: async () => {
			const response = await productApi.getFeaturedProducts(params);
			return response.data;
		},
		staleTime: 10 * 60 * 1000, // 10 minutes
		...options,
	});
};

// Hook để tìm kiếm sản phẩm
export const useSearchProducts = (
	params: Pick<ProductQueryParams, 'search' | 'page' | 'limit'>,
	options?: UseQueryOptions<PaginatedApiResponse<Product>>
) => {
	return useQuery({
		queryKey: productKeys.search(params),
		queryFn: async () => {
			const response = await productApi.searchProducts(params);
			return response.data;
		},
		enabled: !!params.search,
		staleTime: 2 * 60 * 1000, // 2 minutes
		...options,
	});
};

// Hook để tạo sản phẩm mới
export const useCreateProduct = (
	options?: UseMutationOptions<
		ApiResponse<Product>,
		Error,
		CreateProductPayload
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateProductPayload) => {
			const response = await productApi.createProduct(data);
			return response.data;
		},
		onSuccess: (data) => {
			// Invalidate and refetch products list
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.featured() });

			// Add new product to cache
			queryClient.setQueryData(productKeys.detail(data.data.id), data.data);
		},
		...options,
	});
};

// Hook để cập nhật sản phẩm
export const useUpdateProduct = (
	options?: UseMutationOptions<
		ApiResponse<Product>,
		Error,
		UpdateProductPayload
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateProductPayload) => {
			const response = await productApi.updateProduct(data);
			return response.data;
		},
		onSuccess: (data, variables) => {
			// Update product in cache
			queryClient.setQueryData(productKeys.detail(variables.id), data.data);

			// Invalidate lists to refetch
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.featured() });
		},
		...options,
	});
};

// Hook để xóa sản phẩm
export const useDeleteProduct = (
	options?: UseMutationOptions<ApiResponse<null>, Error, string>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const response = await productApi.deleteProduct(id);
			return response.data;
		},
		onSuccess: (_, deletedId) => {
			// Remove product from cache
			queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });

			// Invalidate lists to refetch
			queryClient.invalidateQueries({ queryKey: productKeys.lists() });
			queryClient.invalidateQueries({ queryKey: productKeys.featured() });
		},
		...options,
	});
};
