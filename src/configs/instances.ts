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
		const token = localStorage.getItem('accessToken');
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
		// 		headers: config.headers,
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
	async (error) => {
		const originalRequest = error.config;

		// Handle common errors
		if (error.response) {
			const { status, data } = error.response;

			switch (status) {
				case 401:
					// Unauthorized - try to refresh token
					if (!originalRequest._retry) {
						originalRequest._retry = true;

						try {
							const refreshToken = localStorage.getItem('refreshToken');
							if (refreshToken) {
								// Attempt to refresh token
								const refreshResponse = await axios.post(
									`${BASE_URL}/customers/refresh-token`,
									{
										refreshToken,
									}
								);

								const {
									accessToken: newAccessToken,
									refreshToken: newRefreshToken,
								} = refreshResponse.data.data;

								// Update tokens in localStorage
								localStorage.setItem('accessToken', newAccessToken);
								localStorage.setItem('refreshToken', newRefreshToken);

								// Update the original request with new token
								originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

								// Retry the original request
								return apiInstance(originalRequest);
							}
						} catch (refreshError) {
							console.error('🔄 Token refresh failed:', refreshError);
						}
					}

					// If refresh failed or no refresh token, clear auth and redirect
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('user');
					console.error('🔒 Unauthorized access - redirecting to login');

					// Trigger a custom event to notify the app about logout
					window.dispatchEvent(new CustomEvent('auth:logout'));
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
