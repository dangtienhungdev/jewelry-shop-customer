import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/(auth)/login/page';
import RegisterPage from './pages/(auth)/register/page';
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
		path: '/payment',
		element: <PaymentPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
]);

export default routes;
