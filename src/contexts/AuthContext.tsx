import React, { createContext, useContext, useEffect, useState } from 'react';

import type { Customer } from '@/types/auth.type';

interface AuthContextType {
	isAuthenticated: boolean;
	user: Customer | null;
	accessToken: string | null;
	refreshToken: string | null;
	login: (tokens: {
		accessToken: string;
		refreshToken: string;
		user: Customer;
	}) => void;
	logout: () => void;
	updateUser: (user: Customer) => void;
	setUser: (user: Customer | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<Customer | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Khởi tạo auth state từ localStorage
	useEffect(() => {
		const initializeAuth = () => {
			try {
				const storedAccessToken = localStorage.getItem('accessToken');
				const storedRefreshToken = localStorage.getItem('refreshToken');
				const storedUser = localStorage.getItem('user');

				if (storedAccessToken && storedRefreshToken) {
					setAccessToken(storedAccessToken);
					setRefreshToken(storedRefreshToken);
					setIsAuthenticated(true);

					if (storedUser) {
						try {
							const parsedUser = JSON.parse(storedUser);
							setUser(parsedUser);
						} catch (error) {
							console.error('Error parsing stored user:', error);
						}
					}
				}
			} catch (error) {
				console.error('Error initializing auth:', error);
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, []);

	// Lắng nghe sự thay đổi localStorage từ các tab khác hoặc từ component khác
	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			// Nếu accessToken bị xóa từ tab khác
			if (e.key === 'accessToken' && !e.newValue) {
				// Reset tất cả state
				setAccessToken(null);
				setRefreshToken(null);
				setUser(null);
				setIsAuthenticated(false);
			}
			// Nếu có accessToken mới từ tab khác
			else if (e.key === 'accessToken' && e.newValue) {
				setAccessToken(e.newValue);
				setIsAuthenticated(true);

				// Cập nhật user và refreshToken nếu có
				const storedRefreshToken = localStorage.getItem('refreshToken');
				const storedUser = localStorage.getItem('user');

				if (storedRefreshToken) {
					setRefreshToken(storedRefreshToken);
				}

				if (storedUser) {
					try {
						setUser(JSON.parse(storedUser));
					} catch (error) {
						console.error('Error parsing user from storage:', error);
					}
				}
			}
		};

		window.addEventListener('storage', handleStorageChange);
		return () => window.removeEventListener('storage', handleStorageChange);
	}, []);

	// Kiểm tra định kỳ localStorage để đồng bộ state (cho trường hợp thay đổi trong cùng tab)
	useEffect(() => {
		const checkAuthState = () => {
			const storedAccessToken = localStorage.getItem('accessToken');
			const storedRefreshToken = localStorage.getItem('refreshToken');
			const storedUser = localStorage.getItem('user');

			// Nếu localStorage trống nhưng state vẫn có dữ liệu -> đăng xuất
			if (!storedAccessToken && isAuthenticated) {
				setAccessToken(null);
				setRefreshToken(null);
				setUser(null);
				setIsAuthenticated(false);
			}
			// Nếu localStorage có dữ liệu nhưng state trống -> đăng nhập lại
			else if (storedAccessToken && !isAuthenticated) {
				setAccessToken(storedAccessToken);
				setRefreshToken(storedRefreshToken);
				setIsAuthenticated(true);

				if (storedUser) {
					try {
						setUser(JSON.parse(storedUser));
					} catch (error) {
						console.error('Error parsing stored user:', error);
					}
				}
			}
		};

		// Kiểm tra mỗi 1 giây
		const interval = setInterval(checkAuthState, 1000);
		return () => clearInterval(interval);
	}, [isAuthenticated]);

	const login = (tokens: {
		accessToken: string;
		refreshToken: string;
		user: Customer;
	}) => {
		const {
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
			user: userData,
		} = tokens;

		// Lưu vào localStorage
		localStorage.setItem('accessToken', newAccessToken);
		localStorage.setItem('refreshToken', newRefreshToken);
		localStorage.setItem('user', JSON.stringify(userData));

		// Cập nhật state
		setAccessToken(newAccessToken);
		setRefreshToken(newRefreshToken);
		setUser(userData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		// Xóa khỏi localStorage
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('user');

		// Reset state
		setAccessToken(null);
		setRefreshToken(null);
		setUser(null);
		setIsAuthenticated(false);
	};

	const updateUser = (updatedUser: Customer) => {
		setUser(updatedUser);
		localStorage.setItem('user', JSON.stringify(updatedUser));
	};

	const setUserData = (userData: Customer | null) => {
		setUser(userData);
		if (userData) {
			localStorage.setItem('user', JSON.stringify(userData));
		} else {
			localStorage.removeItem('user');
		}
	};

	const value: AuthContextType = {
		isAuthenticated,
		user,
		accessToken,
		refreshToken,
		login,
		logout,
		updateUser,
		setUser: setUserData,
	};

	// Hiển thị loading trong khi khởi tạo
	if (isLoading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
