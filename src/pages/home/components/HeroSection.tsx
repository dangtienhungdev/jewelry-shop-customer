import { Button } from '@/components/ui/button';
import React from 'react';

const HeroSection: React.FC = () => {
	return (
		<section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 min-h-[500px] ">
			<div className="flex flex-col justify-center max-w-xl">
				<h1 className="text-2xl md:text-3xl font-semibold text-[#b87a1f] mb-2">
					Nhẫn đá quý -{' '}
					<span className="text-black">Sang trọng và đẳng cấp</span>
				</h1>
				<p className="text-xs md:text-sm text-gray-900 mb-6 leading-tight">
					Trong thị trường đá quý hiện nay, nhẫn đá quý là một trong những sản
					phẩm được ưa chuộng nhất. Với thiết kế tinh tế và chất liệu cao cấp,
					nhẫn đá quý mang lại vẻ đẹp sang trọng và đẳng cấp cho người đeo.
				</p>
				<Button
					variant="outline"
					className="w-max text-xs md:text-sm font-semibold py-2 px-6"
				>
					Xem chi tiết
				</Button>
			</div>

			<div
				className="bg-transparent rounded overflow-hidden"
				style={{
					aspectRatio: '16/9',
					width: '100%',
					height: '100%',
					objectFit: 'contain',
					backgroundImage:
						'url(https://res.cloudinary.com/dcwdrvxdg/image/upload/v1749317412/6e557fc2-911c-4dfb-9f99-032e579d2435.png)',
					backgroundSize: 'cover',
					backgroundPosition: 'right',
					backgroundRepeat: 'no-repeat',
				}}
			>
				{/* <img
					alt="Cận cảnh nhẫn đá quý vàng với kim cương lấp lánh trên nền gỗ tối"
					className="w-full h-full object-contain"
					src="https://themesflat.co/html/vemus/images/slider/slider-12.jpg"
				/> */}
			</div>
		</section>
	);
};

export default HeroSection;
