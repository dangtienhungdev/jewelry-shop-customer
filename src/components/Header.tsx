import { useLogout } from '@/apis/auth';
import { useCart } from '@/apis/cart';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import {
	LogOut,
	Menu,
	Package,
	ShoppingCart,
	User,
	UserCircle,
} from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
	const navigate = useNavigate();
	const { isAuthenticated, user, refreshToken } = useAuth();

	// Hook để lấy giỏ hàng
	const { data: cart, isLoading: isCartLoading } = useCart();

	// Hook để đăng xuất
	const logoutMutation = useLogout({
		onSuccess: () => {
			toast.success('Đăng xuất thành công!');
			navigate('/');
		},
		onError: () => {
			toast.error('Đăng xuất thất bại!');
		},
	});

	// Navigate page cart
	const handleCartClick = () => {
		navigate('/cart');
	};

	// Navigate to login
	const handleLoginClick = () => {
		navigate('/login');
	};

	// Handle logout
	const handleLogout = () => {
		if (refreshToken) {
			logoutMutation.mutate({ refreshToken });
		} else {
			// Nếu không có refresh token, chỉ clear local state
			toast.success('Đăng xuất thành công!');
			navigate('/');
		}
	};

	// Tính tổng số lượng sản phẩm trong giỏ hàng
	const cartItemCount =
		isAuthenticated && cart && !isCartLoading ? cart.totalItems || 0 : 0;

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
				<Link to="/thong-tin" className="hover:text-gray-900 transition-colors">
					PHONG CÁCH
				</Link>
				<Link to="/system" className="hover:text-gray-900 transition-colors">
					HỆ THỐNG
				</Link>
			</nav>

			<div className="flex space-x-6 text-gray-900 text-lg items-center">
				{/* Cart Icon with Badge */}
				<div className="relative">
					<button
						className="hover:text-gray-600 transition-colors cursor-pointer"
						aria-label="Giỏ hàng"
						onClick={handleCartClick}
					>
						<ShoppingCart size={20} />
					</button>
					{cartItemCount > 0 && (
						<Badge
							variant="destructive"
							className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-red-500 text-white rounded-full"
						>
							{cartItemCount > 99 ? '99+' : cartItemCount}
						</Badge>
					)}
				</div>

				{/* User Authentication Area */}
				{isAuthenticated ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className="hover:text-gray-600 transition-colors cursor-pointer"
								aria-label="Tài khoản"
							>
								<User size={20} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										{user?.fullName || 'Người dùng'}
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										{user?.email}
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => navigate('/profile')}
							>
								<UserCircle className="mr-2 h-4 w-4" />
								<span>Thông tin cá nhân</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => navigate('/orders')}
							>
								<Package className="mr-2 h-4 w-4" />
								<span>Đơn hàng của tôi</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="cursor-pointer text-red-600 focus:text-red-600"
								onClick={handleLogout}
								disabled={logoutMutation.isPending}
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>
									{logoutMutation.isPending ? 'Đang đăng xuất...' : 'Đăng xuất'}
								</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<button
						className="text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer"
						onClick={handleLoginClick}
					>
						Đăng nhập
					</button>
				)}

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
