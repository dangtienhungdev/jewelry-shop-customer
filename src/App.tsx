import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import routes from './routes';

// Tạo QueryClient instance
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={routes} />
				<Toaster richColors position="top-right" />
				{/* React Query Devtools - chỉ hiển thị trong development */}
				{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
