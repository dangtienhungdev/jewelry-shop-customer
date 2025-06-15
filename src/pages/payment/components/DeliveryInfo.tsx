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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import type { PaymentMethod, ShippingMethod } from '@/types/payment.type';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Zod schema for delivery form
const deliveryFormSchema = z.object({
	recipientName: z.string().min(2, {
		message: 'Tên người nhận phải có ít nhất 2 ký tự.',
	}),
	phone: z
		.string()
		.min(10, {
			message: 'Số điện thoại phải có ít nhất 10 ký tự.',
		})
		.regex(/^[0-9]+$/, {
			message: 'Số điện thoại chỉ được chứa số.',
		}),
	address: z.string().min(10, {
		message: 'Địa chỉ phải có ít nhất 10 ký tự.',
	}),
	orderNote: z.string().optional(),
});

type DeliveryFormValues = z.infer<typeof deliveryFormSchema>;

const DeliveryInfo: React.FC = () => {
	const { user, isAuthenticated } = useAuth();
	const [selectedShipping, setSelectedShipping] = useState<string>('fast');
	const [selectedPayment, setSelectedPayment] = useState<string>('cash');

	// Form setup
	const form = useForm<DeliveryFormValues>({
		resolver: zodResolver(deliveryFormSchema),
		defaultValues: {
			recipientName: '',
			phone: '',
			address: '',
			orderNote: '',
		},
	});

	// Populate form with user data when available
	useEffect(() => {
		if (user && isAuthenticated) {
			form.reset({
				recipientName: user.fullName || '',
				phone: user.phone || '',
				address: user.address || '',
				orderNote: '',
			});
		}
	}, [user, isAuthenticated, form]);

	// Mock data
	const shippingMethods: ShippingMethod[] = [
		{
			id: 'fast',
			name: 'Nhanh',
			duration: '20 phút',
			price: 20000,
		},
		{
			id: 'standard',
			name: 'Tiêu chuẩn',
			duration: '40 phút',
			price: 11000,
		},
	];

	const paymentMethods: PaymentMethod[] = [
		{
			id: 'cash',
			name: 'Thanh toán tiền mặt',
		},
		{
			id: 'momo',
			name: 'Ví MoMo hoặc chuyển khoản ngân hàng',
			icon: 'https://storage.googleapis.com/a1aa/image/bc155505-d0db-4976-19be-51589260d3a7.jpg',
		},
		{
			id: 'vnpay',
			name: 'Thanh toán quét mã QR',
			icon: 'https://storage.googleapis.com/a1aa/image/0a4b2d56-2227-4557-d8ef-e96ee7003c18.jpg',
		},
	];

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	const onSubmit = (values: DeliveryFormValues) => {
		console.log('Delivery form values:', values);
		console.log('Selected shipping:', selectedShipping);
		console.log('Selected payment:', selectedPayment);
		// Handle form submission here
	};

	// Loading state when user data is not available
	if (!isAuthenticated || !user) {
		return (
			<div className="flex-1 bg-white border border-gray-200 rounded-md p-4">
				<div className="flex items-center justify-center h-64">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 bg-white border border-gray-200 rounded-md p-4">
			<h2 className="font-extrabold text-base mb-4">THÔNG TIN GIAO HÀNG</h2>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Recipient Name */}
					<FormField
						control={form.control}
						name="recipientName"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Tên người nhận <span className="text-red-500">*</span>
								</FormLabel>
								<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#C28B1B] focus-within:ring-1 focus-within:ring-[#C28B1B]">
									<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
										<i className="fas fa-user text-[#4a3c3c] text-sm"></i>
									</div>
									<FormControl>
										<Input
											placeholder="Nhập tên người nhận"
											className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
											{...field}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Phone */}
					<FormField
						control={form.control}
						name="phone"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Số điện thoại <span className="text-red-500">*</span>
								</FormLabel>
								<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#C28B1B] focus-within:ring-1 focus-within:ring-[#C28B1B]">
									<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
										<i className="fas fa-phone text-[#4a3c3c] text-sm"></i>
									</div>
									<FormControl>
										<Input
											type="tel"
											placeholder="Nhập số điện thoại"
											className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
											{...field}
										/>
									</FormControl>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Address */}
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Địa chỉ giao hàng <span className="text-red-500">*</span>
								</FormLabel>
								<div className="flex items-center bg-white shadow-sm rounded-md border border-gray-300 focus-within:border-[#C28B1B] focus-within:ring-1 focus-within:ring-[#C28B1B]">
									<div className="pl-4 pr-3 py-3 border-l-4 border-[#4a3c3c] flex items-center justify-center">
										<i className="fas fa-map-marker-alt text-[#4a3c3c] text-sm"></i>
									</div>
									<FormControl>
										<Input
											placeholder="Nhập địa chỉ giao hàng"
											className="flex-1 py-3 px-4 text-sm border-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-r-md shadow-none"
											{...field}
										/>
									</FormControl>
								</div>
								<FormMessage />
								<div className="mt-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="text-[#C28B1B] border-[#C28B1B] hover:bg-[#C28B1B] hover:text-white text-xs"
										onClick={() => {
											// Reset to user's default address
											if (user?.address) {
												form.setValue('address', user.address);
											}
										}}
									>
										Sử dụng địa chỉ mặc định
									</Button>
								</div>
							</FormItem>
						)}
					/>

					{/* Order Note */}
					<FormField
						control={form.control}
						name="orderNote"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-sm font-medium text-gray-700">
									Ghi chú đơn hàng
								</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Nhập ghi chú cho đơn hàng (tùy chọn)"
										className="resize-none text-sm focus-visible:ring-1 focus-visible:ring-[#C28B1B] focus-visible:border-[#C28B1B]"
										rows={4}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Shipping Methods */}
					<div>
						<Label className="text-sm font-medium text-gray-700 mb-3 block">
							Phương thức vận chuyển <span className="text-red-500">*</span>
						</Label>
						<div className="flex flex-wrap gap-3">
							{shippingMethods.map((method) => (
								<button
									key={method.id}
									type="button"
									onClick={() => setSelectedShipping(method.id)}
									className={`flex justify-between items-center border rounded-md text-xs font-semibold px-3 py-2 min-w-[160px] transition-colors ${
										selectedShipping === method.id
											? 'border-[#C28B1B] bg-[#C28B1B] text-white'
											: 'border-gray-400 text-[#1B3B5B] hover:border-[#C28B1B]'
									}`}
								>
									<div className="flex flex-col items-start">
										<span>{method.name}</span>
										<span className="text-[10px] font-normal opacity-80">
											{method.duration}
										</span>
									</div>
									<div className="flex items-center gap-1">
										<span className="text-[10px]">
											{formatPrice(method.price)}
										</span>
										<i
											className="fas fa-info-circle text-[10px]"
											title="Thông tin"
										></i>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Payment Methods */}
					<div>
						<Label className="text-sm font-medium text-gray-700 mb-3 block">
							Phương thức thanh toán <span className="text-red-500">*</span>
						</Label>
						<div className="space-y-3">
							{paymentMethods.map((method) => (
								<button
									key={method.id}
									type="button"
									onClick={() => setSelectedPayment(method.id)}
									className={`flex items-center gap-3 border rounded-md text-xs font-semibold px-4 py-3 w-full text-left transition-colors ${
										selectedPayment === method.id
											? 'border-[#C28B1B] bg-[#C28B1B] text-white'
											: 'border-gray-400 text-[#1B3B5B] hover:border-[#C28B1B]'
									}`}
								>
									{method.icon && (
										<img
											alt={method.name}
											className="w-6 h-6 object-contain"
											src={method.icon}
											onError={(e) => {
												const target = e.target as HTMLImageElement;
												target.style.display = 'none';
											}}
										/>
									)}
									<span>{method.name}</span>
									{selectedPayment === method.id && (
										<i className="fas fa-check ml-auto text-sm"></i>
									)}
								</button>
							))}
						</div>
					</div>

					{/* User Info Display */}
					<div className="bg-blue-50 border border-blue-200 rounded-md p-3">
						<div className="flex items-center gap-2 mb-2">
							<i className="fas fa-info-circle text-blue-500 text-sm"></i>
							<span className="text-sm font-medium text-blue-800">
								Thông tin tài khoản
							</span>
						</div>
						<div className="text-xs text-blue-700 space-y-1">
							<p>
								<strong>Email:</strong> {user.email}
							</p>
							<p>
								<strong>Thành viên từ:</strong>{' '}
								{new Date(user.createdAt).toLocaleDateString('vi-VN')}
							</p>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default DeliveryInfo;
