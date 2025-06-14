import { useCategories } from '@/apis';
import React, { useState } from 'react';
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';

interface ProductFilterProps {
	onFilterChange: (filters: any) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const searchParamsObject = Object.fromEntries([...searchParams]);

	const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
	const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');

	// Lấy categories từ API
	const { data, isLoading: loadingCategories } = useCategories();
	const categories = data?.data?.items || [];

	const priceRanges = [
		{ label: 'Dưới 50.000₫', value: '0-50000' },
		{ label: '50.000₫ - 100.000₫', value: '50000-100000' },
		{ label: '100.000₫ - 300.000₫', value: '100000-300000' },
		{ label: '300.000₫ - 500.000₫', value: '300000-500000' },
		{ label: 'Trên 500.000₫', value: '500000-999999999' },
	];

	const handleCategoryChange = (categoryId: string) => {
		// Toggle category selection
		setSelectedCategoryId(selectedCategoryId === categoryId ? '' : categoryId);

		navigate({
			pathname: '/products',
			search: createSearchParams({
				...searchParamsObject,
				categoryId: categoryId,
			}).toString(),
		});
	};

	const handlePriceRangeChange = (value: string) => {
		setSelectedPriceRange(selectedPriceRange === value ? '' : value);
	};

	return (
		<aside className="flex-shrink-0 w-full md:w-48 mb-10 md:mb-0">
			{/* Danh mục */}
			<div className="mb-8">
				<h2 className="font-extrabold text-lg flex items-center space-x-2">
					<span className="border-l-4 border-[#C49A4A] pl-2">Danh mục</span>
				</h2>

				{loadingCategories ? (
					<div className="mt-2">
						{/* Loading skeleton */}
						{Array.from({ length: 5 }).map((_, index) => (
							<div
								key={index}
								className="h-6 bg-gray-200 animate-pulse rounded mb-2"
							></div>
						))}
					</div>
				) : categories.length > 0 ? (
					<ul className="mt-2 space-y-1 font-semibold text-base">
						{categories &&
							categories.length > 0 &&
							categories.map((category) => (
								<li
									key={category.id}
									className={`cursor-pointer hover:text-[#C49A4A] transition-colors ${
										selectedCategoryId === category.id ? 'text-[#C49A4A]' : ''
									}`}
									onClick={() => handleCategoryChange(category.id)}
									aria-hidden={true}
								>
									{category.categoryName}
								</li>
							))}
					</ul>
				) : (
					<div className="mt-2 text-gray-500 text-sm">
						Không có danh mục nào
					</div>
				)}
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
								onChange={() => handlePriceRangeChange(priceRange.value)}
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
