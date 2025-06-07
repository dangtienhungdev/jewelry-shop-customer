import { Button } from '@/components/ui/button';
import type { ContactForm } from '@/types/home.type';
import React, { useState } from 'react';

const ContactSection: React.FC = () => {
	const [formData, setFormData] = useState<ContactForm>({
		name: '',
		email: '',
		address: '',
		product: 'Nhẫn kim cương trắng',
		note: '',
	});

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<section className="mt-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
			<div className="text-xs md:text-sm text-gray-900 max-w-md mx-auto">
				<h4 className="font-semibold mb-3">Liên hệ với chúng tôi</h4>
				<p className="mb-2">
					Quý khách có thể liên hệ với chúng tôi qua các kênh sau để được tư vấn
					và hỗ trợ nhanh nhất.
				</p>
				<ul className="list-disc list-inside space-y-1">
					<li>Điện thoại: 0123 456 789</li>
					<li>Email: support@fakestore.vn</li>
					<li>Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</li>
				</ul>
			</div>

			<form className="bg-[#fff7e6] p-6 rounded mx-auto text-xs md:text-sm text-gray-900 w-full">
				<div className="mb-3">
					<label className="block mb-1 font-semibold" htmlFor="name">
						Họ và tên
					</label>
					<input
						className="w-full border border-[#b87a1f] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b87a1f]"
						id="name"
						name="name"
						required
						type="text"
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>

				<div className="mb-3">
					<label className="block mb-1 font-semibold" htmlFor="email">
						Email / Số điện thoại
					</label>
					<input
						className="w-full border border-[#b87a1f] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b87a1f]"
						id="email"
						name="email"
						required
						type="text"
						value={formData.email}
						onChange={handleInputChange}
					/>
				</div>

				<div className="mb-3">
					<label className="block mb-1 font-semibold" htmlFor="address">
						Địa chỉ
					</label>
					<input
						className="w-full border border-[#b87a1f] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b87a1f]"
						id="address"
						name="address"
						required
						type="text"
						value={formData.address}
						onChange={handleInputChange}
					/>
				</div>

				<div className="mb-3">
					<label className="block mb-1 font-semibold" htmlFor="product">
						Sản phẩm quan tâm
					</label>
					<select
						className="w-full border border-[#b87a1f] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b87a1f]"
						id="product"
						name="product"
						value={formData.product}
						onChange={handleInputChange}
					>
						<option>Nhẫn kim cương trắng</option>
						<option>Nhẫn hồng ngọc</option>
						<option>Nhẫn topaz vàng</option>
						<option>Nhẫn sapphire</option>
						<option>Nhẫn thạch anh đen</option>
					</select>
				</div>

				<div className="mb-3">
					<label className="block mb-1 font-semibold" htmlFor="note">
						Ghi chú
					</label>
					<textarea
						className="w-full border border-[#b87a1f] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b87a1f]"
						id="note"
						name="note"
						rows={3}
						value={formData.note}
						onChange={handleInputChange}
					/>
				</div>

				<Button type="submit" className="w-full font-semibold py-2">
					Gửi liên hệ
				</Button>
			</form>
		</section>
	);
};

export default ContactSection;
