import { useResetPassword } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MainLayout } from '@/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Key, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

// Zod schema for reset password form
const resetPasswordSchema = z
	.object({
		newPassword: z.string().min(6, {
			message: 'Mật khẩu mới phải có ít nhất 6 ký tự.',
		}),
		confirmPassword: z.string().min(6, {
			message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự.',
		}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Mật khẩu xác nhận không khớp.',
		path: ['confirmPassword'],
	});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [token, setToken] = useState<string | null>(null);

	const form = useForm<ResetPasswordFormValues>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	});

	// Lấy token từ URL params
	useEffect(() => {
		const tokenFromUrl = searchParams.get('token');
		if (tokenFromUrl) {
			setToken(tokenFromUrl);
		} else {
			toast.error('Token không hợp lệ hoặc đã hết hạn.');
			navigate('/forgot-password');
		}
	}, [searchParams, navigate]);

	// Hook để reset password
	const resetPasswordMutation = useResetPassword({
		onSuccess: (data) => {
			toast.success(
				data.message ||
					'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay bây giờ.'
			);
			// Navigate về login page sau khi thành công
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message ||
				'Đặt lại mật khẩu thất bại! Vui lòng thử lại.';
			toast.error(errorMessage);
		},
	});

	const onSubmit = (values: ResetPasswordFormValues) => {
		if (!token) {
			toast.error('Token không hợp lệ.');
			return;
		}

		console.log('🚀 ~ onSubmit ~ values:', values);
		resetPasswordMutation.mutate({
			token,
			newPassword: values.newPassword,
			confirmPassword: values.confirmPassword,
		});
	};

	const goToLogin = () => {
		navigate('/login');
	};

	const goToForgotPassword = () => {
		navigate('/forgot-password');
	};

	if (!token) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="text-center">
						<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
						<p className="text-gray-600">Đang xác thực token...</p>
					</div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="max-w-3xl mx-auto px-6 py-20">
				{/* Back to Login */}
				<div className="mb-8">
					<button
						onClick={goToLogin}
						className="flex items-center gap-2 text-sm text-[#4a3c3c] hover:text-[#b77900] transition-colors"
					>
						<ArrowLeft className="h-4 w-4" />
						Quay lại đăng nhập
					</button>
				</div>

				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex justify-center mb-4">
						<div className="p-3 bg-[#4a3c3c] rounded-full">
							<Shield className="h-8 w-8 text-white" />
						</div>
					</div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Đặt Lại Mật Khẩu
					</h2>
					<p className="text-gray-600 max-w-md mx-auto">
						Nhập mật khẩu mới cho tài khoản của bạn. Hãy chọn mật khẩu mạnh để
						bảo vệ tài khoản.
					</p>
				</div>

				{/* Reset Password Form */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* New Password Field */}
							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
											<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
												<i className="fas fa-key text-[#4a3c3c] text-lg"></i>
											</div>
											<FormControl>
												<Input
													type="password"
													placeholder="Nhập mật khẩu mới"
													className="flex-1 py-5 px-6 text-xs shadow-none text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
													disabled={resetPasswordMutation.isPending}
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Confirm Password Field */}
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
											<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
												<i className="fas fa-lock text-[#4a3c3c] text-lg"></i>
											</div>
											<FormControl>
												<Input
													type="password"
													placeholder="Xác nhận mật khẩu mới"
													className="flex-1 py-5 px-6 text-xs shadow-none text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
													disabled={resetPasswordMutation.isPending}
													{...field}
												/>
											</FormControl>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Submit Button */}
							<div className="flex justify-center">
								<Button
									type="submit"
									className="bg-[#b77900] text-white font-semibold text-xs px-12 py-3 rounded shadow-md hover:brightness-110 transition hover:bg-[#b77900]/90"
									disabled={resetPasswordMutation.isPending}
								>
									{resetPasswordMutation.isPending ? (
										<>
											<i className="fas fa-spinner fa-spin mr-2"></i>
											Đang đặt lại...
										</>
									) : (
										<>
											<Key className="mr-2 h-4 w-4" />
											Đặt Lại Mật Khẩu
										</>
									)}
								</Button>
							</div>
						</form>
					</Form>

					{/* Additional Links */}
					<div className="mt-8 text-center space-y-4">
						<div className="flex items-center justify-center">
							<div className="border-t border-gray-300 flex-1"></div>
							<span className="px-4 text-sm text-gray-500">hoặc</span>
							<div className="border-t border-gray-300 flex-1"></div>
						</div>

						<div className="space-y-2">
							<p className="text-xs text-[#4a3c3c]">
								Nhớ mật khẩu rồi?{' '}
								<button
									type="button"
									onClick={goToLogin}
									className="font-bold text-[#b77900] hover:underline cursor-pointer"
									disabled={resetPasswordMutation.isPending}
								>
									Đăng Nhập Ngay
								</button>
							</p>
							<p className="text-xs text-[#4a3c3c]">
								Token hết hạn?{' '}
								<button
									type="button"
									onClick={goToForgotPassword}
									className="font-bold text-[#b77900] hover:underline cursor-pointer"
									disabled={resetPasswordMutation.isPending}
								>
									Gửi Lại Email
								</button>
							</p>
						</div>
					</div>
				</div>

				{/* Security Information */}
				<div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
					<div className="flex items-start gap-3">
						<i className="fas fa-shield-alt text-green-500 mt-0.5"></i>
						<div className="text-sm text-green-700">
							<p className="font-medium mb-1">Bảo mật mật khẩu:</p>
							<ul className="list-disc list-inside space-y-1 text-green-600">
								<li>Sử dụng ít nhất 6 ký tự</li>
								<li>Kết hợp chữ hoa, chữ thường và số</li>
								<li>Không sử dụng thông tin cá nhân dễ đoán</li>
								<li>Không chia sẻ mật khẩu với người khác</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Contact Support */}
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-600">
						Cần hỗ trợ?{' '}
						<a
							href="mailto:support@fayra.com"
							className="text-[#b77900] hover:underline font-medium"
						>
							Liên hệ với chúng tôi
						</a>
					</p>
				</div>
			</div>
		</MainLayout>
	);
};

export default ResetPasswordPage;
