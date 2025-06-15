import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPasswordPage from './pages/(auth)/forgot-password/page';
import LoginPage from './pages/(auth)/login/page';
import RegisterPage from './pages/(auth)/register/page';
import ResetPasswordPage from './pages/(auth)/reset-password/page';
import OrderHistoryPage from './pages/(user)/order-history/page';
import UserInfoPage from './pages/(user)/user-info/page';
import CartPage from './pages/cart/page';
import HomePage from './pages/home/page';
import PaymentPage from './pages/payment/page';
import ProductDetailPage from './pages/product-detail/page';
import ProductPage from './pages/products/page';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/products',
		element: <ProductPage />,
	},
	{
		path: '/product-detail/:id?',
		element: <ProductDetailPage />,
	},
	{
		path: '/cart',
		element: <CartPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPasswordPage />,
	},
	{
		path: '/reset-password',
		element: <ResetPasswordPage />,
	},
	// Private Routes - Cần authentication
	{
		path: '/payment',
		element: (
			<PrivateRoute>
				<PaymentPage />
			</PrivateRoute>
		),
	},
	{
		path: '/user-info/:id',
		element: (
			<PrivateRoute>
				<UserInfoPage />
			</PrivateRoute>
		),
	},
	{
		path: '/order-history/:id',
		element: (
			<PrivateRoute>
				<OrderHistoryPage />
			</PrivateRoute>
		),
	},
	// Thêm các route profile và orders cho dropdown menu
	{
		path: '/profile',
		element: (
			<PrivateRoute>
				<UserInfoPage />
			</PrivateRoute>
		),
	},
	{
		path: '/orders',
		element: (
			<PrivateRoute>
				<OrderHistoryPage />
			</PrivateRoute>
		),
	},
]);

export default routes;
