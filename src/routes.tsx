import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/home/page';

const routes = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
]);

export default routes;
