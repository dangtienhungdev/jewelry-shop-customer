import { api } from '@/configs';
import type { AddToCartPayload, Cart } from '@/types/cart.type';

// Cart API endpoints
export const cartApi = {
	// GET /cart/customer/{customerId} - Lấy giỏ hàng của khách hàng
	getCart: (customerId: string) => {
		return api.get<Cart>(`/cart/customer/${customerId}`);
	},

	// POST /cart/customer/{customerId}/items - Thêm sản phẩm vào giỏ hàng
	addToCart: (customerId: string, data: AddToCartPayload) => {
		return api.post<Cart>(`/cart/customer/${customerId}/items`, data);
	},

	// PATCH /cart/customer/{customerId}/items/{productId} - Cập nhật số lượng sản phẩm
	updateCartItem: (customerId: string, productId: string, quantity: number) => {
		return api.patch<Cart>(`/cart/customer/${customerId}/items/${productId}`, {
			quantity,
		});
	},

	// DELETE /cart/customer/{customerId}/items/{productId} - Xóa sản phẩm khỏi giỏ hàng
	removeFromCart: (customerId: string, productId: string) => {
		return api.delete<Cart>(`/cart/customer/${customerId}/items/${productId}`);
	},

	// DELETE /cart/customer/{customerId} - Xóa toàn bộ giỏ hàng
	clearCart: (customerId: string) => {
		return api.delete<null>(`/cart/customer/${customerId}`);
	},
};
