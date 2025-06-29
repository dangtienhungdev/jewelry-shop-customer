import { MainLayout } from '@/layouts';
import ProductDetailBreadcrumb from './components/ProductDetailBreadcrumb';
import ProductDetailInfo from './components/ProductDetailInfo';
import ProductGallery from './components/ProductGallery';
import React from 'react';
import RelatedProducts from './components/RelatedProducts';
import { Reviews } from './components/reviews';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/apis';

const ProductDetailPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const { data: product, isLoading, error } = useProduct(id || '');

	// Loading state
	if (isLoading) {
		return (
			<MainLayout>
				<div className="mb-24">
					<div className="max-w-7xl mx-auto px-6">
						{/* Breadcrumb skeleton */}
						<div className="h-6 bg-gray-200 animate-pulse rounded mb-8 w-64"></div>

						<section className="flex flex-col lg:flex-row gap-8 mb-16">
							{/* Gallery skeleton */}
							<div className="lg:w-1/2">
								<div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
								<div className="flex gap-2">
									{Array.from({ length: 4 }).map((_, index) => (
										<div
											key={index}
											className="w-20 h-20 bg-gray-200 animate-pulse rounded"
										></div>
									))}
								</div>
							</div>

							{/* Info skeleton */}
							<div className="lg:w-1/2 space-y-4">
								<div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
								<div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
								<div className="h-20 bg-gray-200 animate-pulse rounded"></div>
								<div className="h-12 bg-gray-200 animate-pulse rounded w-32"></div>
							</div>
						</section>
					</div>
				</div>
			</MainLayout>
		);
	}

	// Error state
	if (error || !product) {
		return (
			<MainLayout>
				<div className="mb-24">
					<div className="max-w-7xl mx-auto px-6 text-center py-16">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							{error ? 'Lỗi khi tải sản phẩm' : 'Không tìm thấy sản phẩm'}
						</h2>
						<p className="text-gray-600 mb-8">
							{error
								? 'Vui lòng thử lại sau'
								: 'Sản phẩm bạn tìm kiếm không tồn tại'}
						</p>
						<button
							onClick={() => window.history.back()}
							className="bg-[#C49A4A] text-white px-6 py-2 rounded-md hover:bg-[#b87a1a] transition-colors"
						>
							Quay lại
						</button>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="mb-24 mt-10">
				<ProductDetailBreadcrumb productName={product.productName} />
				<section className="flex flex-col lg:flex-row gap-8 mb-16">
					<ProductGallery
						images={product.images}
						productName={product.productName}
					/>
					<ProductDetailInfo product={product} />
				</section>
				<RelatedProducts />

				{/* Reviews Section */}
				<section className="mt-16">
					<div className="max-w-7xl mx-auto px-6">
						<h2 className="text-2xl font-bold text-gray-900 mb-8">
							Đánh giá sản phẩm
						</h2>
						<Reviews productId={product.id} />
					</div>
				</section>
			</div>
		</MainLayout>
	);
};

export default ProductDetailPage;
