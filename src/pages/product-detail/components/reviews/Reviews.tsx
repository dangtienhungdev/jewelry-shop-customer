import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, PlusCircle } from 'lucide-react';
import React, { useState } from 'react';

import CreateReviewForm from './CreateReviewForm';
import ReviewList from './ReviewList';
import ReviewStats from './ReviewStats';

interface ReviewsProps {
	productId: string;
	orderId?: string; // Pass this if customer has purchased this product
}

const Reviews: React.FC<ReviewsProps> = ({ productId, orderId }) => {
	const [activeTab, setActiveTab] = useState('reviews');

	return (
		<div className="w-full">
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="reviews" className="flex items-center gap-2">
						<MessageSquare className="w-4 h-4" />
						Đánh giá
					</TabsTrigger>
					{/* <TabsTrigger value="stats" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Thống kê
          </TabsTrigger> */}
					<TabsTrigger value="create" className="flex items-center gap-2">
						<PlusCircle className="w-4 h-4" />
						Viết đánh giá
					</TabsTrigger>
				</TabsList>

				<div className="mt-6">
					<TabsContent value="reviews" className="space-y-6">
						<ReviewList productId={productId} />
					</TabsContent>

					<TabsContent value="stats" className="space-y-6">
						<ReviewStats productId={productId} />
					</TabsContent>

					<TabsContent value="create" className="space-y-6">
						<CreateReviewForm
							productId={productId}
							orderId={orderId}
							onSuccess={() => setActiveTab('reviews')}
						/>
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default Reviews;
