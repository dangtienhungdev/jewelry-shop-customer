import { useRemoveFromCart, useUpdateCartItem } from '@/apis/cart';
import type { Cart } from '@/types/cart.type';
import React, { useState } from 'react';
import CartItem from './CartItem';

interface CartTableProps {
	cart: Cart;
}

const CartTable: React.FC<CartTableProps> = ({ cart }) => {
	const [selectedItems, setSelectedItems] = useState<string[]>(
		cart.items.map((item) => item.product.id)
	);

	// Hooks để cập nhật và xóa sản phẩm
	const updateCartItemMutation = useUpdateCartItem();
	const removeFromCartMutation = useRemoveFromCart();

	const handleToggleSelect = (productId: string) => {
		setSelectedItems((prev) =>
			prev.includes(productId)
				? prev.filter((id) => id !== productId)
				: [...prev, productId]
		);
	};

	const handleToggleSelectAll = () => {
		const allSelected = selectedItems.length === cart.items.length;
		setSelectedItems(
			allSelected ? [] : cart.items.map((item) => item.product.id)
		);
	};

	const handleUpdateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			handleRemoveItem(productId);
			return;
		}

		updateCartItemMutation.mutate({
			productId,
			quantity,
		});
	};

	const handleRemoveItem = (productId: string) => {
		removeFromCartMutation.mutate({
			productId,
		});
		// Xóa khỏi selected items
		setSelectedItems((prev) => prev.filter((id) => id !== productId));
	};

	const allSelected =
		cart.items.length > 0 && selectedItems.length === cart.items.length;

	if (cart.items.length === 0) {
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
				{cart.items.map((item) => (
					<CartItem
						key={item.product.id}
						item={item}
						isSelected={selectedItems.includes(item.product.id)}
						onToggleSelect={handleToggleSelect}
						onUpdateQuantity={handleUpdateQuantity}
						onRemove={handleRemoveItem}
						isUpdating={updateCartItemMutation.isPending}
						isRemoving={removeFromCartMutation.isPending}
					/>
				))}
			</div>
		</section>
	);
};

export default CartTable;
