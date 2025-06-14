import React from 'react';

const ProductBreadcrumb: React.FC = () => {
	return (
		<section className="mt-6">
			<div className="text-xs text-gray-700 mb-1 flex items-center space-x-1">
				<i className="fas fa-home text-[10px]"></i>
				<a className="underline font-semibold" href="/">
					Trang chủ
				</a>
				<span>/ NEW COLLECTIONS</span>
			</div>
			<div className="text-xs text-gray-700 mb-4">
				NEW COLLECTION (1232 sản phẩm)
			</div>
			{/* <div className="flex justify-end mb-6">
				<select
					aria-label="Sort products"
					className="text-xs border border-[#C49A4A] rounded px-2 py-1 text-[#C49A4A] focus:outline-none"
				>
					<option>Mặc định</option>
					<option>Giá tăng dần</option>
					<option>Giá giảm dần</option>
					<option>Mới nhất</option>
				</select>
			</div> */}
		</section>
	);
};

export default ProductBreadcrumb;
