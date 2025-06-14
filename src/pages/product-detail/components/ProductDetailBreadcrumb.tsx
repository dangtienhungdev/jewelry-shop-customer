import React from 'react';

interface ProductDetailBreadcrumbProps {
	categoryName?: string;
	productName?: string;
}

const ProductDetailBreadcrumb: React.FC<ProductDetailBreadcrumbProps> = ({
	categoryName = 'Nhẫn',
	productName = 'R MIDI GREEN',
}) => {
	return (
		<section className="mb-8 text-xs text-[#1B3B5B] font-normal">
			<div className="flex items-center space-x-1 mb-1">
				<i className="fas fa-home text-[10px]"></i>
				<a
					className="underline hover:text-[#C28B1B] transition-colors"
					href="/"
				>
					Trang chủ
				</a>
				<span>/</span>
				<a
					className="underline hover:text-[#C28B1B] transition-colors"
					href="/products"
				>
					Sản phẩm
				</a>
				<span>/</span>
				<span className="text-gray-600">{categoryName}</span>
				<span>/</span>
				<span className="text-black font-semibold">{productName}</span>
			</div>
		</section>
	);
};

export default ProductDetailBreadcrumb;
