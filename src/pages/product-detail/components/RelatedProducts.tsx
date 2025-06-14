import type { RelatedProduct } from '@/types/productDetail.type';
import React from 'react';

const RelatedProducts: React.FC = () => {
	// Mock data
	const relatedProducts: RelatedProduct[] = [
		{
			id: '2',
			name: 'R MIDI BIG 6MM GEM',
			price: 1399000,
			originalPrice: 1599000,
			discountPercentage: 13,
			image:
				'https://storage.googleapis.com/a1aa/image/cbae6a4e-dc18-4a66-4ffe-11a5e4f314c5.jpg',
			rating: 4.5,
			category: 'Nhẫn',
		},
		{
			id: '3',
			name: 'BRA MULTI ROSE',
			price: 990000,
			image:
				'https://storage.googleapis.com/a1aa/image/681e5adf-fe2f-4e76-d9c2-58a2791a8080.jpg',
			rating: 4.8,
			category: 'Lắc tay',
		},
		{
			id: '4',
			name: 'BRA MULTI TWIST BOW',
			price: 890000,
			originalPrice: 1090000,
			discountPercentage: 18,
			image:
				'https://storage.googleapis.com/a1aa/image/bfd5e730-456c-4baa-cc91-ea3e356a09ce.jpg',
			rating: 4.3,
			category: 'Lắc tay',
		},
		{
			id: '5',
			name: 'EARRINGS LEAF DESIGN',
			price: 590000,
			image:
				'https://storage.googleapis.com/a1aa/image/202e1a86-96a2-4277-0ed4-bbc01233a063.jpg',
			rating: 4.6,
			category: 'Bông tai',
		},
		{
			id: '6',
			name: 'RING BUTTERFLY',
			price: 990000,
			image:
				'https://storage.googleapis.com/a1aa/image/b5f06c7c-56b8-4294-cedd-bdc4fadbb6a1.jpg',
			rating: 4.7,
			category: 'Nhẫn',
		},
		{
			id: '7',
			name: 'EARRINGS PEARL FLOWER',
			price: 890000,
			originalPrice: 990000,
			discountPercentage: 10,
			image:
				'https://storage.googleapis.com/a1aa/image/b658d9ec-bb59-4870-db31-3e39e1d820f6.jpg',
			rating: 4.4,
			category: 'Bông tai',
		},
	];

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, index) => (
			<i
				key={index}
				className={`fas fa-star text-xs ${
					index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
				}`}
			></i>
		));
	};

	const handleProductClick = (productId: string) => {
		// Điều hướng đến trang chi tiết sản phẩm khác
		console.log('Navigate to product:', productId);
		// navigate(`/product-detail/${productId}`);
	};

	return (
		<section className="bg-white">
			<div className="border-t border-gray-200 pt-8">
				<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
					<span className="border-l-4 border-[#C28B1B] pl-3 mr-2">
						Sản phẩm liên quan
					</span>
				</h2>

				{/* Products Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{relatedProducts.map((product) => (
						<div
							key={product.id}
							onClick={() => handleProductClick(product.id)}
							className="bg-white border border-gray-200 rounded-md p-3 hover:shadow-lg transition-all duration-300 cursor-pointer group"
						>
							{/* Product Image */}
							<div className="relative overflow-hidden rounded-md mb-3">
								<img
									alt={product.name}
									className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
									src={product.image}
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src =
											'https://via.placeholder.com/160x160?text=No+Image';
									}}
								/>
								{product.discountPercentage &&
									product.discountPercentage > 0 && (
										<div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
											-{product.discountPercentage}%
										</div>
									)}
								{/* Quick View Overlay */}
								<div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
									<button className="bg-white text-gray-800 px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors">
										Xem nhanh
									</button>
								</div>
							</div>

							{/* Product Info */}
							<div>
								{/* Category */}
								<div className="text-xs text-gray-500 mb-1">
									{product.category}
								</div>

								{/* Product Name */}
								<h3
									className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#C28B1B] transition-colors"
									title={product.name}
								>
									{product.name}
								</h3>

								{/* Rating */}
								{product.rating && (
									<div className="flex items-center space-x-1 mb-2">
										<div className="flex space-x-1">
											{renderStars(product.rating)}
										</div>
										<span className="text-xs text-gray-600">
											({product.rating})
										</span>
									</div>
								)}

								{/* Price */}
								<div className="space-y-1">
									<div className="text-sm font-bold text-[#C28B1B]">
										{formatPrice(product.price)}
									</div>
									{product.originalPrice &&
										product.originalPrice > product.price && (
											<div className="text-xs text-gray-500 line-through">
												{formatPrice(product.originalPrice)}
											</div>
										)}
								</div>

								{/* Add to Cart Button */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										console.log('Add to cart:', product.id);
										alert(`Đã thêm ${product.name} vào giỏ hàng!`);
									}}
									className="w-full mt-3 bg-[#C28B1B] text-white text-xs font-semibold py-2 px-3 rounded-md hover:bg-[#a67a16] transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
								>
									<i className="fas fa-shopping-cart mr-1"></i>
									Thêm vào giỏ
								</button>
							</div>
						</div>
					))}
				</div>

				{/* View More Button */}
				<div className="text-center mt-8">
					<button
						onClick={() => {
							// Điều hướng đến trang products với filter
							console.log('View more related products');
							// navigate('/products?category=nhan');
						}}
						className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
					>
						Xem thêm sản phẩm liên quan
						<i className="fas fa-arrow-right ml-2"></i>
					</button>
				</div>
			</div>
		</section>
	);
};

export default RelatedProducts;
