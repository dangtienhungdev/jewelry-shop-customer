import React, { useEffect, useState } from 'react';

interface ProductFilterProps {
	onFilterChange: (filters: any) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

	const categories = [
		'Nhẫn',
		'Dây chuyền',
		'Bông tai',
		'Mặt dây chuyền',
		'Lắc tay',
		'Vòng cổ',
		'Khuyên tai',
	];

	const priceRanges = [
		{ label: 'Dưới 50.000₫', value: '0-50000' },
		{ label: '50.000₫ - 100.000₫', value: '50000-100000' },
		{ label: '100.000₫ - 300.000₫', value: '100000-300000' },
		{ label: '300.000₫ - 500.000₫', value: '300000-500000' },
		{ label: 'Trên 500.000₫', value: '500000-999999999' },
	];

	// Gửi filter changes lên parent component khi có thay đổi
	useEffect(() => {
		const filters: any = {};

		if (selectedCategory) {
			filters.category = selectedCategory;
		}

		if (selectedPriceRange) {
			const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
			filters.minPrice = minPrice;
			filters.maxPrice = maxPrice;
		}

		onFilterChange(filters);
	}, [selectedCategory, selectedPriceRange, onFilterChange]);

	const handleCategoryChange = (category: string) => {
		// Toggle category selection
		setSelectedCategory(selectedCategory === category ? '' : category);
	};

	return (
		<aside className="flex-shrink-0 w-full md:w-48 mb-10 md:mb-0">
			{/* Danh mục */}
			<div className="mb-8">
				<h2 className="font-extrabold text-lg flex items-center space-x-2">
					<span className="border-l-4 border-[#C49A4A] pl-2">Danh mục</span>
				</h2>
				<ul className="mt-2 space-y-1 font-semibold text-base">
					{categories.map((category, index) => (
						<li
							key={index}
							className={`cursor-pointer hover:text-[#C49A4A] transition-colors ${
								selectedCategory === category ? 'text-[#C49A4A]' : ''
							}`}
							onClick={() => handleCategoryChange(category)}
						>
							{category}
						</li>
					))}
				</ul>
			</div>

			{/* Lọc giá */}
			<div>
				<h2 className="font-extrabold text-lg flex items-center space-x-2">
					<span className="border-l-4 border-[#C49A4A] pl-2">Lọc giá</span>
				</h2>
				<form className="mt-3 space-y-2 font-semibold text-base">
					{priceRanges.map((priceRange, index) => (
						<label
							key={index}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<input
								className="form-radio text-black"
								name="price"
								type="radio"
								value={priceRange.value}
								checked={selectedPriceRange === priceRange.value}
								onChange={(e) => setSelectedPriceRange(e.target.value)}
							/>
							<span>{priceRange.label}</span>
						</label>
					))}
				</form>
			</div>
		</aside>
	);
};

export default ProductFilter;
