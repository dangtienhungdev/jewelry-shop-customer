import React, { useState } from 'react';
import { toast } from 'sonner';

import {
	orderApi,
	useActiveVouchers,
	type VoucherValidationResponse,
} from '@/apis/orders';
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
	const [showVoucherList, setShowVoucherList] = useState(false);

	// Lấy danh sách voucher đang hoạt động
	const { data: activeVouchersData, isLoading: isLoadingVouchers } =
		useActiveVouchers();
	const activeVouchers = activeVouchersData?.vouchers || [];

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
	 * Lọc voucher phù hợp với giá trị đơn hàng
	 */
	const getAvailableVouchers = () => {
		return activeVouchers.filter((voucher) => {
			// Kiểm tra giá trị đơn hàng tối thiểu
			if (subtotal < voucher.minOrderValue) {
				return false;
			}

			// Kiểm tra giới hạn sử dụng
			if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
				return false;
			}

			// Kiểm tra ngày hiệu lực
			const now = new Date();
			const startDate = new Date(voucher.startDate);
			const endDate = new Date(voucher.endDate);

			return now >= startDate && now <= endDate;
		});
	};

	/**
	 * Tính toán giá trị giảm giá của voucher
	 */
	const calculateVoucherDiscount = (voucher: any) => {
		if (voucher.discountType === 'percentage') {
			const discountAmount = (subtotal * voucher.discountValue) / 100;
			return voucher.maxDiscountAmount
				? Math.min(discountAmount, voucher.maxDiscountAmount)
				: discountAmount;
		} else {
			return voucher.discountValue;
		}
	};

	/**
	 * Format voucher description
	 */
	const formatVoucherDescription = (voucher: any) => {
		if (voucher.discountType === 'percentage') {
			const maxDiscount = voucher.maxDiscountAmount
				? ` (tối đa ${formatPrice(voucher.maxDiscountAmount)})`
				: '';
			return `Giảm ${voucher.discountValue}%${maxDiscount}`;
		} else {
			return `Giảm ${formatPrice(voucher.discountValue)}`;
		}
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

	/**
	 * Chọn voucher từ danh sách
	 */
	const handleSelectVoucher = (voucher: any) => {
		const discountAmount = calculateVoucherDiscount(voucher);
		setDiscountCode(voucher.discountCode);
		setAppliedDiscount(discountAmount);
		setVoucherValidation({
			isValid: true,
			message: `Áp dụng thành công: ${voucher.discountName}`,
			discountAmount,
			voucher,
		});
		setShowVoucherList(false);
		toast.success(`Đã áp dụng voucher: ${voucher.discountName}`, {
			description: `Giảm ${formatPrice(discountAmount)}`,
		});
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
				<div className="flex items-center justify-between mb-3">
					<h3 className="font-semibold text-sm">Mã Giảm Giá</h3>
					{activeVouchers.length > 0 && (
						<button
							type="button"
							onClick={() => setShowVoucherList(!showVoucherList)}
							className="text-xs text-blue-600 hover:text-blue-800 font-medium"
						>
							{showVoucherList ? 'Ẩn danh sách' : 'Xem voucher có sẵn'}
						</button>
					)}
				</div>

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

				{/* Available Vouchers List */}
				{showVoucherList && (
					<div className="mt-3 border-t border-gray-200 pt-3">
						{isLoadingVouchers ? (
							<div className="text-center py-4">
								<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#C28B1B] mx-auto"></div>
								<p className="text-xs text-gray-500 mt-2">
									Đang tải voucher...
								</p>
							</div>
						) : activeVouchers.length === 0 ? (
							<div className="text-center py-4">
								<div className="text-gray-400 mb-2">
									<i className="fas fa-gift text-2xl"></i>
								</div>
								<p className="text-xs text-gray-500 font-medium">
									Chưa có voucher nào được phát hành
								</p>
								<p className="text-xs text-gray-400 mt-1">
									Shop sẽ phát hành voucher trong thời gian sớm nhất
								</p>
							</div>
						) : (
							<>
								<h4 className="text-xs font-semibold text-gray-700 mb-2">
									Voucher có thể sử dụng ({getAvailableVouchers().length})
								</h4>
								<div className="space-y-2 max-h-48 overflow-y-auto">
									{getAvailableVouchers().length > 0 ? (
										getAvailableVouchers().map((voucher) => (
											<div
												key={voucher._id}
												className="border border-gray-200 rounded-md p-2 bg-white hover:border-[#C28B1B] transition-colors cursor-pointer"
												onClick={() => handleSelectVoucher(voucher)}
											>
												<div className="flex items-center justify-between">
													<div className="flex-1">
														<div className="flex items-center gap-2">
															<span className="text-xs font-semibold text-[#C28B1B]">
																{voucher.discountCode}
															</span>
															<span className="text-xs bg-green-100 text-green-700 px-1 rounded">
																{voucher.discountType === 'percentage'
																	? 'Phần trăm'
																	: 'Số tiền'}
															</span>
														</div>
														<p className="text-xs text-gray-700 mt-1">
															{voucher.discountName}
														</p>
														<p className="text-xs text-gray-500 mt-1">
															{formatVoucherDescription(voucher)}
														</p>
														<p className="text-xs text-gray-400 mt-1">
															Đơn hàng tối thiểu:{' '}
															{formatPrice(voucher.minOrderValue)}
														</p>
													</div>
													<div className="text-right">
														<div className="text-xs font-semibold text-green-600">
															-{formatPrice(calculateVoucherDiscount(voucher))}
														</div>
														<div className="text-xs text-gray-400">
															{voucher.usedCount}/{voucher.usageLimit || '∞'}
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="text-center py-4">
											<div className="text-gray-400 mb-2">
												<i className="fas fa-info-circle text-lg"></i>
											</div>
											<p className="text-xs text-gray-500">
												Không có voucher phù hợp với đơn hàng này
											</p>
											<p className="text-xs text-gray-400 mt-1">
												Đơn hàng cần có giá trị tối thiểu để sử dụng voucher
											</p>
										</div>
									)}
								</div>
							</>
						)}
					</div>
				)}

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
				{appliedDiscount === 0 &&
					!voucherValidation &&
					activeVouchers.length === 0 && (
						<div className="mt-2 text-[10px] text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
							<i className="fas fa-info-circle text-blue-500 mr-1"></i>
							Thử các mã giảm giá phổ biến:
							<div className="mt-1 flex flex-wrap gap-1">
								{['WELCOME10', 'SALE500K', 'VIP15', 'NEWCUSTOMER'].map(
									(code) => (
										<button
											key={code}
											onClick={() => setDiscountCode(code)}
											className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[9px] hover:bg-blue-200 transition-colors"
										>
											{code}
										</button>
									)
								)}
							</div>
						</div>
					)}

				{/* Voucher available notification */}
				{appliedDiscount === 0 &&
					!voucherValidation &&
					activeVouchers.length > 0 &&
					getAvailableVouchers().length > 0 && (
						<div className="mt-2 text-[10px] text-green-600 bg-green-50 border border-green-200 rounded p-2">
							<i className="fas fa-gift text-green-500 mr-1"></i>
							Có {getAvailableVouchers().length} voucher có thể sử dụng cho đơn
							hàng này!
						</div>
					)}

				{/* No vouchers notification */}
				{appliedDiscount === 0 &&
					!voucherValidation &&
					activeVouchers.length === 0 && (
						<div className="mt-2 text-[10px] text-gray-500 bg-gray-50 border border-gray-200 rounded p-2">
							<i className="fas fa-info-circle text-gray-400 mr-1"></i>
							Shop chưa phát hành voucher nào. Hãy theo dõi để nhận thông báo
							khi có voucher mới!
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
