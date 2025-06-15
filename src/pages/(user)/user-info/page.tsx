import { useUpdateProfile } from '@/apis/auth';
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
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/layouts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, User } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

// Zod schema for form validation
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

type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

const UserInfoPage = () => {
	const { user, setUser } = useAuth();

	const form = useForm<UpdateProfileFormValues>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			fullName: '',
			phone: '',
			address: '',
		},
	});

	// Cập nhật form khi user data thay đổi
	useEffect(() => {
		if (user) {
			form.reset({
				fullName: user.fullName || '',
				phone: user.phone || '',
				address: user.address || '',
			});
		}
	}, [user, form]);

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

	const onSubmit = (values: UpdateProfileFormValues) => {
		console.log('🚀 ~ onSubmit ~ values:', values);
		updateProfileMutation.mutate(values);
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
					<p className="text-gray-600">Cập nhật thông tin cá nhân của bạn</p>
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

				{/* Update Form */}
				<div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
					<h3 className="text-lg font-medium text-gray-900 mb-6">
						Cập Nhật Thông Tin
					</h3>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							{/* Full Name Field */}
							<FormField
								control={form.control}
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
								control={form.control}
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
								control={form.control}
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
