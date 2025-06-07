import type { Feature } from '@/types/home.type';
import { Gem, Heart, Shield, Star } from 'lucide-react';
import React from 'react';

const features: Feature[] = [
	{
		id: '1',
		title: 'Hợp phong thủy mang may mắn',
		description:
			'Nhẫn đá quý được chọn lựa kỹ càng theo mệnh, giúp thu hút tài lộc và bình an.',
		icon: 'gem',
	},
	{
		id: '2',
		title: 'Hàng chất lượng cao, bền đẹp',
		description:
			'Chất liệu đá quý và kim loại quý được xử lý tỉ mỉ, đảm bảo độ bền và sáng bóng lâu dài.',
		icon: 'shield',
	},
	{
		id: '3',
		title: 'Đa dạng về kiểu dáng và mẫu mã',
		description:
			'Thiết kế phong phú, phù hợp với nhiều phong cách và sở thích khác nhau.',
		icon: 'star',
	},
	{
		id: '4',
		title: 'Tăng cường giá trị tinh thần',
		description:
			'Nhẫn đá quý không chỉ là trang sức mà còn là món quà ý nghĩa, lưu giữ kỷ niệm.',
		icon: 'heart',
	},
];

const getIcon = (iconName: string) => {
	const iconProps = { className: 'text-[#b87a1f] mb-2 text-xl', size: 24 };

	switch (iconName) {
		case 'gem':
			return <Gem {...iconProps} />;
		case 'shield':
			return <Shield {...iconProps} />;
		case 'star':
			return <Star {...iconProps} />;
		case 'heart':
			return <Heart {...iconProps} />;
		default:
			return <Gem {...iconProps} />;
	}
};

const FeaturesSection: React.FC = () => {
	return (
		<section className="mt-20 bg-[#fff7e6] py-10 px-6 rounded max-w-7xl mx-auto">
			<h3 className="text-center text-[#b87a1f] font-semibold text-sm md:text-base mb-8">
				Ưu điểm nổi bật của nhẫn đá quý
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto text-xs md:text-sm text-gray-900">
				{features.map((feature) => (
					<div
						key={feature.id}
						className="border border-[#b87a1f] rounded-tl-3xl rounded-tr-3xl rounded-br-3xl rounded-bl-3xl p-4 flex flex-col items-center text-center"
					>
						{getIcon(feature.icon)}
						<h4 className="font-semibold mb-1">{feature.title}</h4>
						<p>{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturesSection;
