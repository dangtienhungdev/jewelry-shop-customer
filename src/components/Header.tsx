import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import {
	LogOut,
	Menu,
	Package,
	Search,
	ShoppingCart,
	User,
	UserCircle,
	X,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types/product.type';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/apis/cart';
import { useSearchProducts } from '@/apis/products';

interface HeaderProps {
	className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
	const navigate = useNavigate();
	const { isAuthenticated, user, logout } = useAuth();

	// Search states
	const [searchQuery, setSearchQuery] = useState('');
	const [showSearchResults, setShowSearchResults] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);

	// Hook để lấy giỏ hàng
	const { data: cart, isLoading: isCartLoading } = useCart();

	// Hook để tìm kiếm sản phẩm
	const { data: searchResults, isLoading: isSearchLoading } = useSearchProducts(
		{
			search: searchQuery,
			limit: 5,
		}
	);

	// Handle click outside to close search results
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setShowSearchResults(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Navigate page cart
	const handleCartClick = () => {
		navigate('/cart');
	};

	// Navigate to login
	const handleLoginClick = () => {
		navigate('/login');
	};

	// Handle logout - sử dụng method từ AuthContext
	const handleLogout = () => {
		logout(); // Sử dụng method từ AuthContext
		toast.success('Đăng xuất thành công!');
		navigate('/login');
	};

	// Handle search input change
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchQuery(value);
		setShowSearchResults(value.length > 2);
	};

	// Handle search submit
	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
			setShowSearchResults(false);
			setSearchQuery('');
		}
	};

	// Handle product click
	const handleProductClick = (productId: string) => {
		navigate(`/product-detail/${productId}`);
		setShowSearchResults(false);
		setSearchQuery('');
	};

	// Clear search
	const handleClearSearch = () => {
		setSearchQuery('');
		setShowSearchResults(false);
	};

	// Tính tổng số lượng sản phẩm trong giỏ hàng
	const cartItemCount =
		isAuthenticated && cart && !isCartLoading ? cart.totalItems || 0 : 0;

	// Get search data safely
	const searchData = searchResults?.data;
	const searchItems = searchData?.items || [];
	const searchTotal = searchData?.total || 0;
	const searchTotalPages = searchData?.totalPages || 0;

	return (
		<header
			className={`flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full ${className}`}
		>
			<div className="text-sm font-normal">
				<Link to="/" className="hover:text-gray-900 transition-colors">
					Logo
				</Link>
			</div>

			<nav className="hidden lg:flex space-x-10 text-sm font-normal text-gray-700">
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

			{/* Search Section */}
			<div className="hidden md:block flex-1 max-w-md mx-8" ref={searchRef}>
				<form onSubmit={handleSearchSubmit} className="relative">
					<div className="relative">
						<Input
							type="text"
							placeholder="Tìm kiếm sản phẩm..."
							value={searchQuery}
							onChange={handleSearchChange}
							onFocus={() =>
								searchQuery.length > 2 && setShowSearchResults(true)
							}
							className="w-full pr-20 pl-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
							{searchQuery && (
								<button
									type="button"
									onClick={handleClearSearch}
									className="p-1 hover:bg-gray-100 rounded-full transition-colors"
								>
									<X size={16} className="text-gray-400" />
								</button>
							)}
							<button
								type="submit"
								className="p-1 hover:bg-gray-100 rounded-full transition-colors"
							>
								<Search size={16} className="text-gray-500" />
							</button>
						</div>
					</div>

					{/* Search Results Dropdown */}
					{showSearchResults && searchQuery.length > 2 && (
						<div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
							{isSearchLoading ? (
								<div className="p-4 text-center text-gray-500">
									<div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto"></div>
									<p className="mt-2">Đang tìm kiếm...</p>
								</div>
							) : searchItems.length > 0 ? (
								<>
									{searchItems.map((product: Product) => (
										<div
											key={product.id}
											onClick={() => handleProductClick(product.id)}
											className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
										>
											<img
												src={product.images[0] || '/placeholder-product.jpg'}
												alt={product.productName}
												className="w-12 h-12 object-cover rounded-md flex-shrink-0"
											/>
											<div className="flex-1 min-w-0">
												<h4 className="text-sm font-medium text-gray-900 truncate">
													{product.productName}
												</h4>
												<p className="text-xs text-gray-500 truncate">
													{product.category?.categoryName}
												</p>
												<div className="flex items-center gap-2 mt-1">
													{product.discountedPrice < product.price ? (
														<>
															<span className="text-sm font-semibold text-red-600">
																{product.discountedPrice.toLocaleString(
																	'vi-VN'
																)}
																đ
															</span>
															<span className="text-xs text-gray-400 line-through">
																{product.price.toLocaleString('vi-VN')}đ
															</span>
														</>
													) : (
														<span className="text-sm font-semibold text-gray-900">
															{product.price.toLocaleString('vi-VN')}đ
														</span>
													)}
												</div>
											</div>
										</div>
									))}
									{searchTotalPages > 1 && (
										<div className="p-3 border-t border-gray-100">
											<button
												onClick={() => {
													navigate(
														`/products?search=${encodeURIComponent(
															searchQuery
														)}`
													);
													setShowSearchResults(false);
													setSearchQuery('');
												}}
												className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium"
											>
												Xem tất cả {searchTotal} kết quả
											</button>
										</div>
									)}
								</>
							) : (
								<div className="p-4 text-center text-gray-500">
									<p>Không tìm thấy sản phẩm nào</p>
									<p className="text-xs mt-1">Thử tìm kiếm với từ khóa khác</p>
								</div>
							)}
						</div>
					)}
				</form>
			</div>

			<div className="flex space-x-6 text-gray-900 text-lg items-center">
				{/* Mobile Search Icon */}
				<button
					className="md:hidden hover:text-gray-600 transition-colors"
					aria-label="Tìm kiếm"
					onClick={() => navigate('/products')}
				>
					<Search size={20} />
				</button>

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
							>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Đăng xuất</span>
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
					className="lg:hidden hover:text-gray-600 transition-colors"
					aria-label="Menu"
				>
					<Menu size={20} />
				</button>
			</div>
		</header>
	);
};

export default Header;
