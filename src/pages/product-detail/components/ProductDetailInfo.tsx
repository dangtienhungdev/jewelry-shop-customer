import type { ProductDetail } from '@/types/productDetail.type';
import React, { useState } from 'react';

const ProductDetailInfo: React.FC = () => {
	const [quantity, setQuantity] = useState(1);
	const [selectedTab, setSelectedTab] = useState<
		'description' | 'specifications' | 'reviews'
	>('description');

	// Mock data
	const product: ProductDetail = {
		id: '1',
		productName: 'R MIDI GREEN',
		description: 'Nhẫn bạc cao cấp với đá quý xanh lá',
		longDescription:
			'Nhẫn R MIDI GREEN là sản phẩm trang sức cao cấp được chế tác từ bạc Sterling 925 nguyên chất, đính kèm viên đá quý xanh lá tự nhiên. Thiết kế tinh tế, sang trọng phù hợp với mọi lứa tuổi và phong cách.',
		price: 1299000,
		discountedPrice: 999000,
		effectivePrice: 999000,
		discountPercentage: 23,
		weight: 4.5,
		material: 'Bạc Sterling 925',
		stockQuantity: 15,
		categoryId: 'cat1',
		category: {
			id: 'cat1',
			categoryName: 'Nhẫn',
			description: 'Nhẫn đá quý',
		},
		isFeatured: true,
		views: 1250,
		images: [],
		discounts: [],
		createdAt: '2024-01-01',
		updatedAt: '2024-01-01',
		averageRating: 4.8,
		totalReviews: 127,
		tags: ['bạc', 'đá quý', 'sang trọng', 'cao cấp'],
		specifications: [
			{ name: 'Chất liệu', value: 'Bạc Sterling 925' },
			{ name: 'Đá quý', value: 'Emerald tự nhiên' },
			{ name: 'Trọng lượng', value: '4.5g' },
			{ name: 'Kích thước', value: 'Size 6-9' },
			{ name: 'Xuất xứ', value: 'Việt Nam' },
			{ name: 'Bảo hành', value: '12 tháng' },
		],
		reviews: [
			{
				id: '1',
				userId: 'user1',
				userName: 'Nguyễn Thị A',
				rating: 5,
				comment: 'Sản phẩm rất đẹp, chất lượng tốt. Đúng như mô tả.',
				createdAt: '2024-01-15',
			},
			{
				id: '2',
				userId: 'user2',
				userName: 'Trần Văn B',
				rating: 4,
				comment: 'Thiết kế đẹp, giao hàng nhanh. Giá hơi cao một chút.',
				createdAt: '2024-01-10',
			},
		],
	};

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
					<div className="flex space-x-1">
						{renderStars(Math.floor(product.averageRating))}
					</div>
					<span className="text-sm text-gray-600">
						{product.averageRating} ({product.totalReviews} đánh giá)
					</span>
					<span className="text-sm text-gray-400">|</span>
					<span className="text-sm text-gray-600">
						{product.views} lượt xem
					</span>
				</div>

				{/* Price */}
				<div className="mb-6">
					<div className="flex items-center space-x-3">
						<span className="text-3xl font-bold text-[#C28B1B]">
							{formatPrice(product.effectivePrice)}
						</span>
						{product.discountedPrice &&
							product.discountedPrice < product.price && (
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
							className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<i className="fas fa-minus text-sm"></i>
						</button>
						<span className="text-lg font-semibold min-w-[40px] text-center">
							{quantity}
						</span>
						<button
							onClick={() => handleQuantityChange(quantity + 1)}
							disabled={quantity >= product.stockQuantity}
							className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
						>
							<i className="fas fa-plus text-sm"></i>
						</button>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="flex space-x-4 mb-6">
					<button
						onClick={handleAddToCart}
						disabled={product.stockQuantity <= 0}
						className="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-md hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
					>
						<i className="fas fa-shopping-cart mr-2"></i>
						Thêm vào giỏ
					</button>
					<button
						onClick={handleBuyNow}
						disabled={product.stockQuantity <= 0}
						className="flex-1 bg-[#C28B1B] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#a67a16] disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
					>
						Mua ngay
					</button>
				</div>

				{/* Tags */}
				<div className="mb-6">
					<span className="text-sm text-gray-600 mb-2 block">Tags:</span>
					<div className="flex flex-wrap gap-2">
						{product.tags.map((tag, index) => (
							<span
								key={index}
								className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>

			{/* Tabs */}
			<div className="mt-8">
				<div className="border-b border-gray-200">
					<nav className="flex space-x-8">
						{[
							{ key: 'description', label: 'Mô tả' },
							{ key: 'specifications', label: 'Thông số' },
							{ key: 'reviews', label: `Đánh giá (${product.totalReviews})` },
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setSelectedTab(tab.key as any)}
								className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
									selectedTab === tab.key
										? 'border-[#C28B1B] text-[#C28B1B]'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
								}`}
							>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				<div className="mt-6">
					{selectedTab === 'description' && (
						<div className="prose prose-sm max-w-none">
							<p className="text-gray-700 leading-relaxed">
								{product.longDescription}
							</p>
						</div>
					)}

					{selectedTab === 'specifications' && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{product.specifications.map((spec, index) => (
								<div
									key={index}
									className="border border-gray-200 rounded-md p-3"
								>
									<div className="font-semibold text-gray-900 mb-1">
										{spec.name}
									</div>
									<div className="text-gray-700">{spec.value}</div>
								</div>
							))}
						</div>
					)}

					{selectedTab === 'reviews' && (
						<div className="space-y-4">
							{product.reviews.map((review) => (
								<div
									key={review.id}
									className="border border-gray-200 rounded-md p-4"
								>
									<div className="flex items-center justify-between mb-2">
										<div className="font-semibold text-gray-900">
											{review.userName}
										</div>
										<div className="flex space-x-1">
											{renderStars(review.rating)}
										</div>
									</div>
									<p className="text-gray-700 text-sm">{review.comment}</p>
									<div className="text-xs text-gray-500 mt-2">
										{new Date(review.createdAt).toLocaleDateString('vi-VN')}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductDetailInfo;
