import { useForgotPassword } from '@/apis/auth';
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
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';

// Zod schema for forgot password form
const forgotPasswordSchema = z.object({
	email: z.string().email({
		message: 'Email không hợp lệ.',
	}),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
	const navigate = useNavigate();

	const form = useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	// Hook để gửi email reset password
	const forgotPasswordMutation = useForgotPassword({
		onSuccess: (data) => {
			toast.success(
				data.message || 'Link đặt lại mật khẩu đã được gửi tới email của bạn!'
			);
			// Có thể redirect về login page sau một khoảng thời gian
			setTimeout(() => {
				navigate('/login');
			}, 3000);
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message ||
				'Gửi email khôi phục thất bại! Vui lòng thử lại.';
			toast.error(errorMessage);
		},
	});

	const onSubmit = (values: ForgotPasswordFormValues) => {
		console.log('🚀 ~ onSubmit ~ values:', values);
		forgotPasswordMutation.mutate(values);
	};

	const goToLogin = () => {
		navigate('/login');
	};

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
							<Mail className="h-8 w-8 text-white" />
						</div>
					</div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						Quên Mật Khẩu?
					</h2>
					<p className="text-gray-600 max-w-md mx-auto">
						Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn liên kết để
						đặt lại mật khẩu.
					</p>
				</div>

				{/* Forgot Password Form */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Email Field */}
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
											<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
												<i className="far fa-envelope text-[#4a3c3c] text-lg"></i>
											</div>
											<FormControl>
												<Input
													type="email"
													placeholder="Nhập địa chỉ email của bạn"
													className="flex-1 py-5 px-6 text-xs shadow-none text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
													disabled={forgotPasswordMutation.isPending}
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
									disabled={forgotPasswordMutation.isPending}
								>
									{forgotPasswordMutation.isPending ? (
										<>
											<i className="fas fa-spinner fa-spin mr-2"></i>
											Đang gửi...
										</>
									) : (
										<>
											<Send className="mr-2 h-4 w-4" />
											Gửi Email Khôi Phục
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
									disabled={forgotPasswordMutation.isPending}
								>
									Đăng Nhập Ngay
								</button>
							</p>
							<p className="text-xs text-[#4a3c3c]">
								Chưa có tài khoản?{' '}
								<Link
									to="/register"
									className="font-bold text-[#b77900] hover:underline"
								>
									Đăng Ký Ngay
								</Link>
							</p>
						</div>
					</div>
				</div>

				{/* Help Information */}
				<div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<div className="flex items-start gap-3">
						<i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
						<div className="text-sm text-blue-700">
							<p className="font-medium mb-1">Lưu ý:</p>
							<ul className="list-disc list-inside space-y-1 text-blue-600">
								<li>Kiểm tra cả hộp thư spam/junk nếu không thấy email</li>
								<li>Email khôi phục có thể mất vài phút để được gửi đến</li>
								<li>Liên kết khôi phục sẽ hết hạn sau 24 giờ</li>
								<li>Nếu vẫn gặp vấn đề, vui lòng liên hệ hỗ trợ</li>
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

export default ForgotPasswordPage;
