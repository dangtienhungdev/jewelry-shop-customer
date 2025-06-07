import { Calendar, Headphones, RotateCcw } from 'lucide-react';
import React from 'react';

const GuaranteeSection: React.FC = () => {
	return (
		<section className="mt-20 max-w-7xl mx-auto px-6 text-gray-900">
			<h3 className="text-[#b87a1f] font-semibold text-sm md:text-base mb-6 max-w-3xl mx-auto text-center">
				Cam kết hoàn trả tiền 100% khi khách hàng không hài lòng với sản phẩm
				nhẫn đá quý của chúng tôi!
			</h3>
			<p className="text-xs md:text-sm max-w-4xl mx-auto mb-10 text-center">
				Chúng tôi cam kết hoàn trả 100% tiền nếu sản phẩm không đạt chất lượng
				hoặc không đúng như mô tả. Đảm bảo quyền lợi khách hàng là trên hết.
			</p>
			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs md:text-sm bg-[#fff7e6] rounded p-6">
				<div className="flex flex-col items-center text-center space-y-2">
					<RotateCcw className="text-[#b87a1f] text-3xl" size={48} />
					<h4 className="font-semibold">100% Hoàn tiền</h4>
					<p>Hoàn tiền nếu sản phẩm không đúng mô tả hoặc lỗi kỹ thuật.</p>
				</div>
				<div className="flex flex-col items-center text-center space-y-2">
					<Calendar className="text-[#b87a1f] text-3xl" size={48} />
					<h4 className="font-semibold">30 ngày đổi trả</h4>
					<p>Đổi trả sản phẩm trong vòng 30 ngày nếu không hài lòng.</p>
				</div>
				<div className="flex flex-col items-center text-center space-y-2">
					<Headphones className="text-[#b87a1f] text-3xl" size={48} />
					<h4 className="font-semibold">Hỗ trợ đổi trả</h4>
					<p>Hỗ trợ khách hàng đổi trả nhanh chóng và thuận tiện.</p>
				</div>
			</div>
		</section>
	);
};

export default GuaranteeSection;
