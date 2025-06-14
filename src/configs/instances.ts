import type {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';

// Base configuration
const BASE_URL = 'http://localhost:8000/api/v1';
const TIMEOUT = 10000; // 10 seconds

// Create axios instance
const apiInstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

// Request interceptor
apiInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Add auth token if available
		const token = localStorage.getItem('access_token');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Log request in development
		// if (import.meta.env.DEV) {
		// 	console.log('🚀 API Request:', {
		// 		method: config.method?.toUpperCase(),
		// 		url: `${config.baseURL}${config.url}`,
		// 		data: config.data,
		// 		params: config.params,
		// 	});
		// }

		return config;
	},
	(error) => {
		console.error('❌ Request Error:', error);
		return Promise.reject(error);
	}
);

// Response interceptor
apiInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		// Log response in development
		// if (import.meta.env.DEV) {
		// 	console.log('✅ API Response:', {
		// 		status: response.status,
		// 		url: response.config.url,
		// 		data: response.data,
		// 	});
		// }

		return response;
	},
	(error) => {
		// Handle common errors
		if (error.response) {
			const { status, data } = error.response;

			switch (status) {
				case 401:
					// Unauthorized - clear token and redirect to login
					localStorage.removeItem('access_token');
					console.error('🔒 Unauthorized access');
					// You can add redirect logic here
					break;
				case 403:
					console.error('🚫 Forbidden access');
					break;
				case 404:
					console.error('🔍 Resource not found');
					break;
				case 422:
					console.error('📝 Validation error:', data);
					break;
				case 500:
					console.error('🔥 Server error');
					break;
				default:
					console.error('❌ API Error:', data);
			}
		} else if (error.request) {
			console.error('🌐 Network Error:', error.message);
		} else {
			console.error('⚠️ Request Setup Error:', error.message);
		}

		return Promise.reject(error);
	}
);

// Helper functions for common HTTP methods
export const api = {
	// GET request
	get: <T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiInstance.get(url, config);
	},

	// POST request
	post: <T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiInstance.post(url, data, config);
	},

	// PUT request
	put: <T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiInstance.put(url, data, config);
	},

	// PATCH request
	patch: <T>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiInstance.patch(url, data, config);
	},

	// DELETE request
	delete: <T>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> => {
		return apiInstance.delete(url, config);
	},
};

// Export the instance for custom usage
export default apiInstance;
