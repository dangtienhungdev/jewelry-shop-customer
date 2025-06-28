import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useClearCart } from '@/apis/cart';
import { orderApi } from '@/apis/orders';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/layouts';
import { toast } from 'sonner';

interface PaymentSuccessParams {
	code: string;
	id: string;
	cancel: string;
	status: string;
	orderCode: string;
	orderId: string; // MongoDB ObjectId from backend
}

const PaymentSuccessPage: React.FC = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const [searchParams] = useSearchParams();
	const [isProcessing, setIsProcessing] = useState(true);
	const [successParams, setSuccessParams] =
		useState<PaymentSuccessParams | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [orderInfo, setOrderInfo] = useState<any>(null);
	const { mutateAsync: clearCart } = useClearCart();

	// Parse URL parameters
	useEffect(() => {
		const code = searchParams.get('code');
		const id = searchParams.get('id');
		const cancel = searchParams.get('cancel');
		const status = searchParams.get('status');
		const orderCode = searchParams.get('orderCode');
		const orderId = searchParams.get('orderId'); // Parse orderId from backend

		console.log('🔍 PayOS Success Callback Params:', {
			code,
			id,
			cancel,
			status,
			orderCode,
			orderId,
		});

		if (orderCode && orderId) {
			setSuccessParams({
				code: code || '',
				id: id || '',
				cancel: cancel || '',
				status: status || '',
				orderCode,
				orderId,
			});
		} else {
			setError('Thiếu thông tin đơn hàng (orderCode hoặc orderId)');
			setIsProcessing(false);
		}
	}, [searchParams]);

	// Handle payment success
	useEffect(() => {
		const handlePaymentSuccess = async () => {
			if (!successParams || !isAuthenticated || !user) {
				setIsProcessing(false);
				return;
			}

			try {
				// Show immediate feedback
				toast.success('Thanh toán thành công!', {
					description: `Đơn hàng ${successParams.orderCode}`,
					duration: 5000,
				});

				// Get order details using orderId (MongoDB ObjectId)
				try {
					console.log(
						'📤 Fetching order details with orderId:',
						successParams.orderId
					);
					const orderDetails = await orderApi.getOrderById(
						successParams.orderId
					);
					setOrderInfo(orderDetails);
					console.log('✅ Order details fetched:', orderDetails);
				} catch (apiError: any) {
					console.log('ℹ️ Order details fetch error:', apiError.message);
					// Fallback to orderCode if orderId fails
					try {
						console.log(
							'🔄 Fallback: Fetching order details with orderCode:',
							successParams.orderCode
						);
						const orderDetails = await orderApi.getOrderById(
							successParams.orderCode
						);
						setOrderInfo(orderDetails);
						console.log(
							'✅ Order details fetched via orderCode:',
							orderDetails
						);
					} catch (fallbackError: any) {
						console.log(
							'❌ Both orderId and orderCode fetch failed:',
							fallbackError.message
						);
					}
				}

				// Clear cart after successful payment
				try {
					console.log('🧹 Clearing cart for customer:', user._id);
					await clearCart();
					console.log('✅ Cart cleared successfully');
				} catch (cartError: any) {
					console.log('ℹ️ Cart clear error:', cartError.message);
				}

				// Confirm payment with backend API (backup for webhook)
				try {
					console.log(
						'🔐 Confirming payment with backend for orderId:',
						successParams.orderId
					);
					const confirmResult = await orderApi.confirmPayment({
						orderId: successParams.orderId,
						transactionId: successParams.id,
						responseCode: successParams.code,
						notes: 'Payment confirmed via frontend success callback',
					});
					console.log('✅ Payment confirmation result:', confirmResult);

					// Update order info with confirmed data if we got it
					if (confirmResult.order) {
						setOrderInfo(confirmResult.order);
					}
				} catch (confirmError: any) {
					// Don't show error to user - this is just a backup mechanism
					// Webhook should handle the primary confirmation
					console.log(
						'ℹ️ Payment confirmation via API failed (webhook may have handled):',
						confirmError.message
					);
				}
			} catch (error: any) {
				console.error('❌ Error handling payment success:', error);
				setError('Có lỗi xảy ra khi xử lý thanh toán thành công');
			} finally {
				setIsProcessing(false);
			}
		};

		if (successParams) {
			handlePaymentSuccess();
		}
	}, [successParams, isAuthenticated, user, clearCart]);

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			toast.error('Vui lòng đăng nhập để xem thông tin đơn hàng');
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	const getStatusText = (status: string): string => {
		const statusMap: Record<string, string> = {
			PAID: 'Đã thanh toán',
			PENDING: 'Đang chờ',
			CANCELLED: 'Đã hủy',
			PROCESSING: 'Đang xử lý',
		};
		return statusMap[status] || status;
	};

	const getStatusColor = (status: string): string => {
		const colorMap: Record<string, string> = {
			PAID: 'text-green-600 bg-green-100',
			PENDING: 'text-yellow-600 bg-yellow-100',
			CANCELLED: 'text-red-600 bg-red-100',
			PROCESSING: 'text-blue-600 bg-blue-100',
		};
		return colorMap[status] || 'text-gray-600 bg-gray-100';
	};

	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);
	};

	// Loading state
	if (isProcessing) {
		return (
			<MainLayout>
				<div className="max-w-4xl mx-auto px-6 py-20">
					<div className="bg-white rounded-lg shadow-lg p-8 text-center">
						<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Đang xử lý thanh toán thành công
						</h2>
						<p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Error state
	if (error) {
		return (
			<MainLayout>
				<div className="max-w-4xl mx-auto px-6 py-20">
					<div className="bg-white rounded-lg shadow-lg p-8 text-center">
						<div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
							<i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
						</div>
						<h2 className="text-xl font-semibold text-red-800 mb-2">
							Có lỗi xảy ra
						</h2>
						<p className="text-gray-600 mb-6">{error}</p>
						<div className="space-x-4">
							<button
								onClick={() => navigate('/')}
								className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
							>
								Về trang chủ
							</button>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Payment success state
	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto px-6 py-20">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					{/* Header */}
					<div className="bg-green-50 border-b border-green-200 px-8 py-6">
						<div className="flex items-center">
							<div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mr-4">
								<i className="fas fa-check text-green-500 text-xl"></i>
							</div>
							<div>
								<h1 className="text-2xl font-bold text-green-800">
									Thanh toán thành công!
								</h1>
								<p className="text-green-600 mt-1">
									Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi
								</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="px-8 py-6">
						{successParams && (
							<div className="space-y-6">
								{/* Payment Info */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="font-semibold text-gray-800 mb-4 flex items-center">
										<i className="fas fa-credit-card mr-2 text-green-500"></i>
										Thông tin thanh toán
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-gray-600">Mã đơn hàng:</p>
											<p className="font-semibold text-gray-800">
												#{successParams.orderCode}
											</p>
										</div>
										<div>
											<p className="text-gray-600">Trạng thái thanh toán:</p>
											<span
												className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
													successParams.status
												)}`}
											>
												{getStatusText(successParams.status)}
											</span>
										</div>
										<div>
											<p className="text-gray-600">Mã giao dịch:</p>
											<p className="font-semibold text-gray-800">
												{successParams.id || 'N/A'}
											</p>
										</div>
										<div>
											<p className="text-gray-600">Mã phản hồi:</p>
											<p className="font-semibold text-gray-800">
												{successParams.code || 'N/A'}
											</p>
										</div>
									</div>
								</div>

								{/* Order Details */}
								{orderInfo && (
									<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
										<h3 className="font-semibold text-blue-800 mb-4 flex items-center">
											<i className="fas fa-box mr-2"></i>
											Chi tiết đơn hàng
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
											<div>
												<p className="text-blue-600">Tổng tiền hàng:</p>
												<p className="font-semibold text-blue-800">
													{formatCurrency(orderInfo.totalAmount)}
												</p>
											</div>
											<div>
												<p className="text-blue-600">Giảm giá:</p>
												<p className="font-semibold text-blue-800">
													-{formatCurrency(orderInfo.discountAmount || 0)}
												</p>
											</div>
											<div>
												<p className="text-blue-600">Phí vận chuyển:</p>
												<p className="font-semibold text-blue-800">
													{formatCurrency(orderInfo.shippingFee || 0)}
												</p>
											</div>
											<div>
												<p className="text-blue-600">Thành tiền:</p>
												<p className="font-bold text-blue-800 text-lg">
													{formatCurrency(orderInfo.finalAmount)}
												</p>
											</div>
										</div>

										{orderInfo.shippingAddress && (
											<div className="mt-4 pt-4 border-t border-blue-200">
												<p className="text-blue-600 mb-1">Địa chỉ giao hàng:</p>
												<p className="font-semibold text-blue-800">
													{orderInfo.shippingAddress}
												</p>
											</div>
										)}
									</div>
								)}

								{/* What's next */}
								<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
									<h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
										<i className="fas fa-clock mr-2"></i>
										Điều gì sẽ xảy ra tiếp theo?
									</h3>
									<div className="text-sm text-yellow-700 space-y-3">
										<div className="flex items-start">
											<span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												1
											</span>
											<div>
												<p className="font-medium">Xác nhận đơn hàng</p>
												<p>
													Chúng tôi sẽ liên hệ với bạn trong vòng 2-4 giờ để xác
													nhận
												</p>
											</div>
										</div>
										<div className="flex items-start">
											<span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												2
											</span>
											<div>
												<p className="font-medium">Chuẩn bị hàng</p>
												<p>Đơn hàng sẽ được đóng gói cẩn thận trong 1-2 ngày</p>
											</div>
										</div>
										<div className="flex items-start">
											<span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												3
											</span>
											<div>
												<p className="font-medium">Giao hàng</p>
												<p>
													Hàng sẽ được giao đến địa chỉ của bạn theo phương thức
													đã chọn
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Action buttons */}
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/orders"
								className="bg-[#C28B1B] text-white px-8 py-3 rounded-md hover:bg-[#a67a16] transition-colors text-center font-semibold"
							>
								<i className="fas fa-history mr-2"></i>
								Xem lịch sử đơn hàng
							</Link>
							<Link
								to="/products"
								className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors text-center font-semibold"
							>
								<i className="fas fa-store mr-2"></i>
								Tiếp tục mua sắm
							</Link>
							<Link
								to="/"
								className="bg-gray-500 text-white px-8 py-3 rounded-md hover:bg-gray-600 transition-colors text-center font-semibold"
							>
								<i className="fas fa-home mr-2"></i>
								Về trang chủ
							</Link>
						</div>

						{/* Contact support */}
						<div className="mt-8 pt-6 border-t border-gray-200 text-center">
							<p className="text-gray-600 text-sm mb-3">
								Cần hỗ trợ về đơn hàng? Liên hệ với chúng tôi!
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
								<a
									href="tel:1900123456"
									className="text-blue-600 hover:text-blue-800 font-medium"
								>
									<i className="fas fa-phone mr-1"></i>
									Hotline: 1900 123 456
								</a>
								<a
									href="mailto:support@jewelry.vn"
									className="text-blue-600 hover:text-blue-800 font-medium"
								>
									<i className="fas fa-envelope mr-1"></i>
									Email: support@jewelry.vn
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default PaymentSuccessPage;
