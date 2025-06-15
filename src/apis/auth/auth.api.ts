import { api } from '@/configs';
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

// Auth API endpoints
export const authApi = {
	// POST /customers/login - Đăng nhập
	login: (data: LoginPayload) => {
		return api.post<ApiResponse<LoginResponse>>('/customers/login', data);
	},

	// POST /customers/register - Đăng ký
	register: (data: RegisterPayload) => {
		return api.post<ApiResponse<RegisterResponse>>('/customers/register', data);
	},

	// POST /auth/refresh-token - Làm mới token
	refreshToken: (data: RefreshTokenPayload) => {
		return api.post<ApiResponse<RefreshTokenResponse>>(
			'/auth/refresh-token',
			data
		);
	},

	// POST /auth/logout - Đăng xuất
	logout: (data: LogoutPayload) => {
		return api.post<ApiResponse<null>>('/auth/logout', data);
	},

	// GET /auth/me - Lấy thông tin người dùng hiện tại
	getCurrentUser: () => {
		return api.get<ApiResponse<Customer>>('/auth/me');
	},

	// PUT /customers/{id} - Cập nhật thông tin cá nhân
	updateProfile: (data: UpdateProfilePayload & { id: string }) => {
		const { id, ...updateData } = data;
		return api.patch<ApiResponse<Customer>>(`/customers/${id}`, updateData);
	},

	// PATCH /auth/change-password - Đổi mật khẩu
	changePassword: (data: ChangePasswordPayload) => {
		return api.patch<ApiResponse<null>>('/auth/change-password', data);
	},

	// POST /auth/forgot-password - Quên mật khẩu
	forgotPassword: (data: ForgotPasswordPayload) => {
		return api.post<ApiResponse<null>>('/auth/forgot-password', data);
	},

	// POST /auth/reset-password - Reset mật khẩu
	resetPassword: (data: ResetPasswordPayload) => {
		return api.post<ApiResponse<null>>('/auth/reset-password', data);
	},

	// POST /auth/verify-email - Xác thực email
	verifyEmail: (token: string) => {
		return api.post<ApiResponse<null>>('/auth/verify-email', { token });
	},

	// POST /auth/resend-verification - Gửi lại email xác thực
	resendVerificationEmail: () => {
		return api.post<ApiResponse<null>>('/auth/resend-verification');
	},
};
