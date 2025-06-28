import { api } from '@/configs/instances';

// Types dựa trên backend API
export interface CreateOrderDetailDto {
	productId: string;
	quantity: number;
	priceAtPurchase: number;
	discountApplied?: number;
}

export interface CreateOrderDto {
	customerId: string;
	shippingAddress: string;
	recipientName: string;
	recipientPhone: string;
	orderDetails: CreateOrderDetailDto[];
	shippingFee?: number;
	paymentMethod: 'cash' | 'payos';
	voucherCode?: string;
	notes?: string;
}

export interface OrderResponseDto {
	_id: string;
	orderCode: string;
	customerId: string;
	orderDate: string;
	totalAmount: number;
	discountAmount: number;
	finalAmount: number;
	shippingFee: number;
	status: string;
	shippingAddress: string;
	recipientName: string;
	recipientPhone: string;
	orderDetails: CreateOrderDetailDto[];
	appliedDiscounts: Array<{
		discountId: string;
		discountAmount: number;
	}>;
	notes?: string;
}

export interface CreateOrderResponse {
	order: OrderResponseDto;
	paymentUrl?: string;
	message: string;
}

export interface ConfirmPaymentDto {
	orderId: string;
	transactionId?: string;
	payosOrderCode?: number;
	responseCode?: string;
	notes?: string;
}

export interface ConfirmPaymentResponse {
	order: OrderResponseDto;
	payment?: {
		_id: string;
		status: string;
		amount: number;
		paymentDate: string;
	};
	message: string;
}

export interface VoucherValidationDto {
	voucherCode: string;
	orderValue: number;
}

export interface VoucherValidationResponse {
	isValid: boolean;
	message: string;
	discountAmount?: number;
	voucher?: {
		_id: string;
		discountCode: string;
		discountName: string;
		discountType: 'percentage' | 'fixed';
		discountValue: number;
		startDate: string;
		endDate: string;
		minOrderValue: number;
		maxDiscountAmount?: number;
		usageLimit?: number;
		usedCount: number;
		isActive: boolean;
	};
}

// Order API functions
export const orderApi = {
	/**
	 * Tạo đơn hàng mới
	 */
	async createOrder(orderData: CreateOrderDto): Promise<CreateOrderResponse> {
		try {
			console.log('🚀 Creating order:', orderData);

			const response = await api.post<CreateOrderResponse>(
				'/orders',
				orderData
			);

			console.log('✅ Order created successfully:', response.data);
			return response.data;
		} catch (error: any) {
			console.error('❌ Order creation failed:', error);

			// Extract error message from backend response
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message);
			} else if (
				error.response?.data?.message &&
				Array.isArray(error.response.data.message)
			) {
				throw new Error(error.response.data.message.join(', '));
			} else {
				throw new Error('Tạo đơn hàng thất bại. Vui lòng thử lại.');
			}
		}
	},

	/**
	 * Validate voucher code
	 */
	async validateVoucher(
		data: VoucherValidationDto
	): Promise<VoucherValidationResponse> {
		try {
			console.log('🎫 Validating voucher:', data);

			const response = await api.post<VoucherValidationResponse>(
				'/vouchers/validate',
				data
			);

			console.log('✅ Voucher validation result:', response.data);
			return response.data;
		} catch (error: any) {
			console.error('❌ Voucher validation failed:', error);

			// Return invalid result for any error
			return {
				isValid: false,
				message: error.response?.data?.message || 'Mã voucher không hợp lệ',
			};
		}
	},

	/**
	 * Lấy danh sách đơn hàng của customer
	 */
	async getCustomerOrders(customerId: string, page = 1, limit = 10) {
		try {
			const response = await api.get(
				`/orders?customerId=${customerId}&page=${page}&limit=${limit}`
			);
			return response.data;
		} catch (error) {
			console.error('❌ Failed to get customer orders:', error);
			throw error;
		}
	},

	/**
	 * Lấy chi tiết đơn hàng
	 */
	async getOrderById(orderId: string): Promise<OrderResponseDto> {
		try {
			const response = await api.get<OrderResponseDto>(`/orders/${orderId}`);
			return response.data;
		} catch (error) {
			console.error('❌ Failed to get order details:', error);
			throw error;
		}
	},

	/**
	 * Hủy đơn hàng
	 */
	async cancelOrder(orderId: string, reason?: string) {
		try {
			const response = await api.patch(`/orders/${orderId}/cancel`, { reason });
			return response.data;
		} catch (error) {
			console.error('❌ Failed to cancel order:', error);
			throw error;
		}
	},

	/**
	 * Xác nhận thanh toán thành công (từ PayOS callback)
	 */
	async confirmPayment(
		data: ConfirmPaymentDto
	): Promise<ConfirmPaymentResponse> {
		try {
			console.log('🔐 Confirming payment:', data);

			const response = await api.post<ConfirmPaymentResponse>(
				'/orders/confirm-payment',
				data
			);

			console.log('✅ Payment confirmed successfully:', response.data);
			return response.data;
		} catch (error: any) {
			console.error('❌ Payment confirmation failed:', error);

			// Extract error message from backend response
			if (error.response?.data?.message) {
				throw new Error(error.response.data.message);
			} else {
				throw new Error('Xác nhận thanh toán thất bại. Vui lòng thử lại.');
			}
		}
	},
};

// Helper functions
export const orderHelpers = {
	/**
	 * Format order for display
	 */
	formatOrderForDisplay(order: OrderResponseDto) {
		return {
			...order,
			formattedOrderDate: new Date(order.orderDate).toLocaleDateString('vi-VN'),
			formattedFinalAmount: new Intl.NumberFormat('vi-VN', {
				style: 'currency',
				currency: 'VND',
			}).format(order.finalAmount),
		};
	},

	/**
	 * Get status text in Vietnamese
	 */
	getStatusText(status: string): string {
		const statusMap: Record<string, string> = {
			pending: 'Đang chờ',
			confirmed: 'Xác nhận',
			shipping: 'Vận chuyển',
			success: 'Thành công',
			failed: 'Thất bại',
		};
		return statusMap[status] || status;
	},

	/**
	 * Get status color
	 */
	getStatusColor(status: string): string {
		const colorMap: Record<string, string> = {
			pending: 'text-yellow-600 bg-yellow-100',
			confirmed: 'text-blue-600 bg-blue-100',
			shipping: 'text-purple-600 bg-purple-100',
			success: 'text-green-600 bg-green-100',
			failed: 'text-red-600 bg-red-100',
		};
		return colorMap[status] || 'text-gray-600 bg-gray-100';
	},
};
