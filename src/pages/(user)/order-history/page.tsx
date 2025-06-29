import { useCustomerOrders } from '@/apis/orders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/layouts';
import {
	AlertCircle,
	ChevronLeft,
	ChevronRight,
	Loader2,
	RefreshCw,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderCard from './components/OrderCard';
import OrderDetailModal from './components/OrderDetailModal';
import OrderEmptyState from './components/OrderEmptyState';
import OrderStatusFilter, {
	type OrderStatus,
} from './components/OrderStatusFilter';

const OrderHistoryPage: React.FC = () => {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const limit = 10;

	// Fetch orders data
	const {
		data: ordersData,
		isLoading,
		isError,
		error,
		refetch,
		isFetching,
	} = useCustomerOrders(user?._id || '', currentPage, limit);

	// Filter orders by status
	const filteredOrders = useMemo(() => {
		if (!ordersData?.orders || selectedStatus === 'all') {
			return ordersData?.orders || [];
		}
		return ordersData.orders.filter((order) => order.status === selectedStatus);
	}, [ordersData?.orders, selectedStatus]);

	// Calculate status counts
	const statusCounts = useMemo(() => {
		if (!ordersData?.orders) return {};

		const counts = ordersData.orders.reduce((acc, order) => {
			acc[order.status] = (acc[order.status] || 0) + 1;
			return acc;
		}, {} as Record<string, number>);

		return counts;
	}, [ordersData?.orders]);

	// Handle status filter change
	const handleStatusChange = (status: OrderStatus) => {
		setSelectedStatus(status);
		setCurrentPage(1);
	};

	// Clear filters
	const handleClearFilters = () => {
		setSelectedStatus('all');
		setCurrentPage(1);
	};

	// Handle view order details
	const handleViewDetails = (orderId: string) => {
		setSelectedOrderId(orderId);
		setIsModalOpen(true);
	};

	// Handle close modal
	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedOrderId(null);
	};

	// Pagination
	const totalPages = Math.ceil((ordersData?.total || 0) / limit);
	const hasNextPage = currentPage < totalPages;
	const hasPrevPage = currentPage > 1;

	// Loading state
	if (isLoading) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex items-center justify-center min-h-96">
						<div className="text-center">
							<Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
							<p className="text-gray-600">Đang tải lịch sử đơn hàng...</p>
						</div>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Error state
	if (isError) {
		return (
			<MainLayout>
				<div className="max-w-7xl mx-auto px-6 py-8">
					<Card>
						<CardContent className="py-12 text-center">
							<AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
							<h3 className="text-lg font-medium text-gray-900 mb-2">
								Không thể tải dữ liệu
							</h3>
							<p className="text-gray-500 mb-6">
								{error?.message || 'Đã xảy ra lỗi khi tải lịch sử đơn hàng'}
							</p>
							<Button onClick={() => refetch()}>
								<RefreshCw className="w-4 h-4 mr-2" />
								Thử lại
							</Button>
						</CardContent>
					</Card>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Lịch sử đơn hàng
							</h1>
							<p className="text-gray-600 mt-1">
								Theo dõi và quản lý các đơn hàng của bạn
							</p>
						</div>

						<Button
							variant="outline"
							onClick={() => refetch()}
							disabled={isFetching}
							className="flex items-center gap-2"
						>
							<RefreshCw
								className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`}
							/>
							Làm mới
						</Button>
					</div>

					{/* Order Statistics */}
					{ordersData?.orders && ordersData.orders.length > 0 && (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
							<Card>
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-primary">
										{ordersData.total}
									</div>
									<div className="text-sm text-gray-600">Tổng đơn hàng</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-yellow-600">
										{statusCounts.pending || 0}
									</div>
									<div className="text-sm text-gray-600">Chờ xác nhận</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-blue-600">
										{statusCounts.shipping || 0}
									</div>
									<div className="text-sm text-gray-600">Đang giao</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-4 text-center">
									<div className="text-2xl font-bold text-green-600">
										{statusCounts.success || 0}
									</div>
									<div className="text-sm text-gray-600">Đã giao</div>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Status Filter */}
					<OrderStatusFilter
						selectedStatus={selectedStatus}
						onStatusChange={handleStatusChange}
						orderCounts={statusCounts}
					/>
				</div>

				{/* Orders List */}
				{filteredOrders.length === 0 ? (
					<OrderEmptyState
						hasFilters={selectedStatus !== 'all'}
						onClearFilters={handleClearFilters}
					/>
				) : (
					<>
						<div className="space-y-6">
							{filteredOrders.map((order) => (
								<OrderCard
									key={order._id}
									order={order}
									onViewDetails={handleViewDetails}
								/>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-between mt-8">
								<div className="text-sm text-gray-600">
									Trang {currentPage} / {totalPages}
									<span className="ml-2">({ordersData?.total} đơn hàng)</span>
								</div>

								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => setCurrentPage((prev) => prev - 1)}
										disabled={!hasPrevPage || isFetching}
									>
										<ChevronLeft className="w-4 h-4" />
										Trước
									</Button>

									{/* Page Numbers */}
									<div className="flex items-center gap-1">
										{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											const pageNum = Math.max(1, currentPage - 2) + i;
											if (pageNum > totalPages) return null;

											return (
												<Button
													key={pageNum}
													variant={
														pageNum === currentPage ? 'default' : 'outline'
													}
													size="sm"
													onClick={() => setCurrentPage(pageNum)}
													disabled={isFetching}
													className="w-8 h-8 p-0"
												>
													{pageNum}
												</Button>
											);
										})}
									</div>

									<Button
										variant="outline"
										size="sm"
										onClick={() => setCurrentPage((prev) => prev + 1)}
										disabled={!hasNextPage || isFetching}
									>
										Sau
										<ChevronRight className="w-4 h-4" />
									</Button>
								</div>
							</div>
						)}
					</>
				)}
			</div>

			{/* Order Detail Modal */}
			<OrderDetailModal
				orderId={selectedOrderId}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</MainLayout>
	);
};

export default OrderHistoryPage;
