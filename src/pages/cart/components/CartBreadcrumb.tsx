import React from 'react';

interface CartBreadcrumbProps {
	itemCount?: number;
}

const CartBreadcrumb: React.FC<CartBreadcrumbProps> = ({ itemCount = 0 }) => {
	return (
		<section className="px-6 text-xs text-gray-700 py-4">
			<div className="flex items-center space-x-1 mb-1">
				<i className="fas fa-home text-[10px]"></i>
				<a className="text-[#2a4a6e] hover:underline" href="/">
					Trang chủ
				</a>
				<span>/ SHOPPING CART</span>
			</div>
			<div className="font-semibold">SHOPPING CART ({itemCount} sản phẩm)</div>
		</section>
	);
};

export default CartBreadcrumb;
