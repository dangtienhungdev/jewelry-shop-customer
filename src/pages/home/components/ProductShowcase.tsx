import type { Product } from '@/types/home.type';
import React from 'react';

const showcaseProducts: Product[] = [
	{
		id: '1',
		name: 'Nhẫn kim cương trắng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/11f544f3-48ac-4bcd-3983-5dbede859498.jpg',
	},
	{
		id: '2',
		name: 'Nhẫn kim cương trắng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/9cf3cb10-061c-4435-0d25-355db9a59cca.jpg',
	},
	{
		id: '3',
		name: 'Nhẫn kim cương hồng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/221ab07a-63c8-4970-1b47-ef4f907c77d3.jpg',
	},
	{
		id: '4',
		name: 'Nhẫn kim cương đỏ',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/48823b5a-4a37-4b29-ffaf-92c8057991cd.jpg',
	},
	{
		id: '5',
		name: 'Nhẫn kim cương đỏ',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/48823b5a-4a37-4b29-ffaf-92c8057991cd.jpg',
	},
	{
		id: '6',
		name: 'Nhẫn kim cương trắng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/9cf3cb10-061c-4435-0d25-355db9a59cca.jpg',
	},
	{
		id: '7',
		name: 'Nhẫn kim cương trắng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/11f544f3-48ac-4bcd-3983-5dbede859498.jpg',
	},
	{
		id: '8',
		name: 'Nhẫn kim cương đen',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/67b158e0-127c-4e5c-0fbb-87c69924e198.jpg',
	},
];

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(price);
};

const ProductShowcase: React.FC = () => {
	return (
		<section className="max-w-7xl mx-auto px-6 mt-20">
			<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-4 text-center">
				Sản phẩm nhẫn đá quý
			</h3>
			<p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto mb-8 text-center">
				Các mẫu nhẫn đá quý đa dạng về kiểu dáng, màu sắc, phù hợp với mọi phong
				cách và sở thích.
			</p>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto">
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 1 - Diamond ring on black background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/3373d49f-d12b-450e-a8ad-e3af80f163e7.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 2 - Diamond ring on white background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/8ba50a09-d94f-47a3-c169-ae7bc5f51eb1.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 3 - Diamond ring on beige fabric background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/849e66c3-c320-44ec-401a-8713e1576b0d.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 4 - Diamond ring on red fabric background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/764ef52d-b937-43f7-5630-44f1c1433439.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 5 - Diamond ring on dark red fabric background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/f59eec7f-bc1b-4332-4ab5-7b0c011c3799.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 6 - Two diamond rings on white background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/2962a45f-e534-4510-0e12-30c221fe98d6.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 7 - Diamond ring on black background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/d5340e70-7eca-4489-3846-bfcb7cce1af3.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
				<div className="text-xs md:text-sm text-gray-900">
					<img
						alt="Nhẫn kim cương 8 - Diamond ring on blurred light background"
						className="rounded-md mb-1 w-full object-cover"
						height={200}
						src="https://storage.googleapis.com/a1aa/image/c8aa1f79-b3c7-4fa6-7378-4e82f3528109.jpg"
						width={200}
					/>
					<p>Nhẫn kim cương</p>
					<p className="text-[#b87a1a] font-semibold">3.000.000 ₫</p>
				</div>
			</div>
		</section>
	);
};

export default ProductShowcase;
