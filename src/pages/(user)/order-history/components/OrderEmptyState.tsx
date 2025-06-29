import { Card, CardContent } from '@/components/ui/card';
import { Search, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface OrderEmptyStateProps {
	hasFilters?: boolean;
	onClearFilters?: () => void;
}

const OrderEmptyState: React.FC<OrderEmptyStateProps> = ({
	hasFilters = false,
	onClearFilters,
}) => {
	const navigate = useNavigate();

	if (hasFilters) {
		return (
			<Card>
				<CardContent className="py-12 text-center">
					<Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Không tìm thấy đơn hàng
					</h3>
					<p className="text-gray-500 mb-6">
						Không có đơn hàng nào khớp với bộ lọc hiện tại.
					</p>
					<Button variant="outline" onClick={onClearFilters}>
						Xóa bộ lọc
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent className="py-12 text-center">
				<ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
				<h3 className="text-lg font-medium text-gray-900 mb-2">
					Chưa có đơn hàng nào
				</h3>
				<p className="text-gray-500 mb-6">
					Bạn chưa có đơn hàng nào. Hãy khám phá các sản phẩm tuyệt vời của
					chúng tôi!
				</p>
				<Button
					onClick={() => navigate('/products')}
					className="inline-flex items-center"
				>
					<ShoppingBag className="w-4 h-4 mr-2" />
					Mua sắm ngay
				</Button>
			</CardContent>
		</Card>
	);
};

export default OrderEmptyState;
