import type { CheckoutData } from '@/contexts/CheckoutContext';
import type { CartItem } from '@/types/cart.type';
import React, { useState } from 'react';

interface OrderSummaryProps {
	checkoutData: CheckoutData;
	onPayment?: (paymentData: {
		items: CartItem[];
		subtotal: number;
		discount: number;
		shippingFee: number;
		total: number;
		discountCode?: string;
	}) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
	checkoutData,
	onPayment,
}) => {
	const [discountCode, setDiscountCode] = useState('');
	const [appliedDiscount, setAppliedDiscount] = useState(0);

	const { selectedItems, totalAmount } = checkoutData;
	const subtotal = totalAmount;
	const shippingFee = 20000;
	const total = subtotal - appliedDiscount + shippingFee;

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const handleApplyDiscount = (e: React.FormEvent) => {
		e.preventDefault();
		if (discountCode.toLowerCase() === 'sale10') {
			setAppliedDiscount(subtotal * 0.1);
		} else if (discountCode.toLowerCase() === 'welcome') {
			setAppliedDiscount(50000);
		} else {
			alert('Mã giảm giá không hợp lệ');
		}
	};

	const handlePayment = () => {
		const paymentData = {
			items: selectedItems,
			subtotal,
			discount: appliedDiscount,
			shippingFee,
			total,
			discountCode: appliedDiscount > 0 ? discountCode : undefined,
		};

		if (onPayment) {
			onPayment(paymentData);
		} else {
			// Fallback behavior
			console.log('Processing payment...', paymentData);
			alert(`Thanh toán thành công!\nTổng tiền: ${formatPrice(total)}`);
		}
	};

	return (
		<aside className="w-full lg:w-[360px] flex flex-col gap-6">
			{/* Cart Items */}
			<div className="bg-[#FAFAFA] border border-gray-200 rounded-md p-4">
				<h3 className="font-semibold text-sm mb-3">
					Giỏ Hàng
					<span className="text-xs font-normal ml-1">
						({selectedItems.length} sản phẩm)
					</span>
				</h3>
				<div className="space-y-3 mb-3">
					{selectedItems.map((item: CartItem) => (
						<div key={item.product.id} className="flex gap-3">
							<img
								alt={item.product.productName}
								className="w-[50px] h-[50px] object-contain rounded"
								src={
									item.product.images[0] ||
									'https://via.placeholder.com/50x50?text=No+Image'
								}
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.src =
										'https://via.placeholder.com/50x50?text=No+Image';
								}}
							/>
							<div className="text-xs text-gray-600">
								<p className="font-semibold text-[#1B3B5B] mb-0.5">
									{item.product.productName}
								</p>
								<p className="mb-0.5">Số lượng: {item.quantity}</p>
								<p className="text-[10px] text-gray-500 mb-0.5">
									Đơn giá: {formatPrice(item.effectivePrice)}
								</p>
								<p className="font-semibold text-[13px] text-black mb-0">
									Thành tiền: {formatPrice(item.subtotal)}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="border-t border-gray-300 pt-2 flex justify-between font-semibold text-[#1B3B5B] text-sm">
					<span>Tạm tính</span>
					<span className="text-[#1B3B5B] font-bold">
						{formatPrice(subtotal)}
					</span>
				</div>
			</div>

			{/* Discount Code */}
			<div className="bg-[#FAFAFA] border border-gray-200 rounded-md p-4">
				<h3 className="font-semibold text-sm mb-3">Mã Giảm Giá</h3>
				<form className="flex gap-2" onSubmit={handleApplyDiscount}>
					<input
						className="flex-1 border border-[#1B3B5B] rounded-md text-xs px-3 py-2 focus:outline-none focus:border-[#C28B1B] transition-colors"
						placeholder="Nhập mã giảm giá"
						type="text"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
					/>
					<button
						className="bg-[#C28B1B] text-white text-xs font-semibold px-4 rounded-md hover:bg-[#a67a16] transition-colors"
						type="submit"
					>
						ÁP DỤNG
					</button>
				</form>

				{/* Price Summary */}
				<div className="mt-4 text-xs text-black">
					<div className="flex justify-between mb-1">
						<span>Tạm tính:</span>
						<span className="font-bold">{formatPrice(subtotal)}</span>
					</div>
					<div className="flex justify-between mb-1">
						<span>Giảm giá:</span>
						<span
							className={
								appliedDiscount > 0 ? 'text-green-600 font-semibold' : ''
							}
						>
							-{formatPrice(appliedDiscount)}
						</span>
					</div>
					<div className="flex justify-between mb-3">
						<span>Phí vận chuyển:</span>
						<span>{formatPrice(shippingFee)}</span>
					</div>
					<div className="flex justify-between font-bold text-red-600 text-lg">
						<span>Thành tiền:</span>
						<span>{formatPrice(total)}</span>
					</div>
				</div>

				<p className="text-[10px] text-gray-400 mt-2">
					Vui lòng kiểm tra Sản phẩm & Mã giảm giá trước khi thanh toán
				</p>

				{/* Discount Hints */}
				{appliedDiscount === 0 && (
					<div className="mt-2 text-[10px] text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
						<i className="fas fa-info-circle text-blue-500 mr-1"></i>
						Thử mã: <span className="font-semibold">SALE10</span> hoặc{' '}
						<span className="font-semibold">WELCOME</span>
					</div>
				)}
			</div>

			{/* Payment Button */}
			<button
				className="bg-[#C28B1B] text-white font-semibold text-sm rounded-md py-3 hover:bg-[#a67a16] transition-colors shadow-md"
				type="button"
				onClick={handlePayment}
			>
				Thanh Toán - {formatPrice(total)}
			</button>
		</aside>
	);
};

export default OrderSummary;
