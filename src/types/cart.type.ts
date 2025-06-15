export interface CartProduct {
	id: string;
	productName: string;
	price: number;
	discountedPrice: number;
	images: string[];
	material: string;
	stockQuantity: number;
}

export interface CartItem {
	product: CartProduct;
	quantity: number;
	price: number;
	discountedPrice: number;
	effectivePrice: number;
	subtotal: number;
	addedAt: string;
}

export interface Cart {
	id: string;
	customerId: string;
	items: CartItem[];
	totalItems: number;
	totalAmount: number;
	createdAt: string;
	updatedAt: string;
}

export interface AddToCartPayload {
	productId: string;
	quantity: number;
}

export interface UpdateCartItemPayload {
	productId: string;
	quantity: number;
}

export interface RemoveFromCartPayload {
	productId: string;
}

export interface CartContextType {
	cart: Cart;
	addToCart: (item: Omit<CartItem, 'id' | 'quantity' | 'isSelected'>) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	toggleSelectItem: (itemId: string) => void;
	toggleSelectAll: () => void;
	clearCart: () => void;
	getSelectedTotal: () => number;
}
