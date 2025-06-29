import { Badge } from '@/components/ui/badge';
import React from 'react';
import { useOrderHelpers } from '@/apis/orders';
import { useProduct } from '@/apis/products';

interface OrderProductItemProps {
	productId: string;
	quantity: number;
	priceAtPurchase: number;
	discountApplied?: number;
}

const OrderProductItem: React.FC<OrderProductItemProps> = ({
	productId,
	quantity,
	priceAtPurchase,
	discountApplied = 0,
}) => {
	const { data: product, isLoading } = useProduct(productId);
	const { formatCurrency } = useOrderHelpers();

	if (isLoading) {
		return (
			<div className="flex items-center justify-between p-4 border rounded-lg animate-pulse">
				<div className="flex-1">
					<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
					<div className="h-3 bg-gray-200 rounded w-2/3"></div>
				</div>
				<div className="text-right">
					<div className="h-6 bg-gray-200 rounded w-20"></div>
				</div>
			</div>
		);
	}

	const totalPrice = priceAtPurchase * quantity;
	const finalPrice = totalPrice - (discountApplied || 0);

	return (
		<div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
			<div className="flex-1">
				<div className="flex items-start gap-3">
					{/* Product Image Placeholder */}
					<div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
						<span className="text-xs text-gray-500">IMG</span>
					</div>

					<div className="flex-1">
						<h4 className="font-medium text-gray-900 mb-1">
							{product?.productName || `Sản phẩm #${productId.slice(-6)}`}
						</h4>

						{product && (
							<>
								<p className="text-sm text-gray-500 mb-2">
									{product.material} • {product.weight}g
								</p>
								<div className="flex items-center gap-2 mb-2">
									<Badge variant="secondary" className="text-xs">
										{product.categoryId}
									</Badge>
									{product.stockQuantity > 0 ? (
										<Badge variant="outline" className="text-xs text-green-600">
											Còn hàng
										</Badge>
									) : (
										<Badge variant="outline" className="text-xs text-red-600">
											Hết hàng
										</Badge>
									)}
								</div>
							</>
						)}

						<div className="flex items-center gap-4 text-sm text-gray-600">
							<span>
								Số lượng: <strong>{quantity}</strong>
							</span>
							<span>Đơn giá: {formatCurrency(priceAtPurchase)}</span>
							{discountApplied > 0 && (
								<span className="text-green-600">
									Giảm: -{formatCurrency(discountApplied)}
								</span>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="text-right ml-4">
				<div className="space-y-1">
					{discountApplied > 0 && (
						<p className="text-sm text-gray-500 line-through">
							{formatCurrency(totalPrice)}
						</p>
					)}
					<p className="font-bold text-lg text-primary">
						{formatCurrency(finalPrice)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderProductItem;
