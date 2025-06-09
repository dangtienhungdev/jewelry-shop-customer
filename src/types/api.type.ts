// Generic API Response type
export interface ApiResponse<T = any> {
	success: boolean;
	message: string;
	data: T;
	timestamp: string;
}

// Pagination data type
export interface PaginationData<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

// Paginated API Response type
export type PaginatedApiResponse<T> = ApiResponse<PaginationData<T>>;

// Query parameters for pagination and filtering
export interface BaseQueryParams {
	page?: number;
	limit?: number;
}

// Sort options
export type SortOrder = 'asc' | 'desc';
export type ProductSortBy = 'price' | 'createdAt' | 'views' | 'productName';
