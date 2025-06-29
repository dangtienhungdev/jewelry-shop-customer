# Hệ thống Review/Đánh giá Sản phẩm - Jewelry Customer

## Tổng quan

Hệ thống review cho phép khách hàng đánh giá sản phẩm sau khi mua hàng thành công, với các tính năng:

- ✅ Đánh giá sao (1-5 sao)
- ✅ Viết nhận xét chi tiết
- ✅ Upload hình ảnh (chuẩn bị)
- ✅ Kiểm tra quyền đánh giá (chỉ khách đã mua)
- ✅ Hệ thống duyệt của admin
- ✅ Đánh dấu đánh giá hữu ích
- ✅ Thống kê và phân tích

## Cấu trúc thư mục

```
jewelry-customer/src/
├── apis/reviews/
│   ├── review.api.ts          # API calls
│   ├── useReviews.ts          # React Query hooks
│   └── index.ts
├── types/review.type.ts       # TypeScript types
├── pages/
│   ├── product-detail/
│   │   └── components/reviews/
│   │       ├── Reviews.tsx           # Main component
│   │       ├── StarRating.tsx        # Star rating
│   │       ├── ReviewStats.tsx       # Statistics
│   │       ├── ReviewList.tsx        # List with filters
│   │       ├── ReviewCard.tsx        # Individual review
│   │       ├── CreateReviewForm.tsx  # Review form
│   │       └── index.ts
│   └── (user)/my-reviews/
│       └── page.tsx           # Customer review management
└── components/ui/
    └── star-rating.tsx        # Reusable star rating
```

## Cách sử dụng

### 1. Hiển thị đánh giá trong Product Detail

```tsx
import { Reviews } from './components/reviews';

// Trong component ProductDetail
<Reviews productId={product.id} orderId={orderId} />
```

### 2. Hiển thị rating trong Product Card

```tsx
import StarRating from '@/components/ui/star-rating';

<StarRating 
  rating={4.5} 
  totalReviews={23} 
  size="sm" 
  showCount={true} 
/>
```

### 3. Sử dụng Review Hooks

```tsx
import { 
  useProductReviews, 
  useProductReviewStats,
  useCreateReview,
  useCanReviewProduct 
} from '@/apis/reviews';

// Lấy đánh giá sản phẩm
const { data: reviews } = useProductReviews(productId);

// Lấy thống kê
const { data: stats } = useProductReviewStats(productId);

// Kiểm tra quyền đánh giá
const { data: canReview } = useCanReviewProduct(productId);

// Tạo đánh giá mới
const createReview = useCreateReview();
```

## API Endpoints

### Customer Endpoints

- `GET /reviews` - Lấy danh sách đánh giá
- `GET /reviews/:id` - Lấy chi tiết đánh giá
- `POST /reviews` - Tạo đánh giá mới
- `PATCH /reviews/:id` - Cập nhật đánh giá
- `DELETE /reviews/:id` - Xóa đánh giá
- `GET /reviews/can-review/:productId` - Kiểm tra quyền đánh giá
- `PATCH /reviews/:id/helpful` - Đánh dấu hữu ích
- `GET /reviews/product/:productId/stats` - Thống kê đánh giá

### Query Parameters

```typescript
interface ReviewQueryParams {
  productId?: string;
  customerId?: string;
  rating?: number;
  isApproved?: boolean;
  page?: number;
  limit?: number;
}
```

## Components chi tiết

### Reviews (Main Component)

Tab-based interface với 3 tabs:
- **Đánh giá**: Hiển thị danh sách đánh giá
- **Thống kê**: Hiển thị biểu đồ và số liệu
- **Viết đánh giá**: Form tạo đánh giá mới

### ReviewStats

Hiển thị:
- Điểm trung bình
- Tổng số đánh giá
- Phân bố theo số sao (1-5)
- Biểu đồ bar chart

### ReviewList

Features:
- Lọc theo số sao
- Sắp xếp (mới nhất, cũ nhất, rating cao/thấp, hữu ích nhất)
- Phân trang
- Loading states

### ReviewCard

