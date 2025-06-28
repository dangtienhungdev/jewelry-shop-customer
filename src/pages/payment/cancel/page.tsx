import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { MainLayout } from '@/layouts';
import { orderApi } from '@/apis/orders';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentCancelParams {
	code: string;
	id: string;
	cancel: string;
	status: string;
	orderCode: string;
	orderId: string; // MongoDB ObjectId from backend
}

const PaymentCancelPage: React.FC = () => {
	const navigate = useNavigate();
	const { user, isAuthenticated } = useAuth();
	const [searchParams] = useSearchParams();
	const [isProcessing, setIsProcessing] = useState(true);
	const [cancelParams, setCancelParams] = useState<PaymentCancelParams | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);

	// Parse URL parameters
	useEffect(() => {
		const code = searchParams.get('code');
		const id = searchParams.get('id');
		const cancel = searchParams.get('cancel');
		const status = searchParams.get('status');
		const orderCode = searchParams.get('orderCode');
		const orderId = searchParams.get('orderId'); // Parse orderId from backend

		console.log('🔍 PayOS Cancel Callback Params:', {
			code,
			id,
			cancel,
			status,
			orderCode,
			orderId,
		});

		if (orderCode && orderId) {
			setCancelParams({
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

	// Handle order cancellation
	useEffect(() => {
		const handleOrderCancellation = async () => {
			if (!cancelParams || !isAuthenticated) {
				setIsProcessing(false);
				return;
			}

			try {
				// Show immediate feedback
				toast.info('Đang xử lý hủy thanh toán...', {
					description: `Đơn hàng ${cancelParams.orderCode}`,
					duration: 3000,
				});

				// First, check order status to see if it's already been handled by webhook
				let orderStatus = null;
				try {
					console.log(
						'📤 Checking order status first for orderId:',
						cancelParams.orderId
					);
					const orderDetails = await orderApi.getOrderById(
						cancelParams.orderId
					);
					orderStatus = orderDetails.status;
					console.log('📋 Current order status:', orderStatus);
				} catch (statusError: any) {
					console.log('ℹ️ Could not check order status:', statusError.message);
				}

				// If order is already failed/cancelled, no need to call cancel API
				if (orderStatus === 'failed' || orderStatus === 'cancelled') {
					console.log(
						'✅ Order already cancelled by webhook, skipping API call'
					);
					toast.error('Thanh toán đã bị hủy', {
						description: `Đơn hàng ${cancelParams.orderCode} đã được hủy`,
						duration: 5000,
					});
				} else {
					// Try to cancel order via API (if webhook hasn't processed yet)
					try {
						console.log(
							'📤 Attempting to cancel order with orderId:',
							cancelParams.orderId
						);
						await orderApi.cancelOrder(
							cancelParams.orderId,
							'Thanh toán bị hủy bởi người dùng'
						);
						console.log('✅ Order cancellation request sent');

						toast.error('Thanh toán đã bị hủy', {
							description: `Đơn hàng ${cancelParams.orderCode} chưa được thanh toán`,
							duration: 5000,
						});
					} catch (apiError: any) {
						// Handle different types of cancellation errors
						if (apiError.message?.includes('đã hoàn thành hoặc thất bại')) {
							console.log('ℹ️ Order already cancelled by webhook');
							toast.error('Thanh toán đã bị hủy', {
								description: `Đơn hàng ${cancelParams.orderCode} đã được xử lý`,
								duration: 5000,
							});
						} else {
							console.log('⚠️ Order cancellation API error:', apiError.message);
							toast.warning('Đơn hàng có thể đã được hủy', {
								description: 'Webhook có thể đã xử lý việc hủy đơn hàng',
								duration: 5000,
							});
						}
					}
				}
			} catch (error: any) {
				console.error('❌ Error handling payment cancellation:', error);
				setError('Có lỗi xảy ra khi xử lý hủy thanh toán');
			} finally {
				setIsProcessing(false);
			}
		};

		if (cancelParams) {
			handleOrderCancellation();
		}
	}, [cancelParams, isAuthenticated]);

	// Redirect to login if not authenticated
	useEffect(() => {
		if (!isAuthenticated) {
			toast.error('Vui lòng đăng nhập để xem thông tin đơn hàng');
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	const getStatusText = (status: string): string => {
		const statusMap: Record<string, string> = {
			CANCELLED: 'Đã hủy',
			PENDING: 'Đang chờ',
			PAID: 'Đã thanh toán',
			PROCESSING: 'Đang xử lý',
		};
		return statusMap[status] || status;
	};

	const getStatusColor = (status: string): string => {
		const colorMap: Record<string, string> = {
			CANCELLED: 'text-red-600 bg-red-100',
			PENDING: 'text-yellow-600 bg-yellow-100',
			PAID: 'text-green-600 bg-green-100',
			PROCESSING: 'text-blue-600 bg-blue-100',
		};
		return colorMap[status] || 'text-gray-600 bg-gray-100';
	};

	// Loading state
	if (isProcessing) {
		return (
			<MainLayout>
				<div className="max-w-4xl mx-auto px-6 py-20">
					<div className="bg-white rounded-lg shadow-lg p-8 text-center">
						<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
						<h2 className="text-xl font-semibold text-gray-800 mb-2">
							Đang xử lý hủy thanh toán
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

	// Payment cancelled state
	return (
		<MainLayout>
			<div className="max-w-4xl mx-auto px-6 py-20">
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					{/* Header */}
					<div className="bg-red-50 border-b border-red-200 px-8 py-6">
						<div className="flex items-center">
							<div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mr-4">
								<i className="fas fa-times text-red-500 text-xl"></i>
							</div>
							<div>
								<h1 className="text-2xl font-bold text-red-800">
									Thanh toán đã bị hủy
								</h1>
								<p className="text-red-600 mt-1">
									Đơn hàng chưa được thanh toán
								</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="px-8 py-6">
						{cancelParams && (
							<div className="space-y-6">
								{/* Order Info */}
								<div className="bg-gray-50 rounded-lg p-6">
									<h3 className="font-semibold text-gray-800 mb-4 flex items-center">
										<i className="fas fa-info-circle mr-2 text-blue-500"></i>
										Thông tin đơn hàng
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
										<div>
											<p className="text-gray-600">Mã đơn hàng:</p>
											<p className="font-semibold text-gray-800">
												#{cancelParams.orderCode}
											</p>
										</div>
										<div>
											<p className="text-gray-600">Trạng thái thanh toán:</p>
											<span
												className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
													cancelParams.status
												)}`}
											>
												{getStatusText(cancelParams.status)}
											</span>
										</div>
										<div>
											<p className="text-gray-600">Mã giao dịch:</p>
											<p className="font-semibold text-gray-800">
												{cancelParams.id || 'N/A'}
											</p>
										</div>
										<div>
											<p className="text-gray-600">Mã phản hồi:</p>
											<p className="font-semibold text-gray-800">
												{cancelParams.code || 'N/A'}
											</p>
										</div>
									</div>
								</div>

								{/* What happened */}
								<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
									<h3 className="font-semibold text-yellow-800 mb-3 flex items-center">
										<i className="fas fa-exclamation-triangle mr-2"></i>
										Chuyện gì đã xảy ra?
									</h3>
									<ul className="text-sm text-yellow-700 space-y-2">
										<li className="flex items-start">
											<i className="fas fa-dot-circle mt-1 mr-2 text-xs"></i>
											Bạn đã hủy thanh toán trên cổng PayOS
										</li>
										<li className="flex items-start">
											<i className="fas fa-dot-circle mt-1 mr-2 text-xs"></i>
											Đơn hàng vẫn tồn tại nhưng chưa được thanh toán
										</li>
										<li className="flex items-start">
											<i className="fas fa-dot-circle mt-1 mr-2 text-xs"></i>
											Bạn có thể thử thanh toán lại hoặc chọn thanh toán khi
											nhận hàng
										</li>
									</ul>
								</div>

								{/* Next steps */}
								<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
									<h3 className="font-semibold text-blue-800 mb-3 flex items-center">
										<i className="fas fa-lightbulb mr-2"></i>
										Bước tiếp theo
									</h3>
									<div className="text-sm text-blue-700 space-y-3">
										<div className="flex items-start">
											<span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												1
											</span>
											<div>
												<p className="font-medium">Thử thanh toán lại</p>
												<p>
													Quay lại giỏ hàng và đặt hàng với phương thức PayOS
												</p>
											</div>
										</div>
										<div className="flex items-start">
											<span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												2
											</span>
											<div>
												<p className="font-medium">
													Chọn thanh toán khi nhận hàng
												</p>
												<p>
													Đặt hàng với phương thức COD (thanh toán tiền mặt)
												</p>
											</div>
										</div>
										<div className="flex items-start">
											<span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
												3
											</span>
											<div>
												<p className="font-medium">Liên hệ hỗ trợ</p>
												<p>Gọi hotline nếu gặp vấn đề với thanh toán</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Action buttons */}
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								to="/cart"
								className="bg-[#C28B1B] text-white px-8 py-3 rounded-md hover:bg-[#a67a16] transition-colors text-center font-semibold"
							>
								<i className="fas fa-shopping-cart mr-2"></i>
								Quay lại giỏ hàng
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
								Gặp vấn đề với thanh toán? Chúng tôi luôn sẵn sàng hỗ trợ!
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

export default PaymentCancelPage;
