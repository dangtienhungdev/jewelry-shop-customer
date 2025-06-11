import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import ProductBanner from './components/ProductBanner';
import ProductBreadcrumb from './components/ProductBreadcrumb';
import ProductFilter from './components/ProductFilter';
import ProductList from './components/ProductList';
import ProductPagination from './components/ProductPagination';

const ProductPage: React.FC = () => {
	return (
		<div className="bg-white text-black">
			<Header />
			<ProductBanner />
			<div className="max-w-7xl mx-auto px-6">
				<ProductBreadcrumb />
				<div className="flex flex-col md:flex-row md:space-x-8">
					<ProductFilter />
					<ProductList />
				</div>
				<ProductPagination />
			</div>
			<Footer />
		</div>
	);
};

export default ProductPage;
