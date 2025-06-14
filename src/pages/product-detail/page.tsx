import { MainLayout } from '@/layouts';
import React from 'react';
import ProductDetailBreadcrumb from './components/ProductDetailBreadcrumb';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductGallery from './components/ProductGallery';
import RelatedProducts from './components/RelatedProducts';

const ProductDetailPage: React.FC = () => {
	return (
		<MainLayout>
			<div className="mb-24">
				<ProductDetailBreadcrumb />
				<section className="flex flex-col lg:flex-row gap-8 mb-16">
					<ProductGallery />
					<ProductDetailInfo />
				</section>
				<RelatedProducts />
			</div>
		</MainLayout>
	);
};

export default ProductDetailPage;
