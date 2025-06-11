import React from 'react';

const PaymentBreadcrumb: React.FC = () => {
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
				<span>/ THANH TOÁN</span>
			</div>
			<div className="font-normal text-[11px] text-black">
				THANH TOÁN ĐĐN HÀNG
			</div>
		</section>
	);
};

export default PaymentBreadcrumb;
