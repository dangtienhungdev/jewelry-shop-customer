import { MainLayout } from '@/layouts';
import React, { useState } from 'react';
import CartBreadcrumb from './components/CartBreadcrumb';
import CartSummary from './components/CartSummary';
import CartTable from './components/CartTable';

const CartPage: React.FC = () => {
	const [totalItems, setTotalItems] = useState(4);
	const [selectedItems, setSelectedItems] = useState(2);
	const [totalAmount, setTotalAmount] = useState(3898000);

	const handleCheckout = () => {
		// Logic thanh toán - có thể chuyển đến trang checkout
		console.log('Proceeding to checkout...');
		// Có thể sử dụng router để chuyển trang
		// navigate('/checkout');
	};

	return (
		<MainLayout>
			<CartBreadcrumb itemCount={totalItems} />
			<CartTable />
			<CartSummary
				selectedItems={selectedItems}
				totalAmount={totalAmount}
				onCheckout={handleCheckout}
			/>
		</MainLayout>
	);
};

export default CartPage;
