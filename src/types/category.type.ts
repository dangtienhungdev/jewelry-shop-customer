import type { BaseQueryParams, SortOrder } from './api.type';

// Category interface
export interface Category {
	id: string;
	categoryName: string;
	description: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

// Category query parameters
export interface CategoryQueryParams extends BaseQueryParams {
	search?: string;
	isActive?: boolean;
	sortBy?: CategorySortBy;
	sortOrder?: SortOrder;
}

// Sort options for categories
export type CategorySortBy = 'categoryName' | 'createdAt' | 'updatedAt';

// Create category payload
export interface CreateCategoryPayload {
	categoryName: string;
	description?: string;
	isActive?: boolean;
}

// Update category payload
export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
	id: string;
}
