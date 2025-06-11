export interface DeliveryAddress {
	id: string;
	recipientName: string;
	phone: string;
	address: string;
	isDefault: boolean;
}

export interface OrderItem {
	id: string;
	name: string;
	image: string;
	quantity: number;
	price: number;
	totalPrice: number;
}

export interface ShippingMethod {
	id: string;
	name: string;
	duration: string;
	price: number;
	description?: string;
}

export interface PaymentMethod {
	id: string;
	name: string;
	icon?: string;
	description?: string;
}

export interface DiscountCode {
	code: string;
	discount: number;
	type: 'percentage' | 'amount';
}

export interface OrderSummary {
	items: OrderItem[];
	subtotal: number;
	discount: number;
	shippingFee: number;
	total: number;
	itemCount: number;
}

export interface PaymentFormData {
	deliveryAddress: DeliveryAddress;
	orderNote: string;
	shippingMethod: ShippingMethod;
	paymentMethod: PaymentMethod;
	discountCode?: string;
}
