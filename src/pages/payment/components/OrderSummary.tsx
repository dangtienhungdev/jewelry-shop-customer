import React, { useState } from 'react';
import { toast } from 'sonner';

import { orderApi, type VoucherValidationResponse } from '@/apis/orders';
import type { CheckoutData } from '@/contexts/CheckoutContext';
import type { CartItem } from '@/types/cart.type';

interface OrderSummaryProps {
	checkoutData: CheckoutData;
	shippingFee?: number; // Shipping fee from delivery info
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
	shippingFee = 30000,
	onPayment,
}) => {
	const [discountCode, setDiscountCode] = useState('');
	const [appliedDiscount, setAppliedDiscount] = useState(0);
	const [isValidatingVoucher, setIsValidatingVoucher] = useState(false);
	const [voucherValidation, setVoucherValidation] =
		useState<VoucherValidationResponse | null>(null);

	const { selectedItems, totalAmount } = checkoutData;
	const subtotal = totalAmount;
	const total = subtotal - appliedDiscount + shippingFee;

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	/**
	 * Handle voucher validation using backend API
	 */
	const handleApplyDiscount = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!discountCode.trim()) {
			toast.error('Vui lòng nhập mã voucher');
			return;
		}

		setIsValidatingVoucher(true);

		try {
			const validationResult = await orderApi.validateVoucher({
				voucherCode: discountCode.trim(),
				orderValue: subtotal,
			});

			setVoucherValidation(validationResult);

			if (validationResult.isValid) {
				setAppliedDiscount(validationResult.discountAmount || 0);
				toast.success('Áp dụng voucher thành công!', {
					description: `Giảm ${formatPrice(
						validationResult.discountAmount || 0
					)}`,
				});
			} else {
				setAppliedDiscount(0);
				toast.error('Voucher không hợp lệ', {
					description: validationResult.message,
				});
			}
		} catch (error) {
			console.error('Voucher validation error:', error);
			setAppliedDiscount(0);
			setVoucherValidation(null);
			toast.error('Lỗi kiểm tra voucher', {
				description: 'Vui lòng thử lại sau',
			});
		} finally {
			setIsValidatingVoucher(false);
		}
	};

	/**
	 * Remove applied voucher
	 */
	const handleRemoveVoucher = () => {
		setDiscountCode('');
		setAppliedDiscount(0);
		setVoucherValidation(null);
		toast.info('Đã xóa voucher');
	};

	const handlePayment = () => {
		const paymentData = {
			items: selectedItems,
			subtotal,
			discount: appliedDiscount,
			shippingFee,
			total,
			discountCode: voucherValidation?.isValid ? discountCode : undefined,
		};

		if (onPayment) {
			onPayment(paymentData);
		} else {
			// Fallback behavior
			console.log('Processing payment...', paymentData);
			toast.success(`Thanh toán thành công!\nTổng tiền: ${formatPrice(total)}`);
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

				{/* Voucher input form */}
				<form className="flex gap-2" onSubmit={handleApplyDiscount}>
					<input
						className="flex-1 border border-[#1B3B5B] rounded-md text-xs px-3 py-2 focus:outline-none focus:border-[#C28B1B] transition-colors disabled:bg-gray-100"
						placeholder="Nhập mã giảm giá"
						type="text"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
						disabled={isValidatingVoucher}
					/>
					<button
						className="bg-[#C28B1B] text-white text-xs font-semibold px-4 rounded-md hover:bg-[#a67a16] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
						type="submit"
						disabled={isValidatingVoucher || !discountCode.trim()}
					>
						{isValidatingVoucher ? (
							<>
								<i className="fas fa-spinner fa-spin mr-1"></i>
								KIỂM TRA
							</>
						) : (
							'ÁP DỤNG'
						)}
					</button>
				</form>

				{/* Voucher status */}
				{voucherValidation && (
					<div
						className={`mt-2 p-2 rounded text-xs ${
							voucherValidation.isValid
								? 'bg-green-50 border border-green-200 text-green-700'
								: 'bg-red-50 border border-red-200 text-red-700'
						}`}
					>
						<div className="flex items-center justify-between">
							<span>
								<i
									className={`fas ${
										voucherValidation.isValid
											? 'fa-check-circle'
											: 'fa-exclamation-circle'
									} mr-1`}
								></i>
								{voucherValidation.message}
							</span>
							{voucherValidation.isValid && (
								<button
									onClick={handleRemoveVoucher}
									className="text-red-600 hover:text-red-800"
									title="Xóa voucher"
								>
									<i className="fas fa-times"></i>
								</button>
							)}
						</div>
						{voucherValidation.isValid && voucherValidation.voucher && (
							<div className="mt-1 text-[10px] text-gray-600">
								{voucherValidation.voucher.discountName} -
								{voucherValidation.voucher.discountType === 'percentage'
									? ` ${voucherValidation.voucher.discountValue}%`
									: ` ${formatPrice(voucherValidation.voucher.discountValue)}`}
							</div>
						)}
					</div>
				)}

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

				{/* Discount Hints - only show if no voucher applied */}
				{appliedDiscount === 0 && !voucherValidation && (
					<div className="mt-2 text-[10px] text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
						<i className="fas fa-info-circle text-blue-500 mr-1"></i>
						Thử các mã giảm giá phổ biến:
						<div className="mt-1 flex flex-wrap gap-1">
							{['WELCOME10', 'SALE500K', 'VIP15', 'NEWCUSTOMER'].map((code) => (
								<button
									key={code}
									onClick={() => setDiscountCode(code)}
									className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[9px] hover:bg-blue-200 transition-colors"
								>
									{code}
								</button>
							))}
						</div>
					</div>
				)}
			</div>

			{/* Payment Button */}
			<button
				className="bg-[#C28B1B] text-white font-semibold text-sm rounded-md py-3 hover:bg-[#a67a16] transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
				type="button"
				onClick={handlePayment}
				disabled={selectedItems.length === 0}
			>
				Thanh Toán - {formatPrice(total)}
			</button>
		</aside>
	);
};

export default OrderSummary;
