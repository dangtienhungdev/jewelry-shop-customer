import { createBrowserRouter } from 'react-router-dom';
import CartPage from './pages/cart/page';
import HomePage from './pages/home/page';
import PaymentPage from './pages/payment/page';
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
		path: '/cart',
		element: <CartPage />,
	},
	{
		path: '/payment',
		element: <PaymentPage />,
	},
]);

export default routes;
