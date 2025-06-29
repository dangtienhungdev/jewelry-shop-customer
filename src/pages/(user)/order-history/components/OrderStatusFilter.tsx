import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useOrderHelpers } from '@/apis/orders';

export type OrderStatus =
	| 'all'
	| 'pending'
	| 'confirmed'
	| 'shipping'
	| 'success'
	| 'failed';

interface OrderStatusFilterProps {
	selectedStatus: OrderStatus;
	onStatusChange: (status: OrderStatus) => void;
	orderCounts?: Record<string, number>;
}

const OrderStatusFilter: React.FC<OrderStatusFilterProps> = ({
	selectedStatus,
	onStatusChange,
	orderCounts = {},
}) => {
	const { getStatusText, getStatusColor } = useOrderHelpers();

	const statusOptions: Array<{ key: OrderStatus; label: string }> = [
		{ key: 'all', label: 'Tất cả' },
		{ key: 'pending', label: 'Chờ xác nhận' },
		{ key: 'confirmed', label: 'Đã xác nhận' },
		{ key: 'shipping', label: 'Đang giao hàng' },
		{ key: 'success', label: 'Đã giao hàng' },
		{ key: 'failed', label: 'Đã hủy' },
	];

	return (
		<div className="flex flex-wrap gap-2">
			{statusOptions.map(({ key, label }) => {
				const isSelected = selectedStatus === key;
				const count = orderCounts[key] || 0;

				return (
					<Button
						key={key}
						variant={isSelected ? 'default' : 'outline'}
						size="sm"
						onClick={() => onStatusChange(key)}
						className={`relative ${isSelected ? 'ring-2 ring-primary' : ''}`}
					>
						<span>{label}</span>
						{key !== 'all' && count > 0 && (
							<Badge
								variant="secondary"
								className="ml-2 px-1.5 py-0.5 text-xs min-w-5 h-5"
							>
								{count}
							</Badge>
						)}
						{key === 'all' && (
							<Badge
								variant="secondary"
								className="ml-2 px-1.5 py-0.5 text-xs min-w-5 h-5"
							>
								{Object.values(orderCounts).reduce(
									(sum, count) => sum + count,
									0
								)}
							</Badge>
						)}
					</Button>
				);
			})}
		</div>
	);
};

export default OrderStatusFilter;
