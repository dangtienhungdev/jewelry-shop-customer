import type { ApiResponse } from '@/types/api.type';
import type {
	ChangePasswordPayload,
	Customer,
	ForgotPasswordPayload,
	LoginPayload,
	LoginResponse,
	LogoutPayload,
	RefreshTokenPayload,
	RefreshTokenResponse,
	RegisterPayload,
	RegisterResponse,
	ResetPasswordPayload,
	UpdateProfilePayload,
} from '@/types/auth.type';
import type {
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from './auth.api';

// Query keys for React Query
export const authKeys = {
	all: ['auth'] as const,
	me: () => [...authKeys.all, 'me'] as const,
};

// Hook để lấy thông tin user hiện tại
export const useCurrentUser = (options?: UseQueryOptions<Customer>) => {
	return useQuery({
		queryKey: authKeys.me(),
		queryFn: async () => {
			const response = await authApi.getCurrentUser();
			return response.data.data;
		},
		staleTime: 10 * 60 * 1000, // 10 minutes
		retry: false, // Không retry khi unauthorized
		...options,
	});
};

// Hook để đăng nhập
export const useLogin = (
	options?: UseMutationOptions<ApiResponse<LoginResponse>, Error, LoginPayload>
) => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (data: LoginPayload) => {
			const response = await authApi.login(data);
			return response.data;
		},
		onSuccess: (data) => {
			console.log('🚀 ~ data:', data);
			// Lưu token vào localStorage hoặc cookie
			localStorage.setItem('accessToken', data.data.accessToken);
			localStorage.setItem('refreshToken', data.data.refreshToken);

			// Set user data vào cache
			queryClient.setQueryData(authKeys.me(), data.data.customer);

			// Invalidate và refetch user data
			queryClient.invalidateQueries({ queryKey: authKeys.me() });

			toast.success(data.message || 'Đăng nhập thành công!');
			navigate('/'); // Chuyển về trang chủ
		},
		...options,
	});
};

// Hook để đăng ký
export const useRegister = (
	options?: UseMutationOptions<
		ApiResponse<RegisterResponse>,
		Error,
		RegisterPayload
	>
) => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (data: RegisterPayload) => {
			const response = await authApi.register(data);
			return response.data;
		},
		onSuccess: (data) => {
			toast.success(data.message || 'Đăng ký thành công!');
			navigate('/login'); // Chuyển sang trang login
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Đăng ký thất bại!';
			toast.error(errorMessage);
		},
		...options,
	});
};

// Hook để refresh token
export const useRefreshToken = (
	options?: UseMutationOptions<
		ApiResponse<RefreshTokenResponse>,
		Error,
		RefreshTokenPayload
	>
) => {
	return useMutation({
		mutationFn: async (data: RefreshTokenPayload) => {
			const response = await authApi.refreshToken(data);
			return response.data;
		},
		onSuccess: (data) => {
			// Cập nhật token mới
			localStorage.setItem('accessToken', data.data.accessToken);
			localStorage.setItem('refreshToken', data.data.refreshToken);
		},
		...options,
	});
};

// Hook để đăng xuất
export const useLogout = (
	options?: UseMutationOptions<ApiResponse<null>, Error, LogoutPayload>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LogoutPayload) => {
			const response = await authApi.logout(data);
			return response.data;
		},
		onSuccess: () => {
			// Xóa token khỏi localStorage
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');

			// Clear toàn bộ cache
			queryClient.clear();

			// Hoặc chỉ clear auth cache
			queryClient.removeQueries({ queryKey: authKeys.all });
		},
		...options,
	});
};

// Hook để cập nhật profile
export const useUpdateProfile = (
	options?: UseMutationOptions<
		ApiResponse<Customer>,
		Error,
		UpdateProfilePayload
	>
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: UpdateProfilePayload) => {
			const response = await authApi.updateProfile(data);
			return response.data;
		},
		onSuccess: (data) => {
			// Cập nhật user data trong cache
			queryClient.setQueryData(authKeys.me(), data.data);

			// Invalidate user data để refetch
			queryClient.invalidateQueries({ queryKey: authKeys.me() });
		},
		...options,
	});
};

// Hook để đổi mật khẩu
export const useChangePassword = (
	options?: UseMutationOptions<ApiResponse<null>, Error, ChangePasswordPayload>
) => {
	return useMutation({
		mutationFn: async (data: ChangePasswordPayload) => {
			const response = await authApi.changePassword(data);
			return response.data;
		},
		...options,
	});
};

// Hook để quên mật khẩu
export const useForgotPassword = (
	options?: UseMutationOptions<ApiResponse<null>, Error, ForgotPasswordPayload>
) => {
	return useMutation({
		mutationFn: async (data: ForgotPasswordPayload) => {
			const response = await authApi.forgotPassword(data);
			return response.data;
		},
		...options,
	});
};

// Hook để reset mật khẩu
export const useResetPassword = (
	options?: UseMutationOptions<ApiResponse<null>, Error, ResetPasswordPayload>
) => {
	return useMutation({
		mutationFn: async (data: ResetPasswordPayload) => {
			const response = await authApi.resetPassword(data);
			return response.data;
		},
		...options,
	});
};

// Hook để verify email
export const useVerifyEmail = (
	options?: UseMutationOptions<ApiResponse<null>, Error, string>
) => {
	return useMutation({
		mutationFn: async (token: string) => {
			const response = await authApi.verifyEmail(token);
			return response.data;
		},
		...options,
	});
};

// Hook để gửi lại email verification
export const useResendVerificationEmail = (
	options?: UseMutationOptions<ApiResponse<null>, Error, void>
) => {
	return useMutation({
		mutationFn: async () => {
			const response = await authApi.resendVerificationEmail();
			return response.data;
		},
		...options,
	});
};
