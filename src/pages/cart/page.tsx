import { useCart } from '@/apis/cart';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/layouts';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartBreadcrumb from './components/CartBreadcrumb';
import CartSummary from './components/CartSummary';
import CartTable from './components/CartTable';

const CartPage: React.FC = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	// Hook để lấy giỏ hàng
	const { data: cart, isLoading, error } = useCart();

	const handleCheckout = () => {
		// Logic thanh toán - chuyển đến trang checkout/payment
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

	return (
		<MainLayout>
			<CartBreadcrumb itemCount={cart.totalItems} />
			<CartTable cart={cart} />
			<CartSummary
				selectedItems={cart.totalItems}
				totalAmount={cart.totalAmount}
				onCheckout={handleCheckout}
			/>
		</MainLayout>
	);
};

export default CartPage;
