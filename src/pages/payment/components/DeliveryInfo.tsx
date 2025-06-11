import type {
	DeliveryAddress,
	PaymentMethod,
	ShippingMethod,
} from '@/types/payment.type';
import React, { useState } from 'react';

const DeliveryInfo: React.FC = () => {
	const [orderNote, setOrderNote] = useState('');
	const [selectedShipping, setSelectedShipping] = useState<string>('fast');
	const [selectedPayment, setSelectedPayment] = useState<string>('cash');

	// Mock data
	const deliveryAddress: DeliveryAddress = {
		id: '1',
		recipientName: 'Nguyen Van A',
		phone: '(+84) 947238197',
		address:
			'Số 401, Đường Lê Đức Thọ, Phường 17, Quận Gò Vấp, TP. Hồ Chí Minh',
		isDefault: true,
	};

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

	return (
		<div className="flex-1 bg-white border border-gray-200 rounded-md p-4">
			<h2 className="font-extrabold text-base mb-4">THÔNG TIN GIAO HÀNG</h2>

			{/* Delivery Address */}
			<div className="border border-gray-200 rounded-md p-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h3 className="text-[#1B3B5B] font-semibold text-sm mb-1">
						Địa chỉ nhận hàng
					</h3>
					<p className="text-xs font-semibold text-black">
						{deliveryAddress.recipientName}
						<span className="font-normal ml-2">{deliveryAddress.phone}</span>
					</p>
					<p className="text-xs font-normal text-black">
						{deliveryAddress.address}
					</p>
				</div>
				<div className="text-right mt-3 sm:mt-0">
					<button
						className="text-[#C28B1B] font-semibold text-sm mb-1 hover:underline transition-colors"
						type="button"
					>
						Thay đổi
					</button>
					{deliveryAddress.isDefault && (
						<div className="text-[10px] text-red-600 border border-red-600 rounded px-1 inline-block">
							Mặc định
						</div>
					)}
				</div>
			</div>

			{/* Order Note */}
			<div className="mb-4">
				<h3 className="font-semibold text-sm mb-2">Ghi chú đơn hàng</h3>
				<textarea
					className="w-full border border-gray-200 rounded-md p-2 text-xs resize-none placeholder:text-gray-400 focus:outline-none focus:border-[#C28B1B] transition-colors"
					placeholder="Nhập nội dung"
					rows={4}
					value={orderNote}
					onChange={(e) => setOrderNote(e.target.value)}
				></textarea>
			</div>

			{/* Shipping Methods */}
			<div className="mb-4">
				<h3 className="font-semibold text-sm mb-2">Phương thức vận chuyển</h3>
				<div className="flex flex-wrap gap-3">
					{shippingMethods.map((method) => (
						<button
							key={method.id}
							onClick={() => setSelectedShipping(method.id)}
							className={`flex justify-between items-center border rounded-md text-xs font-semibold px-3 py-1 w-[140px] transition-colors ${
								selectedShipping === method.id
									? 'border-[#C28B1B] bg-[#C28B1B] text-white'
									: 'border-gray-400 text-[#1B3B5B] hover:border-[#C28B1B]'
							}`}
							type="button"
						>
							<span>{method.name}</span>
							<span className="text-[10px] font-normal">{method.duration}</span>
							<i
								className="fas fa-info-circle text-[10px] ml-1"
								title="Thông tin"
							></i>
							<span className="ml-auto">{formatPrice(method.price)}</span>
						</button>
					))}
				</div>
			</div>

			{/* Payment Methods */}
			<div>
				<h3 className="font-semibold text-sm mb-2">Phương thức thanh toán</h3>
				<div className="space-y-3">
					{paymentMethods.map((method) => (
						<button
							key={method.id}
							onClick={() => setSelectedPayment(method.id)}
							className={`flex items-center gap-2 border rounded-md text-xs font-semibold px-3 py-1 w-[200px] text-left transition-colors ${
								selectedPayment === method.id
									? 'border-[#C28B1B] bg-[#C28B1B] text-white'
									: 'border-gray-400 text-[#1B3B5B] hover:border-[#C28B1B]'
							}`}
							type="button"
						>
							{method.icon && (
								<img
									alt={method.name}
									className="w-5 h-5"
									src={method.icon}
									onError={(e) => {
										const target = e.target as HTMLImageElement;
										target.style.display = 'none';
									}}
								/>
							)}
							{method.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default DeliveryInfo;
