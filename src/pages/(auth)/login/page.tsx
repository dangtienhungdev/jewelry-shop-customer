'use client';

import { useLogin } from '@/apis/auth';
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
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

// Zod schema for form validation
const loginSchema = z.object({
	email: z.string().email({
		message: 'Email không hợp lệ.',
	}),
	password: z.string().min(6, {
		message: 'Mật khẩu phải có ít nhất 6 ký tự.',
	}),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
	const navigate = useNavigate();
	const [rememberPassword, setRememberPassword] = React.useState(true);

	const form = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// Sử dụng useLogin hook
	const loginMutation = useLogin();

	const onSubmit = (values: LoginFormValues) => {
		loginMutation.mutate(values);
	};

	const goToRegister = () => {
		navigate('/register');
	};

	return (
		<MainLayout>
			<div className="max-w-3xl mx-auto px-6 py-20">
				<h2 className="text-center font-semibold text-xl mb-12">Đăng Nhập</h2>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						{/* Email Field */}
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center bg-white shadow-none rounded-md border border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="far fa-envelope text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												type="email"
												placeholder="Enter Your email address here"
												className="flex-1 py-5 px-6 text-xs outline shadow-none text-gray-400 placeholder-gray-400 border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={loginMutation.isPending}
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
									<div className="flex items-center bg-white rounded-md border shadow-none border-gray-300">
										<div className="pl-6 pr-4 py-4 border-l-4 border-[#4a3c3c] flex items-center justify-center">
											<i className="fas fa-key text-[#4a3c3c] text-lg"></i>
										</div>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter Your password here"
												className="flex-1 py-5 px-6 text-xs text-gray-400 outline-none shadow-none border-none placeholder-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md"
												disabled={loginMutation.isPending}
												{...field}
											/>
										</FormControl>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Remember Password */}
						<div className="flex justify-between items-center text-[9px] font-normal text-[#4a3c3c]">
							<label className="flex items-center space-x-2 cursor-pointer select-none">
								<input
									type="checkbox"
									className="w-5 h-5 bg-[#4a3c3c] border-none text-white checked:bg-[#4a3c3c] focus:ring-0"
									checked={rememberPassword}
									onChange={(e) => setRememberPassword(e.target.checked)}
									disabled={loginMutation.isPending}
								/>
								<span>Remember Password?</span>
							</label>
							<a
								href="#"
								className="font-bold text-[9px] text-[#4a3c3c] hover:underline"
							>
								Forgot Password?
							</a>
						</div>

						{/* Submit Button */}
						<div className="flex justify-center">
							<Button
								type="submit"
								className="bg-[#b77900] text-white font-semibold text-xs px-12 py-3 rounded shadow-md hover:brightness-110 transition hover:bg-[#b77900]/90"
								disabled={loginMutation.isPending}
							>
								{loginMutation.isPending ? (
									<>
										<i className="fas fa-spinner fa-spin mr-2"></i>
										Đang đăng nhập...
									</>
								) : (
									'Đăng Nhập'
								)}
							</Button>
						</div>

						{/* Link to register */}
						<div className="flex justify-center mt-4">
							<p className="text-xs text-[#4a3c3c]">
								Chưa có tài khoản?{' '}
								<button
									type="button"
									onClick={goToRegister}
									className="font-bold text-[#b77900] hover:underline cursor-pointer"
									disabled={loginMutation.isPending}
								>
									Đăng Ký Ngay
								</button>
							</p>
						</div>
					</form>
				</Form>
			</div>
		</MainLayout>
	);
};

export default LoginPage;
