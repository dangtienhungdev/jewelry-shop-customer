import { useNavigate, useParams } from 'react-router-dom';

import { useRelatedProducts } from '@/apis/products';
import React from 'react';

interface RelatedProductsProps {
	productId?: string;
	limit?: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
	productId: propProductId,
	limit = 8,
}) => {
	const navigate = useNavigate();
	const { id: urlProductId } = useParams<{ id: string }>();

	// Sử dụng productId từ props hoặc từ URL params
	const currentProductId = propProductId || urlProductId;

	const {
		data: relatedData,
		isLoading,
		error,
	} = useRelatedProducts(currentProductId || '', limit);

	const relatedProducts = relatedData?.data?.items || [];

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
		navigate(`/product-detail/${productId}`);
	};

	const handleViewMore = () => {
		// Điều hướng đến trang products với filter theo category
		if (
			relatedProducts.length > 0 &&
			relatedProducts[0].category?.categoryName
		) {
			navigate(
				`/products?category=${relatedProducts[0].category.categoryName}`
			);
		} else {
			navigate('/products');
		}
	};

	// Loading state
	if (isLoading) {
		return (
			<section className="bg-white">
				<div className="border-t border-gray-200 pt-8">
					<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
						<span className="border-l-4 border-[#C28B1B] pl-3 mr-2">
							Sản phẩm liên quan
						</span>
					</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
						{Array.from({ length: 6 }).map((_, index) => (
							<div
								key={index}
								className="bg-white border border-gray-200 rounded-md p-3"
							>
								<div className="animate-pulse">
									<div className="bg-gray-200 h-40 rounded-md mb-3"></div>
									<div className="space-y-2">
										<div className="bg-gray-200 h-4 rounded"></div>
										<div className="bg-gray-200 h-6 rounded"></div>
										<div className="bg-gray-200 h-4 rounded w-2/3"></div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="bg-white">
				<div className="border-t border-gray-200 pt-8">
					<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
						<span className="border-l-4 border-[#C28B1B] pl-3 mr-2">
							Sản phẩm liên quan
						</span>
					</h2>
					<div className="text-center py-8">
						<p className="text-gray-500">Không thể tải sản phẩm liên quan</p>
					</div>
				</div>
			</section>
		);
	}

	// Empty state
	if (relatedProducts.length === 0) {
		return (
			<section className="bg-white">
				<div className="border-t border-gray-200 pt-8">
					<h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
						<span className="border-l-4 border-[#C28B1B] pl-3 mr-2">
							Sản phẩm liên quan
						</span>
					</h2>
					<div className="text-center py-8">
						<p className="text-gray-500">Không có sản phẩm liên quan</p>
					</div>
				</div>
			</section>
		);
	}

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
									alt={product.productName}
									className="w-full h-40 object-contain group-hover:scale-105 transition-transform duration-300"
									src={product.images?.[0] || '/placeholder-product.jpg'}
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.src = '/placeholder-product.jpg';
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
									{product.category?.categoryName || 'Không phân loại'}
								</div>

								{/* Product Name */}
								<h3
									className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#C28B1B] transition-colors"
									title={product.productName}
								>
									{product.productName}
								</h3>

								{/* Price */}
								<div className="space-y-1">
									<div className="text-sm font-bold text-[#C28B1B]">
										{formatPrice(product.effectivePrice)}
									</div>
									{product.discountedPrice &&
										product.discountedPrice < product.price && (
											<div className="text-xs text-gray-500 line-through">
												{formatPrice(product.price)}
											</div>
										)}
								</div>

								{/* Add to Cart Button */}
								<button
									onClick={(e) => {
										e.stopPropagation();
										console.log('Add to cart:', product.id);
										// TODO: Implement add to cart functionality
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
				{/* {relatedProducts.length > 0 && (
					<div className="text-center mt-8">
						<button
							onClick={handleViewMore}
							className="bg-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-md hover:bg-gray-300 transition-colors"
						>
							Xem thêm sản phẩm liên quan
							<i className="fas fa-arrow-right ml-2"></i>
						</button>
					</div>
				)} */}
			</div>
		</section>
	);
};

export default RelatedProducts;
