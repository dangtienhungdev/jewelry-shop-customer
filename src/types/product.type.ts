import type { BaseQueryParams, ProductSortBy, SortOrder } from './api.type';

// Category interface
export interface Category {
	id: string;
	categoryName: string;
	description: string;
}

// Product interface
export interface Product {
	id: string;
	productName: string;
	description: string;
	price: number;
	discountedPrice: number;
	effectivePrice: number;
	discountPercentage: number;
	weight: number;
	material: string;
	stockQuantity: number;
	categoryId: string;
	category: Category;
	isFeatured: boolean;
	views: number;
	images: string[];
	discounts: any[];
	createdAt: string;
	updatedAt: string;
}

// Query parameters for products
export interface ProductQueryParams extends BaseQueryParams {
	categoryId?: string;
	isFeatured?: boolean;
	material?: string;
	minPrice?: number;
	maxPrice?: number;
	search?: string;
	sortBy?: ProductSortBy;
	sortOrder?: SortOrder;
}

// Create product payload
export interface CreateProductPayload {
	productName: string;
	description: string;
	price: number;
	discountedPrice?: number;
	weight: number;
	material: string;
	stockQuantity: number;
	categoryId: string;
	isFeatured?: boolean;
	images?: string[];
}

// Update product payload
export interface UpdateProductPayload extends Partial<CreateProductPayload> {
	id: string;
}
