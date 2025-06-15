import { useCart } from '@/apis/cart';
import { useAuth } from '@/contexts/AuthContext';
import { useCheckout } from '@/contexts/CheckoutContext';
import { MainLayout } from '@/layouts';
import type { CartItem } from '@/types/cart.type';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartBreadcrumb from './components/CartBreadcrumb';
import CartSummary from './components/CartSummary';
import CartTable from './components/CartTable';

const CartPage: React.FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();
	const { setCheckoutData } = useCheckout();

	// Hook để lấy giỏ hàng
	const { data: cart, isLoading, error } = useCart();

	// State để quản lý selected items
	const [selectedItems, setSelectedItems] = useState<string[]>([]);
	const [selectedCartItems, setSelectedCartItems] = useState<CartItem[]>([]);

	// Handle selected items change from CartTable - wrap với useCallback
	const handleSelectedItemsChange = useCallback(
		(selectedIds: string[], selectedItems: CartItem[]) => {
			setSelectedItems(selectedIds);
			setSelectedCartItems(selectedItems);
		},
		[]
	);

	const handleCheckout = () => {
		if (!cart || selectedCartItems.length === 0) {
			return;
		}

		// Tính tổng tiền của các items đã chọn
		const totalAmount = selectedCartItems.reduce(
			(sum, item) => sum + item.subtotal,
			0
		);
		const totalItems = selectedCartItems.reduce(
			(sum, item) => sum + item.quantity,
			0
		);

		// Lưu checkout data vào context
		setCheckoutData({
			cart,
			selectedItems: selectedCartItems,
			totalAmount,
			totalItems,
		});

		// Navigate đến payment page
		navigate('/payment');
	};

	// Nếu chưa đăng nhập
	if (!isAuthenticated) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="text-center">
						<div className="mb-8">
							<i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Vui lòng đăng nhập
							</h2>
							<p className="text-gray-600 mb-8">
								Bạn cần đăng nhập để xem giỏ hàng của mình.
							</p>
							<button
								onClick={() => navigate('/login')}
								className="bg-[#C28B1B] text-white px-6 py-3 rounded-md hover:bg-[#a67a16] transition-colors font-semibold"
							>
								Đăng nhập ngay
							</button>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Loading state
	if (isLoading) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
						<p className="text-gray-600">Đang tải giỏ hàng...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Error state
	if (error) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="text-center">
						<div className="mb-8">
							<i className="fas fa-exclamation-triangle text-6xl text-red-300 mb-4"></i>
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Lỗi khi tải giỏ hàng
							</h2>
							<p className="text-gray-600 mb-8">
								Có lỗi xảy ra khi tải giỏ hàng. Vui lòng thử lại sau.
							</p>
							<button
								onClick={() => window.location.reload()}
								className="bg-[#C28B1B] text-white px-6 py-3 rounded-md hover:bg-[#a67a16] transition-colors font-semibold"
							>
								Thử lại
							</button>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Empty cart state
	if (!cart || cart.items.length === 0) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="text-center">
						<div className="mb-8">
							<i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
							<h2 className="text-2xl font-bold text-gray-800 mb-4">
								Giỏ hàng trống
							</h2>
							<p className="text-gray-600 mb-8">
								Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản
								phẩm của chúng tôi!
							</p>
							<button
								onClick={() => navigate('/products')}
								className="bg-[#C28B1B] text-white px-6 py-3 rounded-md hover:bg-[#a67a16] transition-colors font-semibold"
							>
								Tiếp tục mua sắm
							</button>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Tính tổng tiền của các items đã chọn
	const selectedTotalAmount = selectedCartItems.reduce(
		(sum, item) => sum + item.subtotal,
		0
	);
	const selectedTotalItems = selectedCartItems.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	return (
		<MainLayout>
			<CartBreadcrumb itemCount={cart.totalItems} />
			<CartTable
				cart={cart}
				onSelectedItemsChange={handleSelectedItemsChange}
			/>
			<CartSummary
				selectedItems={selectedTotalItems}
				totalAmount={selectedTotalAmount}
				onCheckout={handleCheckout}
			/>
		</MainLayout>
	);
};

export default CartPage;
