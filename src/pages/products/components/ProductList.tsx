import type { Product } from '@/types';
import React from 'react';
import ProductCard from './ProductCard';

interface ProductListProps {
	currentPage: number;
	products: Product[];
	isLoading: boolean;
	error: Error | null;
}

const ProductList: React.FC<ProductListProps> = ({
	currentPage,
	products,
	isLoading,
	error,
}) => {
	const handleProductClick = (productId: string) => {
		// Điều hướng đến trang chi tiết sản phẩm
		console.log('Clicked product:', productId);
		// Có thể sử dụng react-router để navigate
		// navigate(`/products/${productId}`);
	};

	// Loading state
	if (isLoading) {
		return (
			<main className="flex-1">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{Array.from({ length: 9 }).map((_, index) => (
						<div key={index} className="border border-[#C49A4A] p-2">
							<div className="w-full h-[300px] bg-gray-200 animate-pulse rounded"></div>
							<div className="mt-2 space-y-2">
								<div className="h-4 bg-gray-200 animate-pulse rounded"></div>
								<div className="h-4 bg-gray-200 animate-pulse rounded w-2/3 mx-auto"></div>
							</div>
						</div>
					))}
				</div>
			</main>
		);
	}

	// Error state
	if (error) {
		return (
			<main className="flex-1">
				<div className="text-center py-12">
					<div className="text-red-500 text-lg font-semibold mb-4">
						Có lỗi xảy ra khi tải sản phẩm
					</div>
					<div className="text-gray-600 mb-4">{error.message}</div>
				</div>
			</main>
		);
	}

	// Empty state
	if (products.length === 0) {
		return (
			<main className="flex-1">
				<div className="text-center py-12">
					<div className="text-gray-500 text-lg font-semibold mb-4">
						Không tìm thấy sản phẩm nào
					</div>
					<div className="text-gray-400">Vui lòng thử lại với bộ lọc khác</div>
				</div>
			</main>
		);
	}

	return (
		<main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
			{products.map((product) => (
				<ProductCard
					key={product.id}
					id={product.id}
					name={product.productName}
					price={product.effectivePrice}
					originalPrice={
						product.discountPercentage > 0 ? product.price : undefined
					}
					discountPercentage={
						product.discountPercentage > 0
							? product.discountPercentage
							: undefined
					}
					image={product.images?.[0]}
					onClick={() => handleProductClick(product.id)}
				/>
			))}
		</main>
	);
};

export default ProductList;
