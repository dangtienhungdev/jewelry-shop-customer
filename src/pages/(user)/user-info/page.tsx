import { useChangePassword, useUpdateProfile } from '@/apis/auth';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, Lock, Save, User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Zod schema for profile update
const updateProfileSchema = z.object({
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
	address: z.string().min(5, {
		message: 'Địa chỉ phải có ít nhất 5 ký tự.',
	}),
});

// Zod schema for change password
const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, {
			message: 'Mật khẩu hiện tại phải có ít nhất 6 ký tự.',
		}),
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

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const UserInfoPage = () => {
	const { user, setUser } = useAuth();

	// Form for profile update
	const profileForm = useForm<UpdateProfileFormValues>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			fullName: '',
			phone: '',
			address: '',
		},
	});

	// Form for change password
	const passwordForm = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	// Cập nhật form khi user data thay đổi
	useEffect(() => {
		if (user) {
			profileForm.reset({
				fullName: user.fullName || '',
				phone: user.phone || '',
				address: user.address || '',
			});
		}
	}, [user, profileForm]);

	// Hook để cập nhật profile
	const updateProfileMutation = useUpdateProfile({
		onSuccess: (data) => {
			// Cập nhật user trong AuthContext và localStorage
			setUser(data.data);
			toast.success(data.message || 'Cập nhật thông tin thành công!');
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Cập nhật thông tin thất bại!';
			toast.error(errorMessage);
		},
	});

	// Hook để đổi mật khẩu
	const changePasswordMutation = useChangePassword({
		onSuccess: (data) => {
			toast.success(data.message || 'Đổi mật khẩu thành công!');
			passwordForm.reset(); // Reset form sau khi thành công
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Đổi mật khẩu thất bại!';
			toast.error(errorMessage);
		},
	});

	const onSubmitProfile = (values: UpdateProfileFormValues) => {
		console.log('🚀 ~ onSubmitProfile ~ values:', values);
		updateProfileMutation.mutate(values);
	};

	const onSubmitPassword = (values: ChangePasswordFormValues) => {
		console.log('🚀 ~ onSubmitPassword ~ values:', values);
		changePasswordMutation.mutate(values);
	};

	if (!user) {
		return (
			<MainLayout>
				<div className="flex items-center justify-center min-h-[400px]">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
				</div>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<div className="mx-auto px-6 py-20">
				{/* Header */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-2">
						<div className="p-2 bg-[#4a3c3c] rounded-lg">
							<User className="h-6 w-6 text-white" />
						</div>
						<h1 className="text-2xl font-semibold text-gray-900">
							Thông Tin Cá Nhân
						</h1>
					</div>
					<p className="text-gray-600">Quản lý thông tin cá nhân và bảo mật</p>
				</div>

				{/* User Info Card */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
					<div className="flex items-center gap-4 mb-6">
						<div className="w-16 h-16 bg-[#4a3c3c] rounded-full flex items-center justify-center">
							<User className="h-8 w-8 text-white" />
						</div>
						<div>
							<h2 className="text-xl font-medium text-gray-900">
								{user.fullName}
							</h2>
							<p className="text-gray-600">{user.email}</p>
							<p className="text-sm text-gray-500">
								Thành viên từ{' '}
								{new Date(user.createdAt).toLocaleDateString('vi-VN')}
							</p>
						</div>
					</div>
				</div>

				{/* Tabs */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200">
					<Tabs defaultValue="profile" className="w-full">
						<TabsList className="grid w-full grid-cols-2 bg-gray-50 p-1 rounded-t-lg">
							<TabsTrigger
								value="profile"
								className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
							>
								<User className="h-4 w-4" />
								Thông Tin Cá Nhân
							</TabsTrigger>
							<TabsTrigger
								value="password"
								className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm"
							>
								<Lock className="h-4 w-4" />
								Thay Đổi Mật Khẩu
							</TabsTrigger>
						</TabsList>

						{/* Profile Tab */}
						<TabsContent value="profile" className="p-6">
							<div className="mb-6">
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Cập Nhật Thông Tin
								</h3>
								<p className="text-sm text-gray-600">
									Cập nhật thông tin cá nhân của bạn
								</p>
							</div>

							<Form {...profileForm}>
								<form
									onSubmit={profileForm.handleSubmit(onSubmitProfile)}
									className="space-y-6"
								>
									{/* Full Name Field */}
									<FormField
										control={profileForm.control}
										name="fullName"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Họ và Tên <span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-user text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															placeholder="Nhập họ và tên của bạn"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={updateProfileMutation.isPending}
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
										control={profileForm.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Số Điện Thoại <span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-phone text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															type="tel"
															placeholder="Nhập số điện thoại của bạn"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={updateProfileMutation.isPending}
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Email Field (Read-only) */}
									<FormItem>
										<FormLabel className="text-sm font-medium text-gray-700">
											Email
										</FormLabel>
										<div className="flex items-center bg-gray-50 shadow-sm rounded-md border border-gray-300">
											<div className="pl-4 pr-3 py-3 border-l-4 border-gray-400 flex items-center justify-center">
												<i className="far fa-envelope text-gray-400 text-sm"></i>
											</div>
											<Input
												value={user.email}
												className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none bg-gray-50 text-gray-500"
												disabled
												readOnly
											/>
										</div>
										<p className="text-xs text-gray-500 mt-1">
											Email không thể thay đổi
										</p>
									</FormItem>

									{/* Address Field */}
									<FormField
										control={profileForm.control}
										name="address"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Địa Chỉ <span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-map-marker-alt text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															placeholder="Nhập địa chỉ của bạn"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={updateProfileMutation.isPending}
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Submit Button */}
									<div className="flex justify-end pt-4">
										<Button
											type="submit"
											className="bg-[#b77900] text-white font-medium text-sm px-8 py-3 rounded-md shadow-md hover:bg-[#b77900]/90 transition-colors"
											disabled={updateProfileMutation.isPending}
										>
											{updateProfileMutation.isPending ? (
												<>
													<i className="fas fa-spinner fa-spin mr-2"></i>
													Đang cập nhật...
												</>
											) : (
												<>
													<Save className="mr-2 h-4 w-4" />
													Cập Nhật Thông Tin
												</>
											)}
										</Button>
									</div>
								</form>
							</Form>
						</TabsContent>

						{/* Password Tab */}
						<TabsContent value="password" className="p-6">
							<div className="mb-6">
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									Thay Đổi Mật Khẩu
								</h3>
								<p className="text-sm text-gray-600">
									Cập nhật mật khẩu để bảo mật tài khoản của bạn
								</p>
							</div>

							<Form {...passwordForm}>
								<form
									onSubmit={passwordForm.handleSubmit(onSubmitPassword)}
									className="space-y-6"
								>
									{/* Current Password Field */}
									<FormField
										control={passwordForm.control}
										name="currentPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Mật Khẩu Hiện Tại{' '}
													<span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-lock text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															type="password"
															placeholder="Nhập mật khẩu hiện tại"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={changePasswordMutation.isPending}
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* New Password Field */}
									<FormField
										control={passwordForm.control}
										name="newPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Mật Khẩu Mới <span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-key text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															type="password"
															placeholder="Nhập mật khẩu mới"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={changePasswordMutation.isPending}
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
										control={passwordForm.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-sm font-medium text-gray-700">
													Xác Nhận Mật Khẩu{' '}
													<span className="text-red-500">*</span>
												</FormLabel>
												<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#4a3c3c] focus-within:ring-1 focus-within:ring-[#4a3c3c]">
													<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
														<i className="fas fa-key text-[#4a3c3c] text-sm"></i>
													</div>
													<FormControl>
														<Input
															type="password"
															placeholder="Nhập lại mật khẩu mới"
															className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
															disabled={changePasswordMutation.isPending}
															{...field}
														/>
													</FormControl>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>

									{/* Submit Button */}
									<div className="flex justify-end pt-4">
										<Button
											type="submit"
											className="bg-[#b77900] text-white font-medium text-sm px-8 py-3 rounded-md shadow-md hover:bg-[#b77900]/90 transition-colors"
											disabled={changePasswordMutation.isPending}
										>
											{changePasswordMutation.isPending ? (
												<>
													<i className="fas fa-spinner fa-spin mr-2"></i>
													Đang đổi mật khẩu...
												</>
											) : (
												<>
													<Key className="mr-2 h-4 w-4" />
													Đổi Mật Khẩu
												</>
											)}
										</Button>
									</div>
								</form>
							</Form>
						</TabsContent>
					</Tabs>
				</div>

				{/* Additional Info */}
				<div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<div className="flex items-start gap-3">
						<i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
						<div className="text-sm text-blue-700">
							<p className="font-medium mb-1">Lưu ý:</p>
							<ul className="list-disc list-inside space-y-1 text-blue-600">
								<li>Email không thể thay đổi sau khi đăng ký</li>
								<li>
									Vui lòng cung cấp thông tin chính xác để thuận tiện cho việc
									giao hàng
								</li>
								<li>Mật khẩu mới phải có ít nhất 6 ký tự</li>
								<li>Thông tin của bạn sẽ được bảo mật tuyệt đối</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default UserInfoPage;
