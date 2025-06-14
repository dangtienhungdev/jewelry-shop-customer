import { api } from '@/configs';
import type { ApiResponse, PaginatedApiResponse } from '@/types/api.type';
import type {
	CreateProductPayload,
	Product,
	ProductQueryParams,
	UpdateProductPayload,
} from '@/types/product.type';

// Products API endpoints
export const productApi = {
	// GET /products - Lấy danh sách sản phẩm với pagination và filter
	getProducts: (params?: ProductQueryParams) => {
		return api.get<PaginatedApiResponse<Product>>('/products', { params });
	},

	// GET /products/:id - Lấy chi tiết sản phẩm
	getProductById: (id: string) => {
		return api.get<Product>(`/products/${id}`);
	},

	// POST /products - Tạo sản phẩm mới
	createProduct: (data: CreateProductPayload) => {
		return api.post<ApiResponse<Product>>('/products', data);
	},

	// PUT /products/:id - Cập nhật sản phẩm
	updateProduct: (data: UpdateProductPayload) => {
		const { id, ...updateData } = data;
		return api.put<ApiResponse<Product>>(`/products/${id}`, updateData);
	},

	// PATCH /products/:id - Cập nhật một phần sản phẩm
	patchProduct: (data: UpdateProductPayload) => {
		const { id, ...updateData } = data;
		return api.patch<ApiResponse<Product>>(`/products/${id}`, updateData);
	},

	// DELETE /products/:id - Xóa sản phẩm
	deleteProduct: (id: string) => {
		return api.delete<ApiResponse<null>>(`/products/${id}`);
	},

	// GET /products/featured - Lấy sản phẩm nổi bật
	getFeaturedProducts: (params?: Omit<ProductQueryParams, 'isFeatured'>) => {
		return api.get<PaginatedApiResponse<Product>>('/products/featured', {
			params,
		});
	},

	// GET /products/search - Tìm kiếm sản phẩm
	searchProducts: (
		params: Pick<ProductQueryParams, 'search' | 'page' | 'limit'>
	) => {
		return api.get<PaginatedApiResponse<Product>>('/products/search', {
			params,
		});
	},
};
