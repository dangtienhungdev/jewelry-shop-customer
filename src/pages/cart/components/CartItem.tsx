import type { CartItem as CartItemType } from '@/types/cart.type';
import React from 'react';

interface CartItemProps {
	item: CartItemType;
	isSelected: boolean;
	onToggleSelect: (productId: string) => void;
	onUpdateQuantity: (productId: string, quantity: number) => void;
	onRemove: (productId: string) => void;
	isUpdating?: boolean;
	isRemoving?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
	item,
	isSelected,
	onToggleSelect,
	onUpdateQuantity,
	onRemove,
	isUpdating = false,
	isRemoving = false,
}) => {
	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity < 1) return;
		onUpdateQuantity(item.product.id, newQuantity);
	};

	return (
		<div className="grid grid-cols-[60px_100px_1fr_90px_110px_90px_60px] items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
			{/* Checkbox */}
			<input
				type="checkbox"
				checked={isSelected}
				onChange={() => onToggleSelect(item.product.id)}
				className="w-6 h-6 border-2 border-gray-600 rounded-sm cursor-pointer"
				disabled={isUpdating || isRemoving}
			/>

			{/* Image */}
			<img
				alt={item.product.productName}
				className="w-[80px] h-[60px] object-contain rounded"
				src={
					item.product.images[0] ||
					'https://via.placeholder.com/80x60?text=No+Image'
				}
				onError={(e) => {
					const target = e.target as HTMLImageElement;
					target.src = 'https://via.placeholder.com/80x60?text=No+Image';
				}}
			/>

			{/* Product Info */}
			<div className="text-xs leading-tight">
				<div className="font-semibold text-gray-900 mb-1">
					{item.product.productName}
				</div>
				<div className="text-gray-600">
					Chất liệu: {item.product.material || 'Chưa cập nhật'}
				</div>
				<div className="text-gray-500 text-xs">
					Còn lại: {item.product.stockQuantity} sản phẩm
				</div>
			</div>

			{/* Price */}
			<div className="text-sm font-normal text-gray-900">
				<div className="font-semibold text-[#C28B1B]">
					{formatPrice(item.effectivePrice)}
				</div>
				{item.discountedPrice < item.price && (
					<div className="text-xs text-gray-500 line-through">
						{formatPrice(item.price)}
					</div>
				)}
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center space-x-2 text-xs font-normal">
				<button
					onClick={() => handleQuantityChange(item.quantity - 1)}
					disabled={item.quantity <= 1 || isUpdating || isRemoving}
					className={`rounded-full border border-gray-300 w-6 h-6 flex items-center justify-center transition-colors ${
						item.quantity <= 1 || isUpdating || isRemoving
							? 'cursor-not-allowed text-gray-400'
							: 'cursor-pointer hover:bg-gray-100 hover:border-gray-400'
					}`}
				>
					{isUpdating ? (
						<i className="fas fa-spinner fa-spin text-xs"></i>
					) : (
						'−'
					)}
				</button>
				<span className="text-black font-semibold min-w-[20px] text-center">
					{item.quantity}
				</span>
				<button
					onClick={() => handleQuantityChange(item.quantity + 1)}
					disabled={
						item.quantity >= item.product.stockQuantity ||
						isUpdating ||
						isRemoving
					}
					className={`rounded-full border border-gray-300 w-6 h-6 flex items-center justify-center transition-colors ${
						item.quantity >= item.product.stockQuantity ||
						isUpdating ||
						isRemoving
							? 'cursor-not-allowed text-gray-400'
							: 'cursor-pointer hover:bg-gray-100 hover:border-gray-400'
					}`}
				>
					{isUpdating ? (
						<i className="fas fa-spinner fa-spin text-xs"></i>
					) : (
						'+'
					)}
				</button>
			</div>

			{/* Total Price */}
			<div className="text-sm font-semibold text-gray-900">
				{formatPrice(item.subtotal)}
			</div>

			{/* Delete Button */}
			<button
				onClick={() => onRemove(item.product.id)}
				disabled={isUpdating || isRemoving}
				aria-label="Delete item"
				className={`text-lg transition-colors ${
					isUpdating || isRemoving
						? 'text-gray-400 cursor-not-allowed'
						: 'text-red-500 hover:text-red-700'
				}`}
			>
				{isRemoving ? (
					<i className="fas fa-spinner fa-spin"></i>
				) : (
					<i className="fas fa-trash-alt"></i>
				)}
			</button>
		</div>
	);
};

export default CartItem;
