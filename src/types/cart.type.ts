export interface CartItem {
	id: string;
	productId: string;
	name: string;
	description: string;
	price: number;
	quantity: number;
	image: string;
	isSelected: boolean;
}

export interface Cart {
	items: CartItem[];
	totalItems: number;
	totalPrice: number;
	selectedItems: CartItem[];
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
