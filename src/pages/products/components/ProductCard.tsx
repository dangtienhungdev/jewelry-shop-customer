import React from 'react';

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	discountPercentage?: number;
	image: string;
	onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	id,
	name,
	price,
	originalPrice,
	discountPercentage,
	image,
	onClick,
}) => {
	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	return (
		<article
			className="border border-[#C49A4A] p-2 hover:shadow-lg transition-all duration-300 cursor-pointer group"
			onClick={onClick}
		>
			<div className="relative overflow-hidden">
				<img
					alt={name}
					className="w-full object-contain h-[300px] group-hover:scale-105 transition-transform duration-300"
					src={image}
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = 'https://via.placeholder.com/300x300?text=No+Image';
					}}
				/>
				{discountPercentage && discountPercentage > 0 && (
					<div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
						-{discountPercentage}%
					</div>
				)}
			</div>

			<div className="mt-2">
				<div
					className="text-center text-xs font-semibold line-clamp-2 hover:text-[#C49A4A] transition-colors"
					title={name}
				>
					{name}
				</div>

				<div className="text-center mt-1">
					<div className="text-xs text-[#C49A4A] font-semibold">
						{formatPrice(price)}
					</div>
					{originalPrice && originalPrice > price && (
						<div className="text-xs text-gray-500 line-through">
							{formatPrice(originalPrice)}
						</div>
					)}
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
