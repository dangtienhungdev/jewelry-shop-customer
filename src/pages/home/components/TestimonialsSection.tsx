import type { Testimonial } from '@/types/home.type';
import { Star } from 'lucide-react';
import React from 'react';

const testimonials: Testimonial[] = [
	{
		id: '1',
		name: 'Lan Anh',
		location: 'Hà Nội',
		rating: 5,
		comment: 'Nhẫn đẹp, chất lượng tốt, giao hàng nhanh. Rất hài lòng!',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/488655b0-d38a-4245-e73b-71e230e49769.jpg',
	},
	{
		id: '2',
		name: 'Minh Tuấn',
		location: 'Hồ Chí Minh',
		rating: 5,
		comment: 'Thiết kế nhẫn rất đẹp, đeo rất vừa ý. Sẽ ủng hộ tiếp!',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/a179f016-a580-438f-996b-93987184a128.jpg',
	},
	{
		id: '3',
		name: 'Hương Giang',
		location: 'Đà Nẵng',
		rating: 5,
		comment: 'Dịch vụ khách hàng rất tốt, nhẫn đẹp hơn mong đợi.',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/fb9765ee-62cf-46b4-a95c-c6615ebb2cf1.jpg',
	},
	{
		id: '4',
		name: 'Quang Huy',
		location: 'Hải Phòng',
		rating: 5,
		comment: 'Sản phẩm chất lượng, giá cả hợp lý, rất đáng mua.',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/e7b07fbf-6a55-418b-2227-7967208f9ab5.jpg',
	},
	{
		id: '5',
		name: 'Thu Trang',
		location: 'Cần Thơ',
		rating: 5,
		comment: 'Giao hàng nhanh, nhẫn đẹp, nhân viên tư vấn nhiệt tình.',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/a151ed07-d488-4625-264b-984c84f38143.jpg',
	},
	{
		id: '6',
		name: 'Bảo Anh',
		location: 'Nha Trang',
		rating: 5,
		comment: 'Rất hài lòng với sản phẩm, sẽ giới thiệu bạn bè mua tiếp.',
		avatarUrl:
			'https://storage.googleapis.com/a1aa/image/4b1e6c78-285f-46a9-2f31-46c7efe9ad4c.jpg',
	},
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	return (
		<div className="flex items-center mb-2">
			<div className="text-yellow-400 flex space-x-1">
				{[...Array(rating)].map((_, i) => (
					<Star key={i} size={16} fill="currentColor" />
				))}
			</div>
		</div>
	);
};

const TestimonialsSection: React.FC = () => {
	return (
		<section className="mt-20 max-w-7xl mx-auto px-6 text-center">
			<h3 className="text-[#b87a1f] font-semibold text-sm md:text-base mb-4 max-w-3xl mx-auto">
				Đăng giá thực tế từ khách hàng thân thiết của chúng tôi
			</h3>
			<p className="text-xs md:text-sm text-gray-900 max-w-3xl mx-auto mb-10">
				Đăng tải những phản hồi chân thực nhất từ khách hàng đã trải nghiệm sản
				phẩm nhẫn đá quý của chúng tôi.
			</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-xs md:text-sm text-gray-900">
				{testimonials.map((testimonial) => (
					<div
						key={testimonial.id}
						className="bg-[#fff7e6] p-4 rounded border border-[#b87a1f] text-left"
					>
						<StarRating rating={testimonial.rating} />
						<p className="mb-2">{testimonial.comment}</p>
						<div className="flex items-center space-x-3">
							<img
								alt={`Ảnh đại diện ${testimonial.name}`}
								className="rounded-full"
								height="40"
								src={testimonial.avatarUrl}
								width="40"
							/>
							<div>
								<p className="font-semibold">{testimonial.name}</p>
								<p className="text-xs text-gray-700">{testimonial.location}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TestimonialsSection;
