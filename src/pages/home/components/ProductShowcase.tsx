import { useFeaturedProducts } from '@/apis';
import type { Product } from '@/types/product.type';
import React from 'react';

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(price);
};

const ProductShowcase: React.FC = () => {
	// Sử dụng hook để lấy sản phẩm nổi bật
	const {
		data: featuredProductsResponse,
		isLoading,
		error,
	} = useFeaturedProducts({
		limit: 8, // Lấy tối đa 8 sản phẩm
	});

	const featuredProducts = featuredProductsResponse?.data?.items || [];
	console.log('🚀 ~ featuredProducts:', featuredProductsResponse);

	// Loading state
	if (isLoading) {
		return (
			<section className="max-w-7xl mx-auto px-6 mt-20">
				<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4 text-center">
					Sản phẩm nhẫn đá quý
				</h3>
				<p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-8 text-center">
					Các mẫu nhẫn đá quý đa dạng về kiểu dáng, màu sắc, phù hợp với mọi
					phong cách và sở thích.
				</p>
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className="text-xs md:text-sm text-gray-900">
							<div className="rounded-md mb-1 w-full h-48 bg-gray-200 animate-pulse"></div>
							<div className="h-4 bg-gray-200 animate-pulse mb-1"></div>
							<div className="h-4 bg-gray-200 animate-pulse w-2/3"></div>
						</div>
					))}
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="max-w-7xl mx-auto px-6 mt-20">
				<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4 text-center">
					Sản phẩm nhẫn đá quý
				</h3>
				<p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-8 text-center">
					Các mẫu nhẫn đá quý đa dạng về kiểu dáng, màu sắc, phù hợp với mọi
					phong cách và sở thích.
				</p>
				<div className="text-center py-8">
					<p className="text-red-500 mb-4">Không thể tải sản phẩm nổi bật</p>
					<p className="text-gray-500 text-sm">Vui lòng thử lại sau</p>
				</div>
			</section>
		);
	}

	// Empty state
	if (featuredProducts.length === 0) {
		return (
			<section className="max-w-7xl mx-auto px-6 mt-20">
				<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4 text-center">
					Sản phẩm nhẫn đá quý
				</h3>
				<p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-8 text-center">
					Các mẫu nhẫn đá quý đa dạng về kiểu dáng, màu sắc, phù hợp với mọi
					phong cách và sở thích.
				</p>
				<div className="text-center py-8">
					<p className="text-gray-500">Chưa có sản phẩm nổi bật nào</p>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-6 mt-20">
			<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4 text-center">
				Sản phẩm nhẫn đá quý
			</h3>
			<p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-8 text-center">
				Các mẫu nhẫn đá quý đa dạng về kiểu dáng, màu sắc, phù hợp với mọi phong
				cách và sở thích.
			</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
				{featuredProducts.map((product: Product) => (
					<div key={product.id} className="text-xs md:text-sm text-gray-900">
						<img
							alt={product.productName}
							className="rounded-md mb-1 w-full h-48 object-cover"
							height={200}
							src={
								product.images?.[0] ||
								'https://via.placeholder.com/200x200?text=No+Image'
							}
							width={200}
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src =
									'https://via.placeholder.com/200x200?text=No+Image';
							}}
						/>
						<p className="truncate" title={product.productName}>
							{product.productName}
						</p>
						<p className="text-[#b87a1a] font-semibold">
							{formatPrice(product.effectivePrice)}
						</p>
						{product.discountPercentage > 0 && (
							<p className="text-gray-500 line-through text-xs">
								{formatPrice(product.price)}
							</p>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default ProductShowcase;
