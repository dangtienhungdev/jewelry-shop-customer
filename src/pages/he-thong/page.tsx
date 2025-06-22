import { MapPin, Phone, ScrollText, Store, Users } from 'lucide-react';

import { MainLayout } from '@/layouts';
import React from 'react';

const SystemPage: React.FC = () => {
	// Dữ liệu cửa hàng mẫu
	const stores = [
		{
			id: 1,
			name: 'FAYRA STORE',
			address:
				'Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM',
			phone: '0989898989',
			image:
				'https://storage.googleapis.com/a1aa/image/062d2e5b-bcf1-472e-bc6d-bbc82f21f846.jpg',
		},
		{
			id: 2,
			name: 'FAYRA STORE',
			address:
				'Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM',
			phone: '0989898989',
			image:
				'https://storage.googleapis.com/a1aa/image/062d2e5b-bcf1-472e-bc6d-bbc82f21f846.jpg',
		},
		{
			id: 3,
			name: 'FAYRA STORE',
			address:
				'Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM',
			phone: '0989898989',
			image:
				'https://storage.googleapis.com/a1aa/image/062d2e5b-bcf1-472e-bc6d-bbc82f21f846.jpg',
		},
		{
			id: 4,
			name: 'FAYRA STORE',
			address:
				'Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM',
			phone: '0989898989',
			image:
				'https://storage.googleapis.com/a1aa/image/062d2e5b-bcf1-472e-bc6d-bbc82f21f846.jpg',
		},
		{
			id: 5,
			name: 'FAYRA STORE',
			address:
				'Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM',
			phone: '0989898989',
			image:
				'https://storage.googleapis.com/a1aa/image/062d2e5b-bcf1-472e-bc6d-bbc82f21f846.jpg',
		},
	];

	return (
		<MainLayout>
			{/* Hero Section */}
			<section className="relative">
				<img
					src="https://res.cloudinary.com/dcwdrvxdg/image/upload/v1749659045/image_1_ee0h3r.png"
					alt="Wooden table surface with multiple silver rings arranged and a wooden vase with white flowers"
					className="w-full h-48 md:h-64 object-cover"
				/>
				{/* <div className="absolute inset-0 bg-black bg-opacity-20"></div> */}
			</section>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#fff7f7]">
				{/* Navigation Cards */}
				<section className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10 mb-16">
					<div className="flex flex-col items-center justify-center border border-gray-300 bg-white w-36 h-36 p-4 hover:shadow-lg transition-shadow cursor-pointer">
						<ScrollText className="text-[#1a3a57] text-3xl mb-3" size={32} />
						<p className="text-center text-xs leading-tight text-black">
							Câu chuyện về
							<br />
							chúng tôi
						</p>
					</div>
					<div className="flex flex-col items-center justify-center border border-gray-300 bg-white w-36 h-36 p-4 hover:shadow-lg transition-shadow cursor-pointer bg-[#f0f8ff]">
						<Store className="text-[#1a3a57] text-3xl mb-3" size={32} />
						<p className="text-center text-xs leading-tight text-black font-medium">
							Hệ thống nhà
							<br />
							hàng
						</p>
					</div>
					<div className="flex flex-col items-center justify-center border border-gray-300 bg-white w-36 h-36 p-4 hover:shadow-lg transition-shadow cursor-pointer">
						<Users className="text-[#1a3a57] text-3xl mb-3" size={32} />
						<p className="text-center text-xs leading-tight text-black">
							Khách hàng của
							<br />
							chúng tôi
						</p>
					</div>
				</section>

				{/* Store List */}
				<section className="space-y-8">
					<h2 className="text-2xl font-semibold text-center text-[#1a3a57] mb-8">
						Hệ Thống Cửa Hàng FAYRA
					</h2>

					<div className="space-y-6">
						{stores.map((store) => (
							<div
								key={store.id}
								className="flex gap-6 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
							>
								<img
									src={store.image}
									alt="Store interior"
									className="w-[120px] h-[100px] object-cover flex-shrink-0 rounded-md"
								/>
								<div className="flex-1">
									<h3 className="text-sm font-medium border-b border-[#d43f4e] inline-block pb-1 mb-2 text-[#1a3a57]">
										{store.name}
									</h3>
									<div className="flex items-start gap-2 mb-2">
										<MapPin className="text-gray-500 mt-0.5" size={12} />
										<p className="text-xs leading-tight text-gray-700">
											{store.address}
										</p>
									</div>
									<div className="flex items-center gap-2 mb-3">
										<Phone className="text-gray-500" size={12} />
										<p className="text-xs font-medium text-gray-600">
											Hotline: {store.phone}
										</p>
									</div>
									<button
										className="bg-[#d43f4e] hover:bg-[#b8374a] text-white text-xs px-4 py-2 rounded-md transition-colors flex items-center gap-2"
										type="button"
									>
										<MapPin size={12} />
										Đường đi
									</button>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* Contact Info */}
				<section className="mt-16 bg-white p-8 rounded-lg shadow-sm">
					<h3 className="text-lg font-semibold text-[#1a3a57] mb-6 text-center">
						Thông Tin Liên Hệ
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div>
							<h4 className="font-medium text-gray-800 mb-3">Địa chỉ chính</h4>
							<p className="text-sm text-gray-600 mb-2">
								Lô 3, Tầng 6 Tòa Nhà Genpacific, Đường Số 16, Công Viên Phần Mềm
								Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM
							</p>
							<p className="text-sm text-gray-600 mb-1">
								<strong>Email:</strong> fayracontact@fayra.com
							</p>
							<p className="text-sm text-gray-600">
								<strong>Điện thoại:</strong> (024) 888 888
							</p>
						</div>
						<div>
							<h4 className="font-medium text-gray-800 mb-3">Giờ làm việc</h4>
							<p className="text-sm text-gray-600 mb-1">
								<strong>Thứ 2 - Thứ 6:</strong> 8:00 - 22:00
							</p>
							<p className="text-sm text-gray-600 mb-1">
								<strong>Thứ 7 - Chủ nhật:</strong> 9:00 - 21:00
							</p>
							<p className="text-sm text-gray-600">
								<strong>Ngày lễ:</strong> 10:00 - 20:00
							</p>
						</div>
					</div>
				</section>
			</main>
		</MainLayout>
	);
};

export default SystemPage;
