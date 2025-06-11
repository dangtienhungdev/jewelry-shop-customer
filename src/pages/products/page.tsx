import { MainLayout } from '@/layouts';
import React from 'react';
import ProductBanner from './components/ProductBanner';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ProductPagination from './components/ProductPagination';

const ProductPage: React.FC = () => {
	return (
		<MainLayout fullWidth>
			<ProductBanner />
			<div className="max-w-7xl mx-auto px-6">
				<ProductBreadcrumb />
				<div className="flex flex-col md:flex-row md:space-x-8">
					<ProductFilter />
					<ProductList />
				</div>
				<ProductPagination />
			</div>
		</MainLayout>
	);
};

export default ProductPage;
