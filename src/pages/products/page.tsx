import { useProducts } from '@/apis';
import { MainLayout } from '@/layouts';
import React from 'react';
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import ProductBanner from './components/ProductBanner';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ProductPagination from './components/ProductPagination';

const ProductPage: React.FC = () => {
	const navigate = useNavigate();
	const [params] = useSearchParams();
	const searchParamsObject = Object.fromEntries([...params]);

	const { data, error, isLoading } = useProducts({ ...searchParamsObject });

	const handleFilterChange = (newFilters: any) => {
		console.log('🚀 ~ newFilters:', newFilters);

		// Tạo params mới với filters
		const newParams = new URLSearchParams();

		// Giữ lại page = 1 khi filter thay đổi
		newParams.set('page', '1');
		newParams.set('limit', searchParamsObject.limit || '9');

		// Thêm filters vào params
		Object.entries(newFilters).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				newParams.set(key, value.toString());
			}
		});

		// Navigate với params mới
		navigate(
			{
				pathname: '/products',
				search: newParams.toString(),
			},
			{ replace: true }
		);
	};

	const handlePageChange = (page: number, limit: number = 9) => {
		navigate(
			{
				pathname: '/products',
				search: createSearchParams({
					...searchParamsObject,
					page: page.toString(),
					limit: limit.toString(),
				}).toString(),
			},
			{ replace: true }
		);
	};

	return (
		<MainLayout fullWidth>
			<ProductBanner />
			<div className="max-w-7xl mx-auto px-6">
				<ProductBreadcrumb />
				<div className="flex flex-col md:flex-row md:space-x-8">
					<ProductFilter onFilterChange={handleFilterChange} />
					<ProductList
						products={data?.data?.items || []}
						currentPage={Number(searchParamsObject.page) || 1}
						isLoading={isLoading}
						error={error}
					/>
				</div>
				<ProductPagination
					currentPage={Number(searchParamsObject.page) || 1}
					totalPages={data?.data?.totalPages}
					onPageChange={handlePageChange}
				/>
			</div>
		</MainLayout>
	);
};

export default ProductPage;
