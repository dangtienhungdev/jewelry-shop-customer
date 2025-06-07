import { Button } from '@/components/ui/button';
import React from 'react';

const PromotionSection: React.FC = () => {
	return (
		<section className="mt-20 bg-[#fff7e6] py-10 px-6 rounded max-w-7xl mx-auto text-center">
			<h3 className="text-[#b87a1f] font-semibold text-sm md:text-base max-w-3xl mx-auto mb-4">
				Rực rỡ mùa hè, sắm ngay nhẫn đá quý với ưu đãi hấp dẫn!
			</h3>
			<p className="text-xs md:text-sm max-w-3xl mx-auto mb-6">
				Đặt ngay nhẫn đá quý với ưu đãi giảm giá lên đến 50% và nhận quà tặng
				hấp dẫn trong tháng này.
			</p>
			<Button className="text-xs md:text-sm font-semibold py-2 px-8">
				Mua ngay
			</Button>
		</section>
	);
};

export default PromotionSection;
