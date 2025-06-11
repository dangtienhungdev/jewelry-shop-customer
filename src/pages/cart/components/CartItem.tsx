import type { CartItem as CartItemType } from '@/types/cart.type';
import React from 'react';

interface CartItemProps {
	item: CartItemType;
	onToggleSelect: (itemId: string) => void;
	onUpdateQuantity: (itemId: string, quantity: number) => void;
	onRemove: (itemId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({
	item,
	onToggleSelect,
	onUpdateQuantity,
	onRemove,
}) => {
	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity < 1) return;
		onUpdateQuantity(item.id, newQuantity);
	};

	const totalPrice = item.price * item.quantity;

	return (
		<div className="grid grid-cols-[60px_100px_1fr_90px_110px_90px_60px] items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors">
			{/* Checkbox */}
			<input
				type="checkbox"
				checked={item.isSelected}
				onChange={() => onToggleSelect(item.id)}
				className="w-6 h-6 border-2 border-gray-600 rounded-sm cursor-pointer"
			/>

			{/* Image */}
			<img
				alt={item.name}
				className="w-[80px] h-[60px] object-contain rounded"
				src={item.image}
				onError={(e) => {
					const target = e.target as HTMLImageElement;
					target.src = 'https://via.placeholder.com/80x60?text=No+Image';
				}}
			/>

			{/* Product Info */}
			<div className="text-xs leading-tight">
				<div className="font-semibold text-gray-900 mb-1">{item.name}</div>
				<div className="text-gray-600">{item.description}</div>
			</div>

			{/* Price */}
			<div className="text-sm font-normal text-gray-900">
				{formatPrice(item.price)}
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center space-x-2 text-xs font-normal">
				<button
					onClick={() => handleQuantityChange(item.quantity - 1)}
					disabled={item.quantity <= 1}
					className={`rounded-full border border-gray-300 w-6 h-6 flex items-center justify-center transition-colors ${
						item.quantity <= 1
							? 'cursor-not-allowed text-gray-400'
							: 'cursor-pointer hover:bg-gray-100 hover:border-gray-400'
					}`}
				>
					−
				</button>
				<span className="text-black font-semibold min-w-[20px] text-center">
					{item.quantity}
				</span>
				<button
					onClick={() => handleQuantityChange(item.quantity + 1)}
					className="rounded-full border border-gray-300 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors"
				>
					+
				</button>
			</div>

			{/* Total Price */}
			<div className="text-sm font-semibold text-gray-900">
				{formatPrice(totalPrice)}
			</div>

			{/* Delete Button */}
			<button
				onClick={() => onRemove(item.id)}
				aria-label="Delete item"
				className="text-red-500 text-lg hover:text-red-700 transition-colors"
			>
				<i className="fas fa-trash-alt"></i>
			</button>
		</div>
	);
};

export default CartItem;
