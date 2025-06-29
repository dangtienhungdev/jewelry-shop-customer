import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { orderApi, type OrderResponseDto } from './order.api';

// Query keys for caching
const orderKeys = {
	all: ['customer-orders'] as const,
	lists: () => [...orderKeys.all, 'list'] as const,
	list: (customerId: string, page: number, limit: number) =>
		[...orderKeys.lists(), customerId, page, limit] as const,
	details: () => [...orderKeys.all, 'detail'] as const,
	detail: (orderId: string) => [...orderKeys.details(), orderId] as const,
};

// Hook để lấy danh sách đơn hàng
export const useCustomerOrders = (
	customerId: string,
	page: number = 1,
	limit: number = 10
) => {
	return useQuery({
		queryKey: orderKeys.list(customerId, page, limit),
		queryFn: () => orderApi.getCustomerOrders(customerId, page, limit),
		enabled: !!customerId,
		staleTime: 5 * 60 * 1000, // 5 minutes
		gcTime: 10 * 60 * 1000, // 10 minutes (cacheTime is now gcTime)
	});
};

// Hook để lấy chi tiết đơn hàng
export const useOrderDetail = (orderId: string) => {
	return useQuery({
		queryKey: orderKeys.detail(orderId),
		queryFn: () => orderApi.getOrderById(orderId),
		enabled: !!orderId,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// Hook để hủy order
export const useCancelOrder = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
			orderApi.cancelOrder(orderId, reason),
		onSuccess: (data, variables) => {
			// Invalidate và refetch customer orders
			queryClient.invalidateQueries({ queryKey: orderKeys.all });

			// Update specific order detail if it's cached
			queryClient.setQueryData(
				orderKeys.detail(variables.orderId),
				(oldData: OrderResponseDto | undefined) => {
					if (oldData) {
						return { ...oldData, status: 'failed' };
					}
					return oldData;
				}
			);

			toast.success('Đơn hàng đã được hủy thành công');
		},
		onError: (error: any) => {
			const message = error?.response?.data?.message || 'Hủy đơn hàng thất bại';
			toast.error(message);
		},
	});
};

// Helper function để format order status
export const useOrderHelpers = () => {
	const getStatusText = (status: string): string => {
		const statusMap: Record<string, string> = {
			pending: 'Chờ xác nhận',
			confirmed: 'Đã xác nhận',
			shipping: 'Đang giao hàng',
			success: 'Đã giao hàng',
			failed: 'Đã hủy',
		};
		return statusMap[status] || status;
	};

	const getStatusColor = (status: string): string => {
		const colorMap: Record<string, string> = {
			pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
			confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
			shipping: 'bg-purple-100 text-purple-800 border-purple-300',
			success: 'bg-green-100 text-green-800 border-green-300',
			failed: 'bg-red-100 text-red-800 border-red-300',
		};
		return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-300';
	};

	const canCancelOrder = (status: string): boolean => {
		return status === 'pending';
	};

	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(amount);
	};

	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleDateString('vi-VN', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return {
		getStatusText,
		getStatusColor,
		canCancelOrder,
		formatCurrency,
		formatDate,
	};
};
