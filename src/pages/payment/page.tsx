import { useCheckout } from '@/contexts/CheckoutContext';
import { MainLayout } from '@/layouts';
import type { CartItem } from '@/types/cart.type';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DeliveryInfo from './components/DeliveryInfo';
import OrderSummary from './components/OrderSummary';
import PaymentBreadcrumb from './components/PaymentBreadcrumb';

const PaymentPage: React.FC = () => {
	const navigate = useNavigate();
	const { checkoutData, clearCheckoutData } = useCheckout();

	// Redirect về cart nếu không có checkout data
	useEffect(() => {
		if (!checkoutData || checkoutData.selectedItems.length === 0) {
			navigate('/cart');
		}
	}, [checkoutData, navigate]);

	// Handle payment processing
	const handlePayment = (paymentData: {
		items: CartItem[];
		subtotal: number;
		discount: number;
		shippingFee: number;
		total: number;
		discountCode?: string;
	}) => {
		// Log payment data for debugging
		console.log('🚀 Processing payment:', paymentData);

		// Simulate payment processing
		setTimeout(() => {
			// Clear checkout data
			clearCheckoutData();

			// Show success message
			toast.success('Đơn hàng đã đặt thành công!', {
				description: `Tổng tiền: ${formatPrice(
					paymentData.total
				)}. Chúng tôi sẽ liên hệ với bạn sớm nhất.`,
				duration: 5000,
			});

			// Redirect to home or order history after success
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}, 1000);
	};

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	// Loading state khi chưa có data
	if (!checkoutData) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
						<p className="text-gray-600">Đang tải thông tin thanh toán...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="mb-24">
				<PaymentBreadcrumb />
				<section className="flex flex-col lg:flex-row gap-6">
					<DeliveryInfo />
					<OrderSummary checkoutData={checkoutData} onPayment={handlePayment} />
				</section>
			</div>
		</MainLayout>
	);
};

export default PaymentPage;
