import { api } from '@/configs';
import type { ApiResponse, PaginatedApiResponse } from '@/types/api.type';
import type {
	Category,
	CategoryQueryParams,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from '@/types/category.type';

// Categories API endpoints
export const categoryApi = {
	// GET /categories - Lấy danh sách categories
	getCategories: (params?: CategoryQueryParams) => {
		return api.get<PaginatedApiResponse<Category>>('/categories', { params });
	},

	// GET /categories/:id - Lấy chi tiết category
	getCategoryById: (id: string) => {
		return api.get<ApiResponse<Category>>(`/categories/${id}`);
	},

	// GET /categories/active - Lấy categories active (cho dropdown, filter, v.v.)
	getActiveCategories: (params?: Omit<CategoryQueryParams, 'isActive'>) => {
		return api.get<PaginatedApiResponse<Category>>('/categories/active', {
			params,
		});
	},

	// POST /categories - Tạo category mới
	createCategory: (data: CreateCategoryPayload) => {
		return api.post<ApiResponse<Category>>('/categories', data);
	},

	// PUT /categories/:id - Cập nhật category
	updateCategory: (data: UpdateCategoryPayload) => {
		const { id, ...updateData } = data;
		return api.put<ApiResponse<Category>>(`/categories/${id}`, updateData);
	},

	// PATCH /categories/:id - Cập nhật một phần category
	patchCategory: (data: UpdateCategoryPayload) => {
		const { id, ...updateData } = data;
		return api.patch<ApiResponse<Category>>(`/categories/${id}`, updateData);
	},

	// DELETE /categories/:id - Xóa category
	deleteCategory: (id: string) => {
		return api.delete<ApiResponse<null>>(`/categories/${id}`);
	},

	// PATCH /categories/:id/toggle-status - Toggle active status
	toggleCategoryStatus: (id: string) => {
		return api.patch<ApiResponse<Category>>(`/categories/${id}/toggle-status`);
	},
};
