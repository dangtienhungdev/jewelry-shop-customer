import type { ApiResponse, PaginatedApiResponse } from '@/types/api.type';
import type {
	Category,
	CategoryQueryParams,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from '@/types/category.type';
import type {
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryApi } from './category.api';

// Query keys for React Query
export const categoryKeys = {
	all: ['categories'] as const,
	lists: () => [...categoryKeys.all, 'list'] as const,
	list: (params?: CategoryQueryParams) =>
		[...categoryKeys.lists(), params] as const,
	details: () => [...categoryKeys.all, 'detail'] as const,
	detail: (id: string) => [...categoryKeys.details(), id] as const,
	active: () => [...categoryKeys.all, 'active'] as const,
};

// Hook để lấy danh sách categories
export const useCategories = (
	params?: CategoryQueryParams,
	options?: UseQueryOptions<PaginatedApiResponse<Category>>
) => {
	return useQuery({
		queryKey: categoryKeys.list(params),
		queryFn: async () => {
			const response = await categoryApi.getCategories(params);
			return response.data;
		},
		staleTime: 5 * 60 * 1000, // 5 minutes
		...options,
	});
};

// Hook để lấy chi tiết category
export const useCategory = (
	id: string,
	options?: UseQueryOptions<Category>
) => {
	return useQuery({
		queryKey: categoryKeys.detail(id),
		queryFn: async () => {
			const response = await categoryApi.getCategoryById(id);
			return response.data.data;
		},
		enabled: !!id,
		staleTime: 10 * 60 * 1000, // 10 minutes
		...options,
	});
};

// Hook để lấy categories active (cho dropdown, filter, v.v.)
export const useActiveCategories = (
	params?: Omit<CategoryQueryParams, 'isActive'>,
	options?: UseQueryOptions<PaginatedApiResponse<Category>>
) => {
	return useQuery({
		queryKey: categoryKeys.active(),
		queryFn: async () => {
			const response = await categoryApi.getActiveCategories(params);
			return response.data;
		},
		staleTime: 10 * 60 * 1000, // 10 minutes - Cache lâu hơn vì ít thay đổi
		...options,
	});
};

// Hook để tạo category mới
export const useCreateCategory = (
	options?: UseMutationOptions<
		ApiResponse<Category>,
		Error,
		CreateCategoryPayload
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: CreateCategoryPayload) => {
			const response = await categoryApi.createCategory(data);
			return response.data;
		},
		onSuccess: (data) => {
			// Invalidate and refetch categories list
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: categoryKeys.active() });

			// Add new category to cache
			queryClient.setQueryData(categoryKeys.detail(data.data.id), data.data);
		},
		...options,
	});
};

// Hook để cập nhật category
export const useUpdateCategory = (
	options?: UseMutationOptions<
		ApiResponse<Category>,
		Error,
		UpdateCategoryPayload
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateCategoryPayload) => {
			const response = await categoryApi.updateCategory(data);
			return response.data;
		},
		onSuccess: (data, variables) => {
			// Update category in cache
			queryClient.setQueryData(categoryKeys.detail(variables.id), data.data);

			// Invalidate lists to refetch
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: categoryKeys.active() });
		},
		...options,
	});
};

// Hook để xóa category
export const useDeleteCategory = (
	options?: UseMutationOptions<ApiResponse<null>, Error, string>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const response = await categoryApi.deleteCategory(id);
			return response.data;
		},
		onSuccess: (_, deletedId) => {
			// Remove category from cache
			queryClient.removeQueries({ queryKey: categoryKeys.detail(deletedId) });

			// Invalidate lists to refetch
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: categoryKeys.active() });
		},
		...options,
	});
};

// Hook để toggle active status
export const useToggleCategoryStatus = (
	options?: UseMutationOptions<ApiResponse<Category>, Error, string>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			const response = await categoryApi.toggleCategoryStatus(id);
			return response.data;
		},
		onSuccess: (data, categoryId) => {
			// Update category in cache
			queryClient.setQueryData(categoryKeys.detail(categoryId), data.data);

			// Invalidate lists to refetch
			queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
			queryClient.invalidateQueries({ queryKey: categoryKeys.active() });
		},
		...options,
	});
};
