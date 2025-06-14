import { Menu, ShoppingCart, User } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
	const navigate = useNavigate();

	// navigate page cart
	const handleCartClick = () => {
		navigate('/cart');
	};

	return (
		<header
			className={`flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full ${className}`}
		>
			<div className="text-sm font-normal">
				<Link to="/" className="hover:text-gray-900 transition-colors">
					Logo
				</Link>
			</div>

			<nav className="hidden md:flex space-x-10 text-sm font-normal text-gray-700">
				<Link to="/" className="hover:text-gray-900 transition-colors">
					TRANG CHỦ
				</Link>
				<Link to="/products" className="hover:text-gray-900 transition-colors">
					SẢN PHẨM
				</Link>
				<Link to="/style" className="hover:text-gray-900 transition-colors">
					PHONG CÁCH
				</Link>
				<Link to="/system" className="hover:text-gray-900 transition-colors">
					HỆ THỐNG
				</Link>
			</nav>

			<div className="flex space-x-6 text-gray-900 text-lg">
				<button
					className="hover:text-gray-600 transition-colors cursor-pointer"
					aria-label="Giỏ hàng"
					onClick={handleCartClick}
				>
					<ShoppingCart size={20} />
				</button>
				<button
					className="hover:text-gray-600 transition-colors cursor-pointer"
					aria-label="Tài khoản"
				>
					<User size={20} />
				</button>
				<button
					className="md:hidden hover:text-gray-600 transition-colors"
					aria-label="Menu"
				>
					<Menu size={20} />
				</button>
			</div>
		</header>
	);
};

export default Header;
