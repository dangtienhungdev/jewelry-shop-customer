import { useClearCart } from '@/apis/cart';
import { orderApi, type CreateOrderDto } from '@/apis/orders';
import { useAuth } from '@/contexts/AuthContext';
import { useCheckout } from '@/contexts/CheckoutContext';
import { MainLayout } from '@/layouts';
import type { CartItem } from '@/types/cart.type';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import DeliveryInfo from './components/DeliveryInfo';
import OrderSummary from './components/OrderSummary';
import PaymentBreadcrumb from './components/PaymentBreadcrumb';

interface DeliveryInfo {
	recipientName: string;
	phone: string;
	address: string;
	orderNote?: string;
	shippingMethod: string;
	paymentMethod: 'cash' | 'payos';
	shippingFee: number;
}

const PaymentPage: React.FC = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const { checkoutData, clearCheckoutData } = useCheckout();
	const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	// Cart clearing hook - Silent operation during checkout
	const clearCartMutation = useClearCart({
		onSuccess: (data) => {
			console.log('✅ Cart cleared successfully after order:', data.message);
			// Don't show toast - would be confusing during order flow
		},
		onError: (error) => {
			console.error('❌ Failed to clear cart:', error);
			// Don't show error to user as order was successful
		},
	});

	// Redirect về cart nếu không có checkout data
	useEffect(() => {
		if (!checkoutData || checkoutData.selectedItems.length === 0) {
			navigate('/cart');
		}
	}, [checkoutData, navigate]);

	// Redirect về login nếu chưa đăng nhập
	useEffect(() => {
		if (!isAuthenticated) {
			toast.error('Vui lòng đăng nhập để tiếp tục thanh toán');
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	// Handle delivery info change from DeliveryInfo component
	const handleDeliveryInfoChange = (info: DeliveryInfo) => {
		setDeliveryInfo(info);
	};

	// Create order data from checkout and delivery info
	const createOrderData = (paymentData: {
		items: CartItem[];
		subtotal: number;
		discount: number;
		shippingFee: number;
		total: number;
		discountCode?: string;
	}): CreateOrderDto | null => {
		if (!deliveryInfo || !user) {
			return null;
		}

		return {
			customerId: user._id, // Customer ID from auth
			recipientName: deliveryInfo.recipientName,
			recipientPhone: deliveryInfo.phone,
			shippingAddress: deliveryInfo.address,
			orderDetails: paymentData.items.map((item) => ({
				productId: item.product.id,
				quantity: item.quantity,
				priceAtPurchase: item.effectivePrice,
				discountApplied: 0, // Individual product discount (if any)
			})),
			// shippingFee: deliveryInfo.shippingFee,
			shippingFee: 0,
			paymentMethod: deliveryInfo.paymentMethod,
			voucherCode: paymentData.discountCode,
			notes: deliveryInfo.orderNote,
		};
	};

	// Handle payment processing
	const handlePayment = async (paymentData: {
		items: CartItem[];
		subtotal: number;
		discount: number;
		shippingFee: number;
		total: number;
		discountCode?: string;
	}) => {
		// Validate required data
		if (!deliveryInfo) {
			toast.error('Vui lòng điền đầy đủ thông tin giao hàng');
			return;
		}

		if (!user || !isAuthenticated) {
			toast.error('Vui lòng đăng nhập để tiếp tục');
			navigate('/login');
			return;
		}

		// Create order data
		const orderData = createOrderData(paymentData);
		if (!orderData) {
			toast.error('Không thể tạo đơn hàng. Vui lòng thử lại');
			return;
		}

		setIsProcessingPayment(true);

		try {
			// Call backend API to create order
			const response = await orderApi.createOrder(orderData);

			// Clear cart items first (before any redirects)
			try {
				clearCartMutation.mutate();
			} catch (cartError) {
				console.error('⚠️ Cart clearing failed but continuing:', cartError);
			}

			// Clear checkout data
			clearCheckoutData();

			// Handle different payment methods
			if (deliveryInfo.paymentMethod === 'payos') {
				if (response.paymentUrl && response.paymentUrl.trim() !== '') {
					// PayOS payment - redirect to payment URL
					toast.success('Đơn hàng đã được tạo thành công!', {
						description: `Mã đơn hàng: ${response.order.orderCode}. Đang chuyển hướng đến trang thanh toán...`,
						duration: 3000,
					});

					// Redirect to PayOS payment page
					// setTimeout(() => {
					window.location.href = response.paymentUrl!;
					// }, 0);
					// navigate(response.paymentUrl!);
				} else {
					// PayOS but no payment URL - show error
					console.error('❌ PayOS payment but no paymentUrl received');
					toast.error('Lỗi tạo link thanh toán', {
						description:
							'Không thể tạo link thanh toán PayOS. Vui lòng thử lại hoặc chọn thanh toán khi nhận hàng.',
						duration: 8000,
					});
				}
			} else {
				// Cash payment (COD) - order is complete
				toast.success('Đặt hàng thành công!', {
					description: `${response.message} Chúng tôi sẽ liên hệ với bạn sớm nhất.`,
					duration: 5000,
				});

				// Redirect to order success or history page
				setTimeout(() => {
					navigate('/', {
						state: {
							orderSuccess: true,
							orderCode: response.order.orderCode,
						},
					});
				}, 3000);
			}
		} catch (error: any) {
			console.error('❌ Order creation failed:', error);

			let errorMessage = 'Tạo đơn hàng thất bại. Vui lòng thử lại.';
			if (error.message) {
				errorMessage = error.message;
			}

			toast.error('Lỗi tạo đơn hàng', {
				description: errorMessage,
				duration: 5000,
			});
		} finally {
			setIsProcessingPayment(false);
		}
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

	// Show loading overlay when processing payment
	if (isProcessingPayment) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-20">
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
							<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#C28B1B] mx-auto mb-4"></div>
							<h3 className="text-lg font-semibold mb-2">
								Đang xử lý đơn hàng
							</h3>
							<p className="text-gray-600 text-sm">
								{deliveryInfo?.paymentMethod === 'payos'
									? 'Đang tạo link thanh toán PayOS...'
									: 'Đang tạo đơn hàng...'}
							</p>
							<p className="text-xs text-gray-500 mt-2">
								Vui lòng không tắt trang này
							</p>
						</div>
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
					<DeliveryInfo onDeliveryInfoChange={handleDeliveryInfoChange} />
					<OrderSummary
						checkoutData={checkoutData}
						shippingFee={deliveryInfo?.shippingFee || 30000}
						onPayment={handlePayment}
					/>
				</section>

				{/* Order summary for validation */}
				{deliveryInfo && (
					<div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
						<h3 className="font-semibold text-sm mb-3 text-gray-700">
							<i className="fas fa-clipboard-check mr-2"></i>
							Xác nhận đơn hàng
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
							<div>
								<p>
									<strong>Người nhận:</strong> {deliveryInfo.recipientName}
								</p>
								<p>
									<strong>Số điện thoại:</strong> {deliveryInfo.phone}
								</p>
								<p>
									<strong>Địa chỉ:</strong> {deliveryInfo.address}
								</p>
								{deliveryInfo.orderNote && (
									<p>
										<strong>Ghi chú:</strong> {deliveryInfo.orderNote}
									</p>
								)}
							</div>
							<div>
								<p>
									<strong>Phương thức vận chuyển:</strong>{' '}
									{deliveryInfo.shippingMethod === 'standard'
										? 'Tiêu chuẩn (3-5 ngày)'
										: 'Nhanh (1-2 ngày)'}
								</p>
								<p>
									<strong>Phí vận chuyển:</strong>{' '}
									{formatPrice(deliveryInfo.shippingFee)}
								</p>
								<p>
									<strong>Thanh toán:</strong>{' '}
									{deliveryInfo.paymentMethod === 'cash'
										? 'Khi nhận hàng (COD)'
										: 'Trực tuyến (PayOS)'}
								</p>
							</div>
						</div>

						{/* Validation status */}
						<div className="mt-3 pt-3 border-t border-gray-300">
							<div className="flex items-center gap-2 text-xs">
								{deliveryInfo.recipientName &&
								deliveryInfo.phone &&
								deliveryInfo.address ? (
									<>
										<i className="fas fa-check-circle text-green-600"></i>
										<span className="text-green-600 font-medium">
											Thông tin đã đầy đủ - Sẵn sàng đặt hàng
										</span>
									</>
								) : (
									<>
										<i className="fas fa-exclamation-circle text-yellow-600"></i>
										<span className="text-yellow-600 font-medium">
											Vui lòng điền đầy đủ thông tin giao hàng
										</span>
									</>
								)}
							</div>
						</div>
					</div>
				)}

				{/* Debug info - only show in development */}
				{process.env.NODE_ENV === 'development' && deliveryInfo && (
					<div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3 text-xs">
						<h4 className="font-semibold text-yellow-800 mb-2">
							🐛 Debug Info (Development only)
						</h4>
						<div className="text-yellow-700 space-y-1">
							<p>
								<strong>Backend URL:</strong> http://localhost:8000/api/v1
							</p>
							<p>
								<strong>Customer ID:</strong> {user?._id}
							</p>
							<p>
								<strong>Payment Method:</strong> {deliveryInfo.paymentMethod}
							</p>
							<p>
								<strong>Checkout Items:</strong>{' '}
								{checkoutData?.selectedItems.length}
							</p>
						</div>
					</div>
				)}
			</div>
		</MainLayout>
	);
};

export default PaymentPage;
