import {
	AlertCircle,
	Calendar,
	CheckCircle,
	Clock,
	CreditCard,
	FileText,
	MapPin,
	Package,
	Phone,
	Truck,
	User,
	X,
	XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useOrderDetail, useOrderHelpers } from '@/apis/orders';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OrderProductItem from './OrderProductItem';
import React from 'react';

interface OrderDetailModalProps {
	orderId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
	orderId,
	isOpen,
	onClose,
}) => {
	const { data: order, isLoading, isError } = useOrderDetail(orderId || '');
	const { getStatusText, getStatusColor, formatCurrency, formatDate } =
		useOrderHelpers();

	if (!isOpen || !orderId) return null;

	const getStatusIcon = (status: string) => {
		const iconMap = {
			pending: <Clock className="w-5 h-5" />,
			confirmed: <CheckCircle className="w-5 h-5" />,
			shipping: <Truck className="w-5 h-5" />,
			success: <CheckCircle className="w-5 h-5" />,
			failed: <XCircle className="w-5 h-5" />,
		};
		return (
			iconMap[status as keyof typeof iconMap] || <Clock className="w-5 h-5" />
		);
	};

	const getPaymentMethodText = (paymentMethod: string) => {
		const methods = {
			cash: 'Thanh toán khi nhận hàng (COD)',
			payos: 'Chuyển khoản ngân hàng (PayOS)',
			card: 'Thẻ tín dụng',
		};
		return methods[paymentMethod as keyof typeof methods] || paymentMethod;
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b">
					<div className="flex items-center gap-3">
						<Package className="w-6 h-6 text-primary" />
						<div>
							<h2 className="text-xl font-bold text-gray-900">
								Chi tiết đơn hàng
							</h2>
							{order && (
								<p className="text-sm text-gray-500">#{order.orderCode}</p>
							)}
						</div>
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={onClose}
						className="rounded-full w-8 h-8 p-0"
					>
						<X className="w-4 h-4" />
					</Button>
				</div>

				{/* Content */}
				<div className="overflow-y-auto max-h-[calc(90vh-120px)]">
					{isLoading ? (
						<div className="flex items-center justify-center py-12">
							<div className="text-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
								<p className="text-gray-600">Đang tải chi tiết đơn hàng...</p>
							</div>
						</div>
					) : isError ? (
						<div className="flex items-center justify-center py-12">
							<div className="text-center">
								<AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
								<p className="text-gray-600">Không thể tải chi tiết đơn hàng</p>
							</div>
						</div>
					) : order ? (
						<div className="p-6 space-y-6">
							{/* Order Status */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Calendar className="w-5 h-5" />
										Thông tin đơn hàng
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="text-sm font-medium text-gray-500">
												Trạng thái
											</label>
											<div className="mt-1">
												<Badge
													className={`${getStatusColor(
														order.status
													)} flex items-center gap-2 w-fit`}
												>
													{getStatusIcon(order.status)}
													{getStatusText(order.status)}
												</Badge>
											</div>
										</div>
										<div>
											<label className="text-sm font-medium text-gray-500">
												Ngày đặt hàng
											</label>
											<p className="mt-1 text-gray-900">
												{formatDate(order.orderDate)}
											</p>
										</div>
										<div>
											<label className="text-sm font-medium text-gray-500">
												Tổng tiền
											</label>
											<p className="mt-1 text-lg font-bold text-primary">
												{formatCurrency(order.finalAmount)}
											</p>
										</div>
										<div>
											<label className="text-sm font-medium text-gray-500">
												Phương thức thanh toán
											</label>
											<p className="mt-1 text-gray-900">
												Chuyển khoản ngân hàng
											</p>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Customer Info */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<User className="w-5 h-5" />
										Thông tin người nhận
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									<div className="flex items-center gap-3">
										<User className="w-4 h-4 text-gray-400" />
										<span className="font-medium">{order.recipientName}</span>
									</div>
									<div className="flex items-center gap-3">
										<Phone className="w-4 h-4 text-gray-400" />
										<span>{order.recipientPhone}</span>
									</div>
									<div className="flex items-start gap-3">
										<MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
										<span>{order.shippingAddress}</span>
									</div>
								</CardContent>
							</Card>

							{/* Order Details */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Package className="w-5 h-5" />
										Sản phẩm đã đặt
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-4">
										{order.orderDetails.map((item, index) => (
											<OrderProductItem
												key={index}
												productId={item.productId}
												quantity={item.quantity}
												priceAtPurchase={item.priceAtPurchase}
												discountApplied={item.discountApplied}
											/>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Payment Summary */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<CreditCard className="w-5 h-5" />
										Tóm tắt thanh toán
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="space-y-3">
										<div className="flex justify-between">
											<span className="text-gray-600">Tạm tính:</span>
											<span>{formatCurrency(order.totalAmount)}</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-600">Phí vận chuyển:</span>
											<span>{formatCurrency(order.shippingFee)}</span>
										</div>
										{order.discountAmount > 0 && (
											<div className="flex justify-between text-green-600">
												<span>Giảm giá:</span>
												<span>-{formatCurrency(order.discountAmount)}</span>
											</div>
										)}
										<div className="border-t pt-3">
											<div className="flex justify-between text-lg font-bold">
												<span>Tổng cộng:</span>
												<span className="text-primary">
													{formatCurrency(order.finalAmount)}
												</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Notes */}
							{order.notes && (
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileText className="w-5 h-5" />
											Ghi chú
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
											{order.notes}
										</p>
									</CardContent>
								</Card>
							)}

							{/* Applied Discounts */}
							{order.appliedDiscounts && order.appliedDiscounts.length > 0 && (
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileText className="w-5 h-5" />
											Voucher đã áp dụng
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-2">
											{order.appliedDiscounts.map((discount, index) => (
												<div
													key={index}
													className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
												>
													<span className="text-green-800">
														Voucher #{index + 1}
													</span>
													<span className="font-medium text-green-600">
														-{formatCurrency(discount.discountAmount)}
													</span>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</div>
					) : null}
				</div>

				{/* Footer */}
				<div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
					<Button variant="outline" onClick={onClose}>
						Đóng
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OrderDetailModal;
