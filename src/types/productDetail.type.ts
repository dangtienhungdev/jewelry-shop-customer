import type { Product } from './product.type';

export interface ProductDetail extends Product {
	longDescription: string;
	specifications: ProductSpecification[];
	reviews: ProductReview[];
	averageRating: number;
	totalReviews: number;
	tags: string[];
	variants?: ProductVariant[];
}

export interface ProductSpecification {
	name: string;
	value: string;
}

export interface ProductReview {
	id: string;
	userId: string;
	userName: string;
	rating: number;
	comment: string;
	createdAt: string;
	images?: string[];
}

export interface ProductVariant {
	id: string;
	name: string;
	price: number;
	discountedPrice?: number;
	stockQuantity: number;
	images: string[];
}

export interface RelatedProduct {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	discountPercentage?: number;
	image: string;
	rating?: number;
	category: string;
}
