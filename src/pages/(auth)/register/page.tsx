import { useRegister } from '@/apis/auth';
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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

// Zod schema for form validation
const registerSchema = z.object({
	fullName: z.string().min(2, {
		message: 'Họ tên phải có ít nhất 2 ký tự.',
	}),
	phone: z
		.string()
		.min(10, {
			message: 'Số điện thoại phải có ít nhất 10 ký tự.',
		})
		.regex(/^[0-9]+$/, {
			message: 'Số điện thoại chỉ được chứa số.',
		}),
	email: z.string().email({
		message: 'Email không hợp lệ.',
	}),
	password: z.string().min(6, {
		message: 'Mật khẩu phải có ít nhất 6 ký tự.',
	}),
	address: z.string().min(5, {
		message: 'Địa chỉ phải có ít nhất 5 ký tự.',
	}),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
	const navigate = useNavigate();

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			fullName: '',
			phone: '',
			email: '',
			password: '',
			address: '',
		},
	});

	// Sử dụng useRegister hook (logic đã được xử lý trong hook)
	const registerMutation = useRegister();

	const onSubmit = (values: RegisterFormValues) => {
		registerMutation.mutate(values);
	};

	const goToLogin = () => {
		navigate('/login');
	};

	return (
		<MainLayout>
			<div className="max-w-3xl mx-auto px-6 py-20">
				<h2 className="text-center font-semibold text-xl mb-12">Đăng Ký</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* Full Name Field */}
						<FormField
							control={form.control}
							name="fullName"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="fas fa-user text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												placeholder="Nhập họ và tên của bạn"
												className="flex-1 py-5 px-6 text-xs shadow-none text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={registerMutation.isPending}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Phone Field */}
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="fas fa-phone text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												type="tel"
												placeholder="Nhập số điện thoại của bạn"
												className="flex-1 py-5 px-6 shadow-none text-xs text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={registerMutation.isPending}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

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
												className="flex-1 py-5 px-6 shadow-none text-xs text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={registerMutation.isPending}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password Field */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="fas fa-key text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="Nhập mật khẩu của bạn"
												className="flex-1 py-5 px-6 shadow-none text-xs text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={registerMutation.isPending}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Address Field */}
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center bg-white shadow-md rounded-md border border-transparent focus-within:border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="fas fa-map-marker-alt text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												type="text"
												placeholder="Nhập địa chỉ của bạn"
												className="flex-1 py-5 px-6 shadow-none text-xs text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={registerMutation.isPending}
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
								disabled={registerMutation.isPending}
							>
								{registerMutation.isPending ? (
									<>
										<i className="fas fa-spinner fa-spin mr-2"></i>
										Đang đăng ký...
									</>
								) : (
									'Đăng Ký'
								)}
							</Button>
						</div>

						{/* Link to login */}
						<div className="flex justify-center mt-4">
							<p className="text-xs text-[#4a3c3c]">
								Đã có tài khoản?{' '}
								<button
									type="button"
									onClick={goToLogin}
									className="font-bold text-[#b77900] hover:underline cursor-pointer"
									disabled={registerMutation.isPending}
								>
									Đăng Nhập Ngay
								</button>
							</p>
						</div>
					</form>
				</Form>
			</div>
		</MainLayout>
	);
};

export default RegisterPage;
