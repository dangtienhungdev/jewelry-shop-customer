import * as z from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import type { PaymentMethod, ShippingMethod } from '@/types/payment.type';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

// Props interface to receive delivery info from parent
interface DeliveryInfoProps {
	onDeliveryInfoChange?: (deliveryInfo: {
		recipientName: string;
		phone: string;
		address: string;
		orderNote?: string;
		shippingMethod: string;
		paymentMethod: 'cash' | 'payos';
		shippingFee: number;
	}) => void;
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
	onDeliveryInfoChange,
}) => {
	const { user, isAuthenticated } = useAuth();
	const [selectedShipping, setSelectedShipping] = useState<string>('standard');
	const [selectedPayment, setSelectedPayment] = useState<'cash' | 'payos'>(
		'cash'
	);

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
				recipientName: user?.fullName || '',
				phone: user.phone || '',
				address: user.address || '',
				orderNote: '',
			});
		}
	}, [user, isAuthenticated, form]);

	// Shipping methods - updated to match backend expectations
	const shippingMethods: ShippingMethod[] = [
		{
			id: 'standard',
			name: 'Tiêu chuẩn',
			duration: '3-5 ngày',
			price: 30000, // Default shipping fee from backend
		},
		{
			id: 'fast',
			name: 'Nhanh',
			duration: '1-2 ngày',
			price: 50000,
		},
	];

	// Payment methods - updated to match backend API (cash/payos)
	const paymentMethods: PaymentMethod[] = [
		{
			id: 'cash',
			name: 'Thanh toán khi nhận hàng (COD)',
			description: 'Thanh toán bằng tiền mặt khi nhận hàng',
		},
		{
			id: 'payos',
			name: 'Thanh toán trực tuyến PayOS',
			description: 'Chuyển khoản ngân hàng qua PayOS',
			icon: 'https://pay.payos.vn/assets/images/logo.png',
		},
	];

	const formatPrice = (price: number): string => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(price);
	};

	// Get selected shipping fee
	const getShippingFee = (): number => {
		const selectedMethod = shippingMethods.find(
			(method) => method.id === selectedShipping
		);
		return selectedMethod?.price || 30000;
	};

	// Watch form changes and notify parent
	const watchedValues = form.watch();
	useEffect(() => {
		const { recipientName, phone, address, orderNote } = watchedValues;

		// Only notify if form has required values
		if (recipientName && phone && address && onDeliveryInfoChange) {
			onDeliveryInfoChange({
				recipientName,
				phone,
				address,
				orderNote,
				shippingMethod: selectedShipping,
				paymentMethod: selectedPayment,
				shippingFee: getShippingFee(),
			});
		}
	}, [watchedValues, selectedShipping, selectedPayment, onDeliveryInfoChange]);

	const onSubmit = (values: DeliveryFormValues) => {
		console.log('Delivery form values:', values);
		console.log('Selected shipping:', selectedShipping);
		console.log('Selected payment:', selectedPayment);
		// Form validation passed - data is already being passed to parent via useEffect
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
											placeholder="Nhập địa chỉ giao hàng đầy đủ"
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
										placeholder="Nhập ghi chú cho đơn hàng (tùy chọn). VD: Giao hàng buổi chiều, gọi trước khi đến..."
										className="resize-none text-sm focus-visible:ring-1 focus-visible:ring-[#C28B1B] focus-visible:border-[#C28B1B]"
										rows={3}
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
											title="Phí vận chuyển"
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
									onClick={() =>
										setSelectedPayment(method.id as 'cash' | 'payos')
									}
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
									<div className="flex-1">
										<div>{method.name}</div>
										{method.description && (
											<div className="text-[10px] opacity-80 mt-1">
												{method.description}
											</div>
										)}
									</div>
									{selectedPayment === method.id && (
										<i className="fas fa-check ml-auto text-sm"></i>
									)}
								</button>
							))}
						</div>

						{/* Payment method info */}
						<div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
							<i className="fas fa-info-circle mr-1"></i>
							{selectedPayment === 'cash'
								? 'Thanh toán bằng tiền mặt khi nhận hàng. Shipper sẽ mang POS nếu bạn muốn thanh toán bằng thẻ.'
								: 'Thanh toán trực tuyến an toàn qua PayOS. Hỗ trợ chuyển khoản ngân hàng và ví điện tử.'}
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

					{/* Form validation summary */}
					<div className="bg-gray-50 border border-gray-200 rounded-md p-3">
						<div className="flex items-center gap-2 mb-2">
							<i className="fas fa-clipboard-check text-gray-500 text-sm"></i>
							<span className="text-sm font-medium text-gray-700">
								Kiểm tra thông tin
							</span>
						</div>
						<div className="text-xs text-gray-600">
							Vui lòng kiểm tra kỹ thông tin giao hàng trước khi đặt hàng. Thông
							tin này sẽ được sử dụng để liên hệ và giao hàng.
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default DeliveryInfo;
