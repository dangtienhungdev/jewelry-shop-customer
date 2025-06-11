import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/page';
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
]);

export default routes;