Hiển thị:
- Thông tin khách hàng
- Số sao và tiêu đề
- Nội dung đánh giá
- Hình ảnh (nếu có)
- Phản hồi từ shop
- Nút "Hữu ích"
- Badge "Đã mua hàng"

### CreateReviewForm

Form với:
- Chọn số sao (interactive)
- Input tiêu đề (max 200 ký tự)
- Textarea nội dung (max 1000 ký tự)
- Upload hình ảnh (coming soon)
- Validation và error handling

### StarRating

Configurable component:
- Interactive hoặc display-only
- 3 sizes: sm, md, lg
- Hover effects khi interactive
- Hiển thị số/tổng số sao

## Business Logic

### Quyền đánh giá

1. Khách hàng phải đăng nhập
2. Phải có đơn hàng thành công chứa sản phẩm
3. Mỗi khách hàng chỉ đánh giá 1 lần/sản phẩm
4. Chỉ đánh giá được khi đơn hàng đã hoàn thành

### Workflow duyệt

1. Khách hàng gửi đánh giá → trạng thái "pending"
2. Admin duyệt → trạng thái "approved"
3. Chỉ đánh giá đã duyệt mới hiển thị công khai

### Validation

- Rating: 1-5 sao (required)
- Title: 3-200 ký tự (required)
- Comment: 10-1000 ký tự (required)
- Images: max 5 files, < 5MB each

## State Management

### React Query Keys

```typescript
const reviewKeys = {
  all: ['reviews'],
  lists: () => [...reviewKeys.all, 'list'],
  list: (params) => [...reviewKeys.lists(), params],
  details: () => [...reviewKeys.all, 'detail'],
  detail: (id) => [...reviewKeys.details(), id],
  productReviews: (productId) => [...reviewKeys.all, 'product', productId],
  productStats: (productId) => [...reviewKeys.all, 'stats', productId],
  customerReviews: (customerId) => [...reviewKeys.all, 'customer', customerId],
  canReview: (productId) => [...reviewKeys.all, 'can-review', productId],
};
```

### Cache Strategy

- Reviews list: 5 phút
- Product stats: 10 phút
- Can review check: 30 giây
- Individual review: 10 phút

## Error Handling

### Common Errors

- 401: Chưa đăng nhập
- 403: Không có quyền đánh giá
- 409: Đã đánh giá rồi
- 422: Validation errors

### User Experience

- Toast notifications cho success/error
- Loading states cho tất cả operations
- Skeleton loading cho initial load
- Error boundaries cho component crashes

## Performance Optimizations

1. **Lazy Loading**: Components load khi cần
2. **Pagination**: Chỉ load 5-10 reviews/page
3. **Caching**: React Query cache với stale time
4. **Debouncing**: Search và filter operations
5. **Image Optimization**: Lazy load review images

## Testing Strategy

### Unit Tests
```typescript
// Test hooks
describe('useProductReviews', () => {
  it('should fetch product reviews correctly');
  it('should handle error states');
});

// Test components
describe('ReviewCard', () => {
  it('should display review information');
  it('should handle helpful button click');
});
```

### Integration Tests
- Review creation flow
- Review management workflow
- Permission checking

## Deployment Notes

### Environment Variables
```bash
VITE_API_BASE_URL=https://api.jewelry-shop.com
```

### Build Requirements
- Node.js 18+
- TypeScript 5+
- React Query 4+
- Tailwind CSS 3+

## Future Enhancements

1. **Image Upload**: S3/Cloudinary integration
2. **Review Templates**: Pre-written review options
3. **Review Insights**: AI-powered sentiment analysis
4. **Gamification**: Badges cho top reviewers
5. **Review Comparison**: So sánh sản phẩm qua reviews
6. **Export Reviews**: PDF/Excel export cho admin

## Troubleshooting

### Common Issues

**Reviews không hiển thị:**
- Kiểm tra API connection
- Verify isApproved filter
- Check React Query cache

**Không thể tạo review:**
- Kiểm tra authentication
- Verify order eligibility
- Check validation errors

**Performance chậm:**
- Enable pagination
- Reduce page size
- Optimize images

## Support

- Documentation: `/docs/reviews`
- API Reference: `/api-docs#reviews`
- Support: admin@jewelry-shop.com
