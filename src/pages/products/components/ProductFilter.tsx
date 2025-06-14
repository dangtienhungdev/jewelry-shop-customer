import { useCategories } from '@/apis';
import React from 'react';
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

	// Check if category is selected from URL
	const isCategorySelected = (categoryId: string) => {
		return searchParamsObject.categoryId === categoryId;
	};

	// Check if price range is selected from URL
	const isPriceRangeSelected = (priceRangeValue: string) => {
		const [minPrice, maxPrice] = priceRangeValue.split('-');
		return (
			searchParamsObject.minPrice === minPrice &&
			searchParamsObject.maxPrice === maxPrice
		);
	};

	// Check if any filter is applied
	const hasActiveFilters = () => {
		return !!(
			searchParamsObject.categoryId ||
			(searchParamsObject.minPrice && searchParamsObject.maxPrice)
		);
	};

	const handleCategoryChange = (categoryId: string) => {
		// Toggle category selection
		const isCurrentlySelected = isCategorySelected(categoryId);

		// Tạo params mới
		const newParams = { ...searchParamsObject };

		if (isCurrentlySelected) {
			// Nếu đang được chọn thì bỏ chọn
			delete newParams.categoryId;
		} else {
			// Nếu chưa được chọn thì chọn
			newParams.categoryId = categoryId;
		}

		// Reset về trang 1 khi filter thay đổi
		newParams.page = '1';

		navigate({
			pathname: '/products',
			search: createSearchParams(newParams).toString(),
		});
	};

	const handlePriceRangeChange = (priceRangeValue: string) => {
		const isCurrentlySelected = isPriceRangeSelected(priceRangeValue);

		// Tạo params mới
		const newParams = { ...searchParamsObject };

		if (isCurrentlySelected) {
			// Nếu đang được chọn thì bỏ chọn
			delete newParams.minPrice;
			delete newParams.maxPrice;
		} else {
			// Nếu chưa được chọn thì chọn
			const [minPrice, maxPrice] = priceRangeValue.split('-');
			newParams.minPrice = minPrice;
			newParams.maxPrice = maxPrice;
		}

		// Reset về trang 1 khi filter thay đổi
		newParams.page = '1';

		navigate({
			pathname: '/products',
			search: createSearchParams(newParams).toString(),
		});
	};

	const handleClearFilters = () => {
		// Chỉ giữ lại page và limit, xóa tất cả filters
		const newParams = {
			page: '1',
			limit: searchParamsObject.limit || '9',
		};

		navigate({
			pathname: '/products',
			search: createSearchParams(newParams).toString(),
		});
	};

	return (
		<aside className="flex-shrink-0 w-full md:w-48 mb-10 md:mb-0">
			{/* Header với nút Clear Filter */}
			<div className="flex items-center justify-between mb-6">
				<h1 className="font-extrabold text-xl">Bộ lọc</h1>
				{hasActiveFilters() && (
					<button
						onClick={handleClearFilters}
						className="text-sm text-red-600 hover:text-red-800 font-medium underline transition-colors"
					>
						Xóa bộ lọc
					</button>
				)}
			</div>

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
										isCategorySelected(category.id) ? 'text-[#C49A4A]' : ''
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
				<div className="mt-3 space-y-2 font-semibold text-base">
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
								checked={isPriceRangeSelected(priceRange.value)}
								onChange={() => handlePriceRangeChange(priceRange.value)}
							/>
							<span
								className={
									isPriceRangeSelected(priceRange.value) ? 'text-[#C49A4A]' : ''
								}
							>
								{priceRange.label}
							</span>
						</label>
					))}
				</div>
			</div>
		</aside>
	);
};

export default ProductFilter;
