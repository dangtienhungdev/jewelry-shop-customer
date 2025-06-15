import type { Cart, CartItem } from '@/types/cart.type';
import React, { createContext, useContext, useState } from 'react';

export interface CheckoutData {
	cart: Cart | null;
	selectedItems: CartItem[];
	totalAmount: number;
	totalItems: number;
}

interface CheckoutContextType {
	checkoutData: CheckoutData | null;
	setCheckoutData: (data: CheckoutData) => void;
	clearCheckoutData: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
	undefined
);

export const useCheckout = () => {
	const context = useContext(CheckoutContext);
	if (context === undefined) {
		throw new Error('useCheckout must be used within a CheckoutProvider');
	}
	return context;
};

interface CheckoutProviderProps {
	children: React.ReactNode;
}

export const CheckoutProvider: React.FC<CheckoutProviderProps> = ({
	children,
}) => {
	const [checkoutData, setCheckoutDataState] = useState<CheckoutData | null>(
		null
	);

	const setCheckoutData = (data: CheckoutData) => {
		setCheckoutDataState(data);
		// Lưu vào localStorage để persist data khi refresh page
		localStorage.setItem('checkoutData', JSON.stringify(data));
	};

	const clearCheckoutData = () => {
		setCheckoutDataState(null);
		localStorage.removeItem('checkoutData');
	};

	// Khôi phục data từ localStorage khi component mount
	React.useEffect(() => {
		const savedData = localStorage.getItem('checkoutData');
		if (savedData) {
			try {
				const parsedData = JSON.parse(savedData);
				setCheckoutDataState(parsedData);
			} catch (error) {
				console.error('Error parsing checkout data:', error);
				localStorage.removeItem('checkoutData');
			}
		}
	}, []);

	const value: CheckoutContextType = {
		checkoutData,
		setCheckoutData,
		clearCheckoutData,
	};

	return (
		<CheckoutContext.Provider value={value}>
			{children}
		</CheckoutContext.Provider>
	);
};
