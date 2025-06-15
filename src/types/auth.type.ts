// Customer interface
export interface Customer {
	_id: string;
	fullName: string;
	phone: string;
	email: string;
	address: string;
	createdAt: string;
	updatedAt: string;
}

// Login request payload
export interface LoginPayload {
	email: string;
	password: string;
}

// Register request payload
export interface RegisterPayload {
	fullName: string;
	phone: string;
	email: string;
	password: string;
	address: string;
}

// Login response data
export interface LoginResponse {
	customer: Customer;
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

// Register response data (chỉ trả về customer info, không có token)
export interface RegisterResponse {
	_id: string;
	fullName: string;
	phone: string;
	email: string;
	address: string;
	createdAt: string;
	updatedAt: string;
}

// Refresh token payload
export interface RefreshTokenPayload {
	refreshToken: string;
}

// Refresh token response
export interface RefreshTokenResponse {
	accessToken: string;
	refreshToken: string;
	expiresIn: number;
}

// Logout payload
export interface LogoutPayload {
	refreshToken: string;
}

// Auth state for context/store
export interface AuthState {
	isAuthenticated: boolean;
	customer: Customer | null;
	accessToken: string | null;
	refreshToken: string | null;
	expiresIn: number | null;
}

// Update profile payload
export interface UpdateProfilePayload {
	fullName?: string;
	phone?: string;
	address?: string;
}

// Change password payload
export interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

// Forgot password payload
export interface ForgotPasswordPayload {
	email: string;
}

// Reset password payload
export interface ResetPasswordPayload {
	token: string;
	newPassword: string;
	confirmPassword: string;
}
