import { useAuth } from '@/contexts/AuthContext';
import type {
	AddToCartPayload,
	Cart,
	RemoveFromCartPayload,
	UpdateCartItemPayload,
} from '@/types/cart.type';
import type {
	UseMutationOptions,
	UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { cartApi } from './cart.api';

// Query keys for React Query
export const cartKeys = {
	all: ['cart'] as const,
	byCustomer: (customerId: string) => [...cartKeys.all, customerId] as const,
};

// Hook để lấy giỏ hàng của khách hàng
export const useCart = (options?: UseQueryOptions<Cart>) => {
	const { user, isAuthenticated } = useAuth();

	return useQuery({
		queryKey: cartKeys.byCustomer(user?._id ?? ''),
		queryFn: async () => {
			if (!user?._id) throw new Error('User not found');
			const response = await cartApi.getCart(user._id);
			return response.data;
		},
		enabled: isAuthenticated && !!user?._id,
		staleTime: 5 * 60 * 1000, // 5 minutes
		...options,
	});
};

// Hook để thêm sản phẩm vào giỏ hàng
export const useAddToCart = (
	options?: UseMutationOptions<Cart, Error, AddToCartPayload>
) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	return useMutation({
		mutationFn: async (data: AddToCartPayload) => {
			if (!user?._id) throw new Error('User not found');
			const response = await cartApi.addToCart(user._id, data);
			return response.data;
		},
		onSuccess: (data) => {
			// Cập nhật cache giỏ hàng
			if (user?._id) {
				queryClient.setQueryData(cartKeys.byCustomer(user._id), data);
				queryClient.invalidateQueries({
					queryKey: cartKeys.byCustomer(user._id),
				});
			}
			toast.success('Đã thêm sản phẩm vào giỏ hàng!');
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Thêm vào giỏ hàng thất bại!';
			toast.error(errorMessage);
		},
		...options,
	});
};

// Hook để cập nhật số lượng sản phẩm trong giỏ hàng
export const useUpdateCartItem = (
	options?: UseMutationOptions<Cart, Error, UpdateCartItemPayload>
) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	return useMutation({
		mutationFn: async (data: UpdateCartItemPayload) => {
			if (!user?._id) throw new Error('User not found');
			const response = await cartApi.updateCartItem(
				user._id,
				data.productId,
				data.quantity
			);
			return response.data;
		},
		onSuccess: (data) => {
			// Cập nhật cache giỏ hàng
			if (user?._id) {
				queryClient.setQueryData(cartKeys.byCustomer(user._id), data);
				queryClient.invalidateQueries({
					queryKey: cartKeys.byCustomer(user._id),
				});
			}
			toast.success('Đã cập nhật giỏ hàng!');
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Cập nhật giỏ hàng thất bại!';
			toast.error(errorMessage);
		},
		...options,
	});
};

// Hook để xóa sản phẩm khỏi giỏ hàng
export const useRemoveFromCart = (
	options?: UseMutationOptions<Cart, Error, RemoveFromCartPayload>
) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	return useMutation({
		mutationFn: async (data: RemoveFromCartPayload) => {
			if (!user?._id) throw new Error('User not found');
			const response = await cartApi.removeFromCart(user._id, data.productId);
			return response.data;
		},
		onSuccess: (data) => {
			// Cập nhật cache giỏ hàng
			if (user?._id) {
				queryClient.setQueryData(cartKeys.byCustomer(user._id), data);
				queryClient.invalidateQueries({
					queryKey: cartKeys.byCustomer(user._id),
				});
			}
			toast.success('Đã xóa sản phẩm khỏi giỏ hàng!');
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Xóa sản phẩm thất bại!';
			toast.error(errorMessage);
		},
		...options,
	});
};

// Hook để xóa toàn bộ giỏ hàng
export const useClearCart = (
	options?: UseMutationOptions<null, Error, void>
) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	return useMutation({
		mutationFn: async () => {
			if (!user?._id) throw new Error('User not found');
			const response = await cartApi.clearCart(user._id);
			return response.data;
		},
		onSuccess: () => {
			// Xóa cache giỏ hàng
			if (user?._id) {
				queryClient.removeQueries({ queryKey: cartKeys.byCustomer(user._id) });
			}
			toast.success('Đã xóa toàn bộ giỏ hàng!');
		},
		onError: (error: any) => {
			const errorMessage =
				error?.response?.data?.message || 'Xóa giỏ hàng thất bại!';
			toast.error(errorMessage);
		},
		...options,
	});
};
