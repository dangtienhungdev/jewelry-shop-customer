import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Star } from 'lucide-react';

import React from 'react';
import StarRating from './StarRating';
import { useProductReviewStats } from '@/apis/reviews';

interface ReviewStatsProps {
	productId: string;
}

const ReviewStats: React.FC<ReviewStatsProps> = ({ productId }) => {
	const { data: stats, isLoading, isError } = useProductReviewStats(productId);

	if (isLoading) {
		return (
			<Card>
				<CardContent className="flex items-center justify-center py-8">
					<Loader2 className="w-6 h-6 animate-spin text-primary" />
				</CardContent>
			</Card>
		);
	}

	if (isError || !stats) {
		return null;
	}

	const { averageRating, totalReviews, ratingDistribution } = stats;

	if (totalReviews === 0) {
		return (
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Đánh giá sản phẩm</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-center py-8">
						<p className="text-gray-500">Chưa có đánh giá nào</p>
						<p className="text-sm text-gray-400 mt-1">
							Hãy là người đầu tiên đánh giá sản phẩm này!
						</p>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Đánh giá sản phẩm</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					<div className="flex items-center gap-4">
						<div className="text-center">
							<div className="text-3xl font-bold text-primary">
								{averageRating.toFixed(1)}
							</div>
							<StarRating rating={averageRating} size="md" />
							<div className="text-sm text-gray-500 mt-1">
								{totalReviews} đánh giá
							</div>
						</div>
					</div>

					<div className="space-y-2">
						<h4 className="font-medium text-gray-900">Phân bố đánh giá</h4>
						{[5, 4, 3, 2, 1].map((rating) => {
							const count =
								ratingDistribution[rating as keyof typeof ratingDistribution];
							const percentage =
								totalReviews > 0 ? (count / totalReviews) * 100 : 0;

							return (
								<div key={rating} className="flex items-center gap-2 text-sm">
									<span className="w-8 text-right">{rating}</span>
									<Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
									<div className="flex-1 bg-gray-200 rounded-full h-2">
										<div
											className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<span className="w-12 text-right text-gray-500">{count}</span>
								</div>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ReviewStats;
