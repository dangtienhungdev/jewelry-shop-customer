import type { CartItem as CartItemType } from '@/types/cart.type';
import React, { useState } from 'react';
import CartItem from './CartItem';

const CartTable: React.FC = () => {
	// Mock data - trong thực tế sẽ sử dụng context hoặc state management
	const [cartItems, setCartItems] = useState<CartItemType[]>([
		{
			id: '1',
			productId: 'prod1',
			name: 'R MIDI GREEN',
			description: 'Đẹp với những người phụ nữ trung niên',
			price: 1199000,
			quantity: 1,
			image:
				'https://storage.googleapis.com/a1aa/image/b02ea04f-f3f7-40b9-f3a7-4a76e7290d2f.jpg',
			isSelected: false,
		},
		{
			id: '2',
			productId: 'prod2',
			name: 'R MIDI BIG 6MM GEM',
			description: 'Rất đẹp',
			price: 1299000,
			quantity: 2,
			image:
				'https://storage.googleapis.com/a1aa/image/cbae6a4e-dc18-4a66-4ffe-11a5e4f314c5.jpg',
			isSelected: true,
		},
		{
			id: '3',
			productId: 'prod3',
			name: 'R MIDI BIG 6MM GEM',
			description: 'Rất đẹp',
			price: 1199000,
			quantity: 1,
			image:
				'https://storage.googleapis.com/a1aa/image/cbae6a4e-dc18-4a66-4ffe-11a5e4f314c5.jpg',
			isSelected: false,
		},
		{
			id: '4',
			productId: 'prod4',
			name: 'R MIDI GREEN',
			description: 'Đẹp với những người phụ nữ trung niên',
			price: 1299000,
			quantity: 1,
			image:
				'https://storage.googleapis.com/a1aa/image/b02ea04f-f3f7-40b9-f3a7-4a76e7290d2f.jpg',
			isSelected: true,
		},
	]);

	const handleToggleSelect = (itemId: string) => {
		setCartItems((items) =>
			items.map((item) =>
				item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
			)
		);
	};

	const handleToggleSelectAll = () => {
		const allSelected = cartItems.every((item) => item.isSelected);
		setCartItems((items) =>
			items.map((item) => ({ ...item, isSelected: !allSelected }))
		);
	};

	const handleUpdateQuantity = (itemId: string, quantity: number) => {
		setCartItems((items) =>
			items.map((item) => (item.id === itemId ? { ...item, quantity } : item))
		);
	};

	const handleRemoveItem = (itemId: string) => {
		setCartItems((items) => items.filter((item) => item.id !== itemId));
	};

	const allSelected =
		cartItems.length > 0 && cartItems.every((item) => item.isSelected);

	if (cartItems.length === 0) {
		return (
			<section className="px-6 py-12">
				<div className="text-center">
					<div className="text-gray-500 text-lg font-semibold mb-4">
						Giỏ hàng của bạn đang trống
					</div>
					<div className="text-gray-400 mb-6">
						Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
					</div>
					<a
						href="/products"
						className="bg-[#c4820a] text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-[#b8750a] transition-colors"
					>
						Tiếp tục mua sắm
					</a>
				</div>
			</section>
		);
	}

	return (
		<section className="mt-4">
			{/* Table Header */}
			<div className="bg-[#caa85a] text-black text-sm font-normal grid grid-cols-[60px_100px_1fr_90px_110px_90px_60px] items-center px-6 py-3">
				<div className="flex items-center">
					<input
						type="checkbox"
						checked={allSelected}
						onChange={handleToggleSelectAll}
						className="w-5 h-5 border-2 border-gray-600 rounded-sm cursor-pointer"
					/>
				</div>
				<div>Hình ảnh</div>
				<div>Sản phẩm</div>
				<div>Giá tiền</div>
				<div>Số lượng</div>
				<div>Tổng</div>
				<div>Xóa</div>
			</div>

			{/* Table Rows */}
			<div className="divide-y divide-gray-200">
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						onToggleSelect={handleToggleSelect}
						onUpdateQuantity={handleUpdateQuantity}
						onRemove={handleRemoveItem}
					/>
				))}
			</div>
		</section>
	);
};

export default CartTable;
