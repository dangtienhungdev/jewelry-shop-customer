import React from 'react';
import { toast } from 'sonner';

interface CartSummaryProps {
	selectedItems?: number;
	totalAmount?: number;
	onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
	selectedItems = 0,
	totalAmount = 0,
	onCheckout,
}) => {
	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const handleCheckout = () => {
		if (selectedItems === 0) {
			toast.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán');
			return;
		}

		if (onCheckout) {
			onCheckout();
		}
	};

	return (
		<section className="border-t border-gray-200 bg-gray-50">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-6 gap-4">
				{/* Summary Info */}
				<div className="text-sm text-gray-700">
					<div className="mb-2">
						<span className="font-semibold">Đã chọn:</span> {selectedItems} sản
						phẩm
					</div>
					<div className="text-lg font-bold text-gray-900">
						<span className="font-semibold">Tổng tiền:</span>{' '}
						{formatPrice(totalAmount)}
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-3">
					<button
						type="button"
						className="bg-gray-200 text-gray-700 font-semibold text-sm px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
						onClick={() => (window.location.href = '/products')}
					>
						Tiếp tục mua sắm
					</button>
					<button
						type="button"
						onClick={handleCheckout}
						disabled={selectedItems === 0}
						className={`font-semibold text-sm px-8 py-3 rounded-md transition-colors ${
							selectedItems === 0
								? 'bg-gray-400 text-gray-600 cursor-not-allowed'
								: 'bg-[#c4820a] text-white hover:bg-[#b8750a]'
						}`}
					>
						{selectedItems === 0 ? 'Chưa chọn sản phẩm' : 'Mua ngay'}
					</button>
				</div>
			</div>

			{/* Additional Info */}
			{selectedItems > 0 && (
				<div className="px-6 pb-4">
					<div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-md p-3">
						<i className="fas fa-info-circle text-blue-500 mr-2"></i>
						Bạn đang thanh toán cho {selectedItems} sản phẩm đã chọn. Những sản
						phẩm chưa chọn sẽ được lưu trong giỏ hàng.
					</div>
				</div>
			)}

			{/* Warning when no items selected */}
			{selectedItems === 0 && (
				<div className="px-6 pb-4">
					<div className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-md p-3">
						<i className="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
						Vui lòng chọn ít nhất một sản phẩm để tiến hành thanh toán.
					</div>
				</div>
			)}
		</section>
	);
};

export default CartSummary;
