import { AlertCircle, CheckCircle, Loader2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useMemo, useState } from 'react';
import { useCanReviewProduct, useCreateReview } from '@/apis/reviews';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { ReviewFormData } from '@/types/review.type';
import StarRating from './StarRating';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useCustomerOrders } from '@/apis/orders';

interface CreateReviewFormProps {
	productId: string;
	orderId?: string;
	onSuccess?: () => void;
}

const CreateReviewForm: React.FC<CreateReviewFormProps> = ({
	productId,
	orderId,
	onSuccess,
}) => {
	const { user } = useAuth();
	const [formData, setFormData] = useState<ReviewFormData>({
		rating: 0,
		title: '',
		comment: '',
		images: [],
	});

	const {
		data: canReviewData,
		isLoading: isCheckingCanReview,
		error: canReviewError,
	} = useCanReviewProduct(productId, user?._id);
	const createReviewMutation = useCreateReview();

	// Fetch user's orders to find the appropriate orderId
	const { data: ordersData, isLoading: isLoadingOrders } = useCustomerOrders(
		user?._id || '',
		1,
		100
	); // Get more orders to ensure we find the right one

	// Find the appropriate order that contains this product and has success status
	const appropriateOrder = useMemo(() => {
		if (!ordersData?.orders || !user) return null;

		return ordersData.orders.find(
			(order) =>
				order.status === 'success' &&
				order.orderDetails?.some((detail) => detail.productId === productId)
		);
	}, [ordersData?.orders, productId, user]);

	const foundOrderId = appropriateOrder?._id || orderId;

	// Show loading while checking if user can review
	if (isCheckingCanReview || isLoadingOrders) {
		return (
			<Card>
				<CardContent className="text-center py-8">
					<Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
					<p className="text-gray-600">Đang kiểm tra quyền đánh giá...</p>
				</CardContent>
			</Card>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!foundOrderId) {
			console.error('No eligible order found for review creation');
			// You could show a toast or alert to the user here
			toast.error(
				'Không tìm thấy đơn hàng phù hợp để đánh giá. Bạn cần mua và nhận hàng thành công trước khi có thể đánh giá.'
			);
			return;
		}

		try {
			await createReviewMutation.mutateAsync({
				customerId: user?._id || '',
				productId,
				orderId: foundOrderId,
				rating: formData.rating,
				title: formData.title,
				comment: formData.comment,
				images: [], // For now, we'll implement image upload later
			});

			// Reset form
			setFormData({
				rating: 0,
				title: '',
				comment: '',
				images: [],
			});

			onSuccess?.();
		} catch (error) {
			console.error('Failed to create review:', error);
		}
	};

	const handleRatingChange = (rating: number) => {
		setFormData((prev) => ({ ...prev, rating }));
	};

	const handleInputChange = (field: keyof ReviewFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	// Check if user is logged in
	if (!user) {
		return (
			<Card>
				<CardContent className="text-center py-8">
					<AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Đăng nhập để đánh giá
					</h3>
					<p className="text-gray-500 mb-4">
						Bạn cần đăng nhập để có thể đánh giá sản phẩm này.
					</p>
					<Button asChild>
						<a href="/login">Đăng nhập</a>
					</Button>
				</CardContent>
			</Card>
		);
	}

	// Check if user can review this product
	if (canReviewData && !canReviewData.canReview) {
		return (
			<Card>
				<CardContent className="text-center py-8">
					<AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Không thể đánh giá
					</h3>
					<p className="text-gray-500">
						Bạn chỉ có thể đánh giá sản phẩm sau khi đã mua và nhận hàng thành
						công.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Viết đánh giá của bạn</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Rating */}
					<div className="space-y-2">
						<Label htmlFor="rating">Đánh giá sao *</Label>
						<div className="flex items-center gap-2">
							<StarRating
								rating={formData.rating}
								interactive
								onRatingChange={handleRatingChange}
								size="lg"
							/>
							{formData.rating > 0 && (
								<span className="text-sm text-gray-600">
									{formData.rating}/5 sao
								</span>
							)}
						</div>
					</div>

					{/* Title */}
					<div className="space-y-2">
						<Label htmlFor="title">Tiêu đề đánh giá *</Label>
						<Input
							id="title"
							value={formData.title}
							onChange={(e) => handleInputChange('title', e.target.value)}
							placeholder="Tóm tắt trải nghiệm của bạn về sản phẩm"
							maxLength={200}
							required
						/>
						<div className="text-xs text-gray-500 text-right">
							{formData.title.length}/200 ký tự
						</div>
					</div>

					{/* Comment */}
					<div className="space-y-2">
						<Label htmlFor="comment">Nhận xét chi tiết *</Label>
						<Textarea
							id="comment"
							value={formData.comment}
							onChange={(e) => handleInputChange('comment', e.target.value)}
							placeholder="Chia sẻ chi tiết về chất lượng, thiết kế, dịch vụ..."
							rows={4}
							maxLength={1000}
							required
						/>
						<div className="text-xs text-gray-500 text-right">
							{formData.comment.length}/1000 ký tự
						</div>
					</div>

					{/* Images Upload (placeholder for future implementation) */}
					<div className="space-y-2">
						<Label>Hình ảnh (tùy chọn)</Label>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
							<Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
							<p className="text-sm text-gray-500">
								Tính năng upload hình ảnh sẽ được cập nhật sớm
							</p>
						</div>
					</div>

					{/* Submit Button */}
					<div className="flex justify-end">
						<Button
							type="submit"
							disabled={
								!formData.rating ||
								!formData.title.trim() ||
								!formData.comment.trim() ||
								createReviewMutation.isPending
							}
							className="min-w-32"
						>
							{createReviewMutation.isPending ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Đang gửi...
								</>
							) : (
								<>
									<CheckCircle className="w-4 h-4 mr-2" />
									Gửi đánh giá
								</>
							)}
						</Button>
					</div>

					{/* Success Message */}
					{createReviewMutation.isSuccess && (
						<div className="bg-green-50 border border-green-200 rounded-lg p-4">
							<div className="flex items-center gap-2 text-green-800">
								<CheckCircle className="w-5 h-5" />
								<span className="font-medium">Gửi đánh giá thành công!</span>
							</div>
							<p className="text-green-700 text-sm mt-1">
								Đánh giá của bạn đang được xem xét và sẽ hiển thị sau khi được
								duyệt.
							</p>
						</div>
					)}
				</form>
			</CardContent>
		</Card>
	);
};

export default CreateReviewForm;
