import React, { useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	discountPercentage?: number;
	image: string;
}

const ProductList: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Mock data - trong thực tế sẽ fetch từ API
	const products: Product[] = [
		{
			id: '1',
			name: 'BRA MULTI ROSE',
			price: 990000,
			image:
				'https://storage.googleapis.com/a1aa/image/681e5adf-fe2f-4e76-d9c2-58a2791a8080.jpg',
		},
		{
			id: '2',
			name: 'BRA DOUBLE CHAIN BALL LABRADORITE HEART STONE',
			price: 590000,
			originalPrice: 790000,
			discountPercentage: 25,
			image:
				'https://storage.googleapis.com/a1aa/image/c6de6379-59f4-429f-8ca3-1dee46a54ea8.jpg',
		},
		{
			id: '3',
			name: 'BRA MULTI TWIST BOW',
			price: 890000,
			image:
				'https://storage.googleapis.com/a1aa/image/bfd5e730-456c-4baa-cc91-ea3e356a09ce.jpg',
		},
		{
			id: '4',
			name: 'RING BUTTERFLY',
			price: 990000,
			image:
				'https://storage.googleapis.com/a1aa/image/b5f06c7c-56b8-4294-cedd-bdc4fadbb6a1.jpg',
		},
		{
			id: '5',
			name: 'EARRINGS DOUBLE CHAIN LABRADORITE',
			price: 490000,
			originalPrice: 590000,
			discountPercentage: 17,
			image:
				'https://storage.googleapis.com/a1aa/image/e8d3be12-b5f3-44dc-eaf3-04933372ec28.jpg',
		},
		{
			id: '6',
			name: 'RING MULTI TWIST BOW',
			price: 890000,
			image:
				'https://storage.googleapis.com/a1aa/image/e4ee5e4e-1ba3-424c-bcea-0eeec9f06fe4.jpg',
		},
		{
			id: '7',
			name: 'BRA BLACK FLOWER',
			price: 990000,
			image:
				'https://storage.googleapis.com/a1aa/image/7619fbb8-01c9-4d02-e27c-8313582618fd.jpg',
		},
		{
			id: '8',
			name: 'EARRINGS LEAF DESIGN',
			price: 590000,
			image:
				'https://storage.googleapis.com/a1aa/image/202e1a86-96a2-4277-0ed4-bbc01233a063.jpg',
		},
		{
			id: '9',
			name: 'EARRINGS PEARL FLOWER',
			price: 890000,
			image:
				'https://storage.googleapis.com/a1aa/image/b658d9ec-bb59-4870-db31-3e39e1d820f6.jpg',
		},
	];

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
					<div className="text-gray-600 mb-4">{error}</div>
					<button
						onClick={() => window.location.reload()}
						className="bg-[#C49A4A] text-white px-6 py-2 rounded hover:bg-[#a67c3a] transition-colors"
					>
						Thử lại
					</button>
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
					name={product.name}
					price={product.price}
					originalPrice={product.originalPrice}
					discountPercentage={product.discountPercentage}
					image={product.image}
					onClick={() => handleProductClick(product.id)}
				/>
			))}
		</main>
	);
};

export default ProductList;
