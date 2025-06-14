import type { Product } from '@/types/product.type';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

interface ProductDetailInfoProps {
	product: Product;
}

const ProductDetailInfo: React.FC<ProductDetailInfoProps> = ({ product }) => {
	const [quantity, setQuantity] = useState(1);

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const handleQuantityChange = (newQuantity: number) => {
		if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
			setQuantity(newQuantity);
		}
	};

	const handleAddToCart = () => {
		console.log('Add to cart:', { productId: product.id, quantity });
		alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
	};

	const handleBuyNow = () => {
		console.log('Buy now:', { productId: product.id, quantity });
		alert(`Mua ngay ${quantity} sản phẩm!`);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, index) => (
			<i
				key={index}
				className={`fas fa-star text-sm ${
					index < rating ? 'text-yellow-400' : 'text-gray-300'
				}`}
			></i>
		));
	};

	return (
		<div className="flex-1 lg:w-1/2">
			{/* Product Info */}
			<div className="bg-white border border-gray-200 rounded-md p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					{product.productName}
				</h1>

				{/* Rating */}
				<div className="flex items-center space-x-2 mb-4">
					<div className="flex space-x-1">{renderStars(5)}</div>
					<span className="text-sm text-gray-600">5.0 (0 đánh giá)</span>
					<span className="text-sm text-gray-400">|</span>
					<span className="text-sm text-gray-600">
						{product.views || 0} lượt xem
					</span>
				</div>

				{/* Price */}
				<div className="mb-6">
					<div className="flex items-center space-x-3">
						<span className="text-3xl font-bold text-[#C28B1B]">
							{formatPrice(product.effectivePrice)}
						</span>
						{product.discountPercentage > 0 && (
							<>
								<span className="text-lg text-gray-500 line-through">
									{formatPrice(product.price)}
								</span>
								<span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
									-{product.discountPercentage}%
								</span>
							</>
						)}
					</div>
				</div>

				{/* Stock Status */}
				<div className="mb-6">
					<span className="text-sm text-gray-600">Tình trạng: </span>
					<span
						className={`font-semibold ${
							product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'
						}`}
					>
						{product.stockQuantity > 0
							? `Còn ${product.stockQuantity} sản phẩm`
							: 'Hết hàng'}
					</span>
				</div>

				{/* Quantity Selector */}
				<div className="mb-6">
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						Số lượng:
					</label>
					<div className="flex items-center space-x-3">
						<button
							onClick={() => handleQuantityChange(quantity - 1)}
							disabled={quantity <= 1}
							className="w-10 h-10 border flex items-center justify-center border-gray-300 rounded-md hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Minus className="w-4 h-4" />
						</button>
						<span className="text-lg font-semibold min-w-[40px] text-center">
							{quantity}
						</span>
						<button
							onClick={() => handleQuantityChange(quantity + 1)}
							disabled={quantity >= product.stockQuantity}
							className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<Plus className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-4 mb-6">
					<button
						onClick={handleAddToCart}
						disabled={product.stockQuantity <= 0}
						className="flex-1 cursor-pointer bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-md hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
					>
						Thêm vào giỏ
					</button>
					<button
						onClick={handleBuyNow}
						disabled={product.stockQuantity <= 0}
						className="flex-1 cursor-pointer flex items-center justify-center bg-[#C28B1B] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#a67a16] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
					>
						<ShoppingCart className="w-4 h-4 mr-2" />
						Mua ngay
					</button>
				</div>

				{/* Description */}
				<div className="mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						Mô tả sản phẩm
					</h3>
					<div className="prose prose-sm max-w-none">
						<p className="text-gray-700 leading-relaxed">
							{product.description || 'Chưa có mô tả cho sản phẩm này.'}
						</p>
					</div>
				</div>

				{/* Product Details */}
				<div>
					<h3 className="text-lg font-semibold text-gray-900 mb-3">
						Thông tin sản phẩm
					</h3>
					<div className="space-y-2 text-sm">
						<div className="flex justify-between py-1 border-b border-gray-100">
							<span className="text-gray-600">Danh mục:</span>
							<span className="font-medium">
								{product.category?.categoryName || 'Chưa phân loại'}
							</span>
						</div>
						<div className="flex justify-between py-1 border-b border-gray-100">
							<span className="text-gray-600">Trọng lượng:</span>
							<span className="font-medium">
								{product.weight ? `${product.weight}g` : 'Chưa cập nhật'}
							</span>
						</div>
						<div className="flex justify-between py-1 border-b border-gray-100">
							<span className="text-gray-600">Chất liệu:</span>
							<span className="font-medium">
								{product.material || 'Chưa cập nhật'}
							</span>
						</div>
						{product.isFeatured && (
							<div className="flex justify-between py-1">
								<span className="text-gray-600">Sản phẩm:</span>
								<span className="font-medium text-yellow-600">⭐ Nổi bật</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailInfo;
