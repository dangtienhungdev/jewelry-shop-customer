import { api } from '@/configs';
import type {
	AddToCartPayload,
	Cart,
	RemoveFromCartPayload,
	UpdateCartItemPayload,
} from '@/types/cart.type';

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

	// PUT /cart/customer/{customerId}/items - Cập nhật số lượng sản phẩm
	updateCartItem: (customerId: string, data: UpdateCartItemPayload) => {
		return api.put<Cart>(`/cart/customer/${customerId}/items`, data);
	},

	// DELETE /cart/customer/{customerId}/items - Xóa sản phẩm khỏi giỏ hàng
	removeFromCart: (customerId: string, data: RemoveFromCartPayload) => {
		return api.delete<Cart>(`/cart/customer/${customerId}/items`, {
			data,
		});
	},

	// DELETE /cart/customer/{customerId} - Xóa toàn bộ giỏ hàng
	clearCart: (customerId: string) => {
		return api.delete<null>(`/cart/customer/${customerId}`);
	},
};
