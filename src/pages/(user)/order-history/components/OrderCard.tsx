import {
	AlertTriangle,
	CheckCircle,
	Clock,
	Eye,
	Package,
	Truck,
	X,
	XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';
import { useCancelOrder, useOrderHelpers } from '@/apis/orders';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { OrderResponseDto } from '@/apis/orders/order.api';

interface OrderCardProps {
	order: OrderResponseDto;
	onViewDetails?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
	const [showCancelConfirm, setShowCancelConfirm] = useState(false);
	const [cancelReason, setCancelReason] = useState('');

	const cancelOrderMutation = useCancelOrder();
	const {
		getStatusText,
		getStatusColor,
		canCancelOrder,
		formatCurrency,
		formatDate,
	} = useOrderHelpers();

	const getStatusIcon = (status: string) => {
		const iconMap = {
			pending: <Clock className="w-4 h-4" />,
			confirmed: <Package className="w-4 h-4" />,
			shipping: <Truck className="w-4 h-4" />,
			success: <CheckCircle className="w-4 h-4" />,
			failed: <XCircle className="w-4 h-4" />,
		};
		return (
			iconMap[status as keyof typeof iconMap] || <Clock className="w-4 h-4" />
		);
	};

	const handleCancelOrder = async () => {
		try {
			await cancelOrderMutation.mutateAsync({
				orderId: order._id,
				reason: cancelReason || 'Khách hàng yêu cầu hủy đơn',
			});
			setShowCancelConfirm(false);
			setCancelReason('');
		} catch (error) {
			// Error is handled by the mutation
			console.error('Cancel order failed:', error);
		}
	};

	const totalItems = order.orderDetails.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	return (
		<Card className="hover:shadow-md transition-shadow">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<CardTitle className="text-lg">
							Đơn hàng #{order.orderCode}
						</CardTitle>
						<p className="text-sm text-gray-500">
							{formatDate(order.orderDate)}
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Badge className={getStatusColor(order.status)}>
							{getStatusIcon(order.status)}
							{getStatusText(order.status)}
						</Badge>
					</div>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Order Summary */}
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div>
						<span className="text-gray-500">Số sản phẩm:</span>
						<span className="ml-2 font-medium">{totalItems} sản phẩm</span>
					</div>
					<div>
						<span className="text-gray-500">Phí vận chuyển:</span>
						<span className="ml-2 font-medium">
							{formatCurrency(order.shippingFee)}
						</span>
					</div>
					<div>
						<span className="text-gray-500">Giảm giá:</span>
						<span className="ml-2 font-medium text-green-600">
							-{formatCurrency(order.discountAmount)}
						</span>
					</div>
					<div>
						<span className="text-gray-500">Tổng tiền:</span>
						<span className="ml-2 font-bold text-primary">
							{formatCurrency(order.finalAmount)}
						</span>
					</div>
				</div>

				{/* Shipping Info */}
				<div className="bg-gray-50 p-3 rounded-lg">
					<p className="text-sm text-gray-600 mb-1">
						<span className="font-medium">Người nhận:</span>{' '}
						{order.recipientName}
					</p>
					<p className="text-sm text-gray-600 mb-1">
						<span className="font-medium">SĐT:</span> {order.recipientPhone}
					</p>
					<p className="text-sm text-gray-600">
						<span className="font-medium">Địa chỉ:</span>{' '}
						{order.shippingAddress}
					</p>
				</div>

				{/* Products Summary */}
				<div className="space-y-2">
					<h4 className="font-medium text-sm">Sản phẩm đã đặt:</h4>
					<div className="space-y-1">
						{order.orderDetails.slice(0, 2).map((item, index) => (
							<div
								key={index}
								className="flex justify-between text-sm text-gray-600"
							>
								<span>
									Sản phẩm {index + 1} x{item.quantity}
								</span>
								<span>
									{formatCurrency(item.priceAtPurchase * item.quantity)}
								</span>
							</div>
						))}
						{order.orderDetails.length > 2 && (
							<p className="text-sm text-gray-500 italic">
								+{order.orderDetails.length - 2} sản phẩm khác...
							</p>
						)}
					</div>
				</div>

				{/* Notes */}
				{order.notes && (
					<div className="bg-blue-50 p-3 rounded-lg">
						<p className="text-sm text-blue-800">
							<span className="font-medium">Ghi chú:</span> {order.notes}
						</p>
					</div>
				)}

				{/* Actions */}
				<div className="flex items-center gap-2 pt-2 border-t">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onViewDetails?.(order._id)}
						className="flex-1"
					>
						<Eye className="w-4 h-4 mr-2" />
						Xem chi tiết
					</Button>

					{canCancelOrder(order.status) && (
						<Button
							variant="destructive"
							size="sm"
							onClick={() => setShowCancelConfirm(true)}
							disabled={cancelOrderMutation.isPending}
							className="flex-1"
						>
							<X className="w-4 h-4 mr-2" />
							{cancelOrderMutation.isPending ? 'Đang hủy...' : 'Hủy đơn'}
						</Button>
					)}
				</div>

				{/* Cancel Confirmation */}
				{showCancelConfirm && (
					<div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-3">
						<div className="flex items-center gap-2 text-red-800">
							<AlertTriangle className="w-5 h-5" />
							<span className="font-medium">Xác nhận hủy đơn hàng</span>
						</div>

						<p className="text-sm text-red-700">
							Bạn có chắc chắn muốn hủy đơn hàng này? Hành động này không thể
							hoàn tác.
						</p>

						<div className="space-y-2">
							<textarea
								value={cancelReason}
								onChange={(e) => setCancelReason(e.target.value)}
								placeholder="Lý do hủy đơn (tùy chọn)..."
								className="w-full px-3 py-2 border border-red-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
								rows={2}
								maxLength={200}
							/>

							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										setShowCancelConfirm(false);
										setCancelReason('');
									}}
									className="flex-1"
								>
									Giữ đơn hàng
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={handleCancelOrder}
									disabled={cancelOrderMutation.isPending}
									className="flex-1"
								>
									{cancelOrderMutation.isPending
										? 'Đang hủy...'
										: 'Xác nhận hủy'}
								</Button>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default OrderCard;
