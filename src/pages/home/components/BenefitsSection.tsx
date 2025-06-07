import React from 'react';

const BenefitsSection: React.FC = () => {
	return (
		// <section className="mt-20 grid md:grid-cols-2 gap-10 items-center">
		// 	<img
		// 		alt="Người phụ nữ cầm ly rượu, tay đeo nhẫn đá quý sang trọng"
		// 		className="w-full max-w-sm border border-[#b87a1f] rounded"
		// 		height="400"
		// 		src="https://res.cloudinary.com/dcwdrvxdg/image/upload/v1749317412/6e557fc2-911c-4dfb-9f99-032e579d2435.png"
		// 		width="400"
		// 	/>
		// 	<div>
		// 		<h2 className="text-[#b87a1f] font-semibold text-lg mb-4">
		// 			5 Lợi ích tuyệt vời khi đeo nhẫn đá quý
		// 		</h2>
		// 		<ul className="list-disc list-inside text-xs md:text-sm space-y-2 text-gray-900">
		// 			<li>Tăng sự tự tin và thu hút ánh nhìn</li>
		// 			<li>Mang lại may mắn và tài lộc</li>
		// 			<li>Hỗ trợ sức khỏe và tinh thần</li>
		// 			<li>Thể hiện phong cách riêng biệt</li>
		// 			<li>Giá trị bền vững theo thời gian</li>
		// 		</ul>
		// 	</div>
		// </section>
		<section className="max-w-7xl mx-auto px-6 md:flex md:space-x-12 mt-20">
			<div className="md:w-1/2">
				<img
					alt="Woman wearing a gemstone ring holding a wine glass in a dimly lit setting"
					className="rounded-md object-cover w-full"
					height="400"
					src="https://storage.googleapis.com/a1aa/image/4437b232-8e05-471c-9676-5d4d2fb09304.jpg"
					width="400"
				/>
			</div>
			<div className="md:w-1/2 flex flex-col justify-center mt-8 md:mt-0">
				<h2 className="text-[#b87a1a] font-semibold text-lg mb-4">
					5 Lợi ích tuyệt vời khi đeo nhẫn đá quý
				</h2>
				<ul className="list-disc list-inside text-xs md:text-sm text-gray-700 space-y-2 max-w-md">
					<li>Tăng sự tự tin và thu hút ánh nhìn</li>
					<li>Giúp cân bằng năng lượng cơ thể</li>
					<li>Hỗ trợ phát triển tinh thần và trí tuệ</li>
					<li>Thể hiện gu thẩm mỹ và phong cách riêng</li>
					<li>Giá trị bền vững theo thời gian</li>
				</ul>
			</div>
		</section>
	);
};

export default BenefitsSection;
