import { MainLayout } from '@/layouts';
import React, { useState } from 'react';

const ThongTinPage: React.FC = () => {
	const [activeTab, setActiveTab] = useState('size-guide');

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const chainPrices = [
		{
			type: 'Mặt xích nhỏ',
			prices: {
				'40cm': 140000,
				'45cm': 180000,
				'50cm': 220000,
				'55cm': null,
			},
		},
		{
			type: 'Mặt xích trung',
			prices: {
				'40cm': 180000,
				'45cm': 220000,
				'50cm': 260000,
				'55cm': null,
			},
		},
		{
			type: 'Mặt xích lớn',
			prices: {
				'40cm': 220000,
				'45cm': 260000,
				'50cm': 300000,
				'55cm': 340000,
			},
		},
	];

	const tabs = [
		{
			id: 'size-guide',
			title: 'Hướng dẫn đo Size',
			icon: 'fas fa-ruler',
		},
		{
			id: 'care-guide',
			title: 'Hướng dẫn bảo quản sản phẩm',
			icon: 'fas fa-shield-alt',
		},
		{
			id: 'shipping',
			title: 'Giao hàng & đổi hàng',
			icon: 'fas fa-shipping-fast',
		},
	];

	const renderSizeGuide = () => (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-gray-900 mb-4">
					Cách đo kích cỡ tay đeo trang sức
				</h1>
			</div>

			<div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
				<p className="mb-4">
					Chắc rằng các bạn đã nhiều lần gặp khó khăn khi nhẫn và vòng tay có
					quá nhiều cỡ với số đo đa dạng, bạn không biết tay mình là số mấy mới
					vừa? Từ giờ bạn không phải bâng khoản nữa, vì Fayra Jewelry sẽ mách
					bạn những cách đo nhẫn cực kỳ dễ và hiệu quả nhé. Có hai cách rất đơn
					giản để biết được size nhẫn và vòng của bạn.
				</p>

				<div className="bg-[#4a3c3c] text-white p-6 rounded-lg mb-6">
					<h3 className="text-lg font-semibold mb-4 text-[#b77900]">
						Cách thứ nhất: Nếu bạn có sẵn chiếc nhẫn hoặc vòng tay
					</h3>
					<div className="space-y-2 text-sm">
						<p>
							<strong>Bước 1:</strong> Dùng thước đặt ngang ở giữa nhẫn của bạn
							để đo đường kính, nhớ đo khoảng cách lòng bên trong của nhẫn.
						</p>
						<p>
							<strong>Bước 2:</strong> Gửi Fayra Jewelry số đo theo đơn vị cm
							nhé (centi mét).
						</p>
					</div>
				</div>

				<div className="text-center mb-6">
					<img
						alt="Hình minh họa cách đo nhẫn với đường kính bên trong và chu vi nhẫn"
						className="mx-auto rounded-lg shadow-md max-w-full h-auto"
						src="https://storage.googleapis.com/a1aa/image/9fdafdab-5181-4b74-604e-cc24753b1c25.jpg"
						style={{ maxHeight: '300px' }}
					/>
				</div>

				<div className="bg-[#4a3c3c] text-white p-6 rounded-lg mb-6">
					<h3 className="text-lg font-semibold mb-4 text-[#b77900]">
						Cách thứ hai: Đo bằng sợi chỉ
					</h3>
					<div className="space-y-2 text-sm">
						<p>
							<strong>Bước 1:</strong> Dùng một sợi chỉ, quấn quanh ngón tay/cổ
							tay bạn muốn đo, làm dấu lại.
						</p>
						<p>
							<strong>Bước 2:</strong> Đo chiều dài sợi chỉ, chiều dài đó là chu
							vi của ngón tay/cổ tay bạn. Đối với cổ tay các bạn nhớ trừ hao,
							nói lỏng ra nhen.
						</p>
						<p>
							<strong>Bước 3:</strong> Gửi số đo cho Fayra Jewelry với đơn vị là
							cm nhé (centi mét).
						</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-6 mb-6">
					<div className="text-center">
						<img
							alt="Hình minh họa cách đo tay với 3 bước quấn sợi chỉ quanh ngón tay và đo chiều dài sợi chỉ với thước"
							className="mx-auto rounded-lg shadow-md w-full h-auto"
							src="https://storage.googleapis.com/a1aa/image/76ac58b3-257b-40d3-8aa9-ba4067a9026c.jpg"
							style={{ maxHeight: '250px' }}
						/>
						<p className="text-sm text-gray-600 mt-2">Cách đo ngón tay</p>
					</div>
					<div className="text-center">
						<img
							alt="Hình minh họa cách đo cổ tay với 3 bước quấn sợi chỉ quanh cổ tay và đo chiều dài sợi chỉ với thước"
							className="mx-auto rounded-lg shadow-md w-full h-auto"
							src="https://storage.googleapis.com/a1aa/image/dec4df52-1b15-4f36-253b-c083b5e98bcf.jpg"
							style={{ maxHeight: '250px' }}
						/>
						<p className="text-sm text-gray-600 mt-2">Cách đo cổ tay</p>
					</div>
				</div>

				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
					<div className="flex items-start gap-3">
						<i className="fas fa-exclamation-triangle text-yellow-600 text-lg mt-1"></i>
						<div className="text-sm text-yellow-800">
							<p className="font-semibold mb-2">Lưu ý quan trọng:</p>
							<p>
								Các bạn nên đo khớt đốt ngón tay trước bằng ngón tay, chu vi của
								phần nào lớn hơn bạn sẽ lấy số chu vi đó làm size nhẫn. Vì nhẫn
								phải lọt qua khớp đốt ngón tay mới vào được tới bụng ngón tay
								được nè :D. Nếu khớp đốt ngón tay to hơn bụng ngón tay mà size
								nhận bạn chọn lại là bụng ngón tay thì nhẫn sẽ không bao giờ lọt
								vào trong bụng ngón tay được nhé.
							</p>
						</div>
					</div>
				</div>

				<div className="mb-6">
					<h3 className="text-xl font-semibold text-gray-900 mb-4">
						Bảng giá dây chuyền
					</h3>
					<p className="text-sm text-gray-600 mb-4">
						Dây chuyền bạc của Fayra có nhiều độ dài và kích cỡ khác nhau phù
						hợp với nhiều loại mặt dây và độ dài mong muốn. Được kết bằng bạc
						chất lượng cao đủ tiêu chuẩn 925. Giá niêm yết theo bảng sau:
					</p>

					<div className="text-center mb-4">
						<img
							alt="Hình minh họa hướng dẫn độ dài dây chuyền với hình bóng nam nữ và các độ dài dây chuyền tương ứng"
							className="mx-auto rounded-lg shadow-md max-w-full h-auto"
							src="https://storage.googleapis.com/a1aa/image/074bb1cd-e6ba-43ac-101d-1c986a9864a4.jpg"
							style={{ maxHeight: '300px' }}
						/>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full border border-[#d9b87a] border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
							<thead>
								<tr className="bg-[#4a3c3c] text-white">
									<th className="border border-[#d9b87a] p-3 text-left font-semibold">
										Loại mặt xích
									</th>
									<th className="border border-[#d9b87a] p-3 text-center font-semibold">
										Dài 40 cm
									</th>
									<th className="border border-[#d9b87a] p-3 text-center font-semibold">
										Dài 45 cm
									</th>
									<th className="border border-[#d9b87a] p-3 text-center font-semibold">
										Dài 50 cm
									</th>
									<th className="border border-[#d9b87a] p-3 text-center font-semibold">
										Dài 55 cm
									</th>
								</tr>
							</thead>
							<tbody>
								{chainPrices.map((item, index) => (
									<tr
										key={index}
										className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
									>
										<td className="border border-[#d9b87a] p-3 font-semibold text-gray-900">
											{item.type}
										</td>
										<td className="border border-[#d9b87a] p-3 text-center">
											{item.prices['40cm']
												? formatPrice(item.prices['40cm'])
												: 'Không có'}
										</td>
										<td className="border border-[#d9b87a] p-3 text-center">
											{item.prices['45cm']
												? formatPrice(item.prices['45cm'])
												: 'Không có'}
										</td>
										<td className="border border-[#d9b87a] p-3 text-center">
											{item.prices['50cm']
												? formatPrice(item.prices['50cm'])
												: 'Không có'}
										</td>
										<td className="border border-[#d9b87a] p-3 text-center">
											{item.prices['55cm']
												? formatPrice(item.prices['55cm'])
												: 'Không có'}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);

	const renderCareGuide = () => (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-gray-900 mb-4">
					Hướng dẫn bảo quản sản phẩm
				</h1>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="bg-[#4a3c3c] text-white p-6 rounded-lg">
					<h3 className="text-lg font-semibold mb-4 text-[#b77900] flex items-center gap-2">
						<i className="fas fa-gem"></i>
						Bảo quản trang sức bạc
					</h3>
					<ul className="space-y-2 text-sm">
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Tránh tiếp xúc với nước, mỹ phẩm, nước hoa</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Bảo quản trong hộp kín, tránh ẩm ướt</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Lau chùi nhẹ nhàng bằng khăn mềm</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Tháo ra khi tắm, bơi lội</span>
						</li>
					</ul>
				</div>

				<div className="bg-[#4a3c3c] text-white p-6 rounded-lg">
					<h3 className="text-lg font-semibold mb-4 text-[#b77900] flex items-center gap-2">
						<i className="fas fa-ring"></i>
						Bảo quản trang sức vàng
					</h3>
					<ul className="space-y-2 text-sm">
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Tránh va đập mạnh, trầy xước</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Không đeo khi làm việc nặng</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Vệ sinh định kỳ tại cửa hàng</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-check text-[#b77900] mt-1"></i>
							<span>Bảo quản riêng biệt từng món</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);

	const renderShippingInfo = () => (
		<div className="space-y-6">
			<div className="text-center">
				<h1 className="text-2xl font-semibold text-gray-900 mb-4">
					Giao hàng & đổi hàng
				</h1>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="bg-green-50 border border-green-200 p-6 rounded-lg">
					<h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center gap-2">
						<i className="fas fa-shipping-fast text-green-600"></i>
						Chính sách giao hàng
					</h3>
					<ul className="space-y-3 text-sm text-green-700">
						<li className="flex items-start gap-2">
							<i className="fas fa-clock text-green-600 mt-1"></i>
							<span>Giao hàng trong 1-3 ngày làm việc</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-map-marker-alt text-green-600 mt-1"></i>
							<span>Miễn phí giao hàng nội thành TP.HCM</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-money-bill text-green-600 mt-1"></i>
							<span>Thanh toán khi nhận hàng (COD)</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-shield-alt text-green-600 mt-1"></i>
							<span>Đóng gói cẩn thận, bảo đảm an toàn</span>
						</li>
					</ul>
				</div>

				<div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
					<h3 className="text-lg font-semibold mb-4 text-blue-800 flex items-center gap-2">
						<i className="fas fa-exchange-alt text-blue-600"></i>
						Chính sách đổi hàng
					</h3>
					<ul className="space-y-3 text-sm text-blue-700">
						<li className="flex items-start gap-2">
							<i className="fas fa-calendar text-blue-600 mt-1"></i>
							<span>Đổi hàng trong vòng 7 ngày</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-tag text-blue-600 mt-1"></i>
							<span>Sản phẩm còn nguyên tem, nhãn mác</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-box text-blue-600 mt-1"></i>
							<span>Còn nguyên hộp đựng ban đầu</span>
						</li>
						<li className="flex items-start gap-2">
							<i className="fas fa-receipt text-blue-600 mt-1"></i>
							<span>Có hóa đơn mua hàng</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);

	const renderContent = () => {
		switch (activeTab) {
			case 'size-guide':
				return renderSizeGuide();
			case 'care-guide':
				return renderCareGuide();
			case 'shipping':
				return renderShippingInfo();
			default:
				return renderSizeGuide();
		}
	};

	return (
		<MainLayout>
			<div className="mx-auto py-8">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
					<i className="fas fa-home"></i>
					<a href="/" className="hover:text-[#b77900] transition-colors">
						Trang chủ
					</a>
					<i className="fas fa-chevron-right text-xs"></i>
					<span className="text-gray-900 font-medium">Thông tin</span>
				</nav>

				<div className="bg-white border border-[#d9b87a] rounded-lg overflow-hidden shadow-lg">
					<div className="flex flex-col lg:flex-row">
						{/* Sidebar Navigation */}
						<nav className="w-full lg:w-64 bg-gray-50 border-r border-[#d9b87a] p-6">
							<ul className="space-y-2">
								{tabs.map((tab) => (
									<li key={tab.id}>
										<button
											onClick={() => setActiveTab(tab.id)}
											className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${
												activeTab === tab.id
													? 'bg-[#4a3c3c] text-white'
													: 'text-gray-700 hover:bg-gray-200'
											}`}
										>
											<i className={`${tab.icon} text-sm`}></i>
											{tab.title}
										</button>
									</li>
								))}
							</ul>
						</nav>

						{/* Main Content */}
						<main className="flex-1 p-6 lg:p-8">{renderContent()}</main>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ThongTinPage;
