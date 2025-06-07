import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
	return (
		<footer className="bg-[#3c2f2f] text-[#d9d9d9] text-xs md:text-sm mt-20 py-10 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
			<div>
				<h5 className="font-semibold mb-3">FAKE STORE</h5>
				<p>
					Chuyên cung cấp nhẫn đá quý chất lượng cao, đa dạng mẫu mã và kiểu
					dáng.
				</p>
				<p className="mt-2">Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
				<p>Điện thoại: 0123 456 789</p>
				<p>Email: support@fakestore.vn</p>
			</div>

			<div>
				<h5 className="font-semibold mb-3">VỀ CHÚNG TÔI</h5>
				<ul>
					<li>
						<Link to="/" className="hover:underline">
							Trang chủ
						</Link>
					</li>
					<li>
						<Link to="/products" className="hover:underline">
							Sản phẩm
						</Link>
					</li>
					<li>
						<Link to="/style" className="hover:underline">
							Phong cách
						</Link>
					</li>
					<li>
						<Link to="/system" className="hover:underline">
							Hệ thống
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h5 className="font-semibold mb-3">THÔNG TIN</h5>
				<ul>
					<li>
						<Link to="/support" className="hover:underline">
							Hỗ trợ
						</Link>
					</li>
					<li>
						<Link to="/privacy" className="hover:underline">
							Chính sách bảo mật
						</Link>
					</li>
					<li>
						<Link to="/terms" className="hover:underline">
							Điều khoản sử dụng
						</Link>
					</li>
				</ul>
				<div className="flex space-x-4 mt-4 text-lg">
					<a href="#" aria-label="Facebook" className="hover:text-white">
						<Facebook size={20} />
					</a>
					<a href="#" aria-label="Instagram" className="hover:text-white">
						<Instagram size={20} />
					</a>
					<a href="#" aria-label="Twitter" className="hover:text-white">
						<Twitter size={20} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
