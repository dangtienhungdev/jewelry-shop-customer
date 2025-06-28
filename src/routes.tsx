import CartPage from './pages/cart/page';
import ForgotPasswordPage from './pages/(auth)/forgot-password/page';
import HomePage from './pages/home/page';
import LoginPage from './pages/(auth)/login/page';
import OrderHistoryPage from './pages/(user)/order-history/page';
import PaymentCancelPage from './pages/payment/cancel/page';
import PaymentPage from './pages/payment/page';
import PaymentSuccessPage from './pages/payment/success/page';
import PrivateRoute from './components/PrivateRoute';
import ProductDetailPage from './pages/product-detail/page';
import ProductPage from './pages/products/page';
import RegisterPage from './pages/(auth)/register/page';
import ResetPasswordPage from './pages/(auth)/reset-password/page';
import SystemPage from './pages/he-thong/page';
import ThongTinPage from './pages/thong-tin/page';
import UserInfoPage from './pages/(user)/user-info/page';
import { createBrowserRouter } from 'react-router-dom';

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
		path: '/thong-tin',
		element: <ThongTinPage />,
	},
	{
		path: '/system',
		element: <SystemPage />,
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
		path: '/payment/cancel',
		element: (
			<PrivateRoute>
				<PaymentCancelPage />
			</PrivateRoute>
		),
	},
	{
		path: '/payment/success',
		element: (
			<PrivateRoute>
				<PaymentSuccessPage />
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
