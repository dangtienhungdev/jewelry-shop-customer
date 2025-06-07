import type { Product } from '@/types/home.type';
import React from 'react';
const products: Product[] = [
	{
		id: '1',
		name: 'Nhẫn kim cương trắng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/9cf3cb10-061c-4435-0d25-355db9a59cca.jpg',
		description: 'Thiết kế tinh tế, phù hợp với mọi dịp đặc biệt.',
	},
	{
		id: '2',
		name: 'Nhẫn hồng ngọc',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/e30422ec-5477-4fbf-09cd-685dafc4b39a.jpg',
		description: 'Mang lại sự may mắn và tình yêu bền vững.',
	},
	{
		id: '3',
		name: 'Nhẫn topaz vàng',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/f72a360b-c305-42f2-5da2-1502d3303a7a.jpg',
		description: 'Thể hiện sự sang trọng và đẳng cấp.',
	},
	{
		id: '4',
		name: 'Nhẫn sapphire',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/21d51ff9-c49f-40bb-6397-727c6f524d85.jpg',
		description: 'Biểu tượng của sự trung thành và trí tuệ.',
	},
	{
		id: '5',
		name: 'Nhẫn kim cương trơn',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/bb1bdb6c-7bbb-498b-15e6-f66249c1946c.jpg',
		description: 'Phong cách đơn giản nhưng không kém phần sang trọng.',
	},
	{
		id: '6',
		name: 'Nhẫn thạch anh đen',
		price: 3000000,
		imageUrl:
			'https://storage.googleapis.com/a1aa/image/a3d5c013-c8cb-4c1d-0bad-8d78b0744738.jpg',
		description: 'Giúp cân bằng năng lượng và bảo vệ chủ nhân.',
	},
];

const formatPrice = (price: number): string => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(price);
};

const ProductGrid: React.FC = () => {
	return (
		<section className="max-w-7xl mx-auto px-6 mt-20">
			<h3 className="text-[#b87a1a] font-semibold text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-10 text-center">
				Tạo phong cách riêng cho bạn với những dòng nhẫn đá quý của chúng tôi.
				<br />
				Chúng tôi cung cấp đa dạng các loại nhẫn đá quý với thiết kế độc đáo,
				phù hợp với mọi sở thích và phong cách.
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn kim cương - A diamond ring with sparkling stones on a white background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/4fa974e5-055b-4e97-de04-6639a278c274.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn kim cương
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn kim cương với thiết kế tinh tế, sang trọng, phù hợp cho các dịp
						đặc biệt.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn ruby - A ruby gemstone ring on a white background with soft shadows"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/6c9d9535-df1c-4816-c988-265d30cffc92.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn ruby
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn ruby nổi bật với màu đỏ rực rỡ, biểu tượng của sự may mắn và
						tình yêu.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn topaz - A topaz gemstone ring on a light gray background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/5cf5ca76-900c-43f8-59fd-fe67fa354c63.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn topaz
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn topaz với thiết kế hiện đại, mang lại vẻ đẹp thanh lịch và tinh
						tế.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn hồng cương - A pink diamond ring on a red fabric background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/8e2a6c5a-dafc-4221-b402-c6111860b2bd.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn hồng cương
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn hồng cương mang vẻ đẹp nữ tính, quyến rũ và sang trọng.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn sapphire - A sapphire gemstone ring on a light blue background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/6d5be8bf-e240-4fa7-965a-fd7162421387.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn sapphire
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn sapphire với màu xanh dương sâu sắc, biểu tượng của sự trung
						thành.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn ngọc trắng - A white jade ring on a white fabric background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/9e9339de-2c79-4e6c-30d9-cc66b8120195.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn ngọc trắng
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn ngọc trắng thanh lịch, mang lại sự tinh khiết và nhẹ nhàng.
					</p>
				</div>
				<div className="border border-[#b87a1a] rounded-md p-4">
					<img
						alt="Nhẫn topaz đen - A black topaz ring on a textured beige background"
						className="rounded-md mb-3 w-full object-cover"
						height={300}
						src="https://storage.googleapis.com/a1aa/image/92558463-da55-411d-fc0f-b873997891e9.jpg"
						width={400}
					/>
					<h4 className="text-[#b87a1a] font-semibold text-sm mb-1">
						Nhẫn topaz đen
					</h4>
					<p className="text-xs text-gray-700">
						Nhẫn topaz đen cá tính, phù hợp với phong cách hiện đại và mạnh mẽ.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ProductGrid;
