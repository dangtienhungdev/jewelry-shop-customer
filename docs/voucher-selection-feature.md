# Tính Năng Chọn Voucher

## Tổng quan

Tính năng cho phép người dùng xem và chọn voucher từ danh sách các voucher đang hoạt động thay vì phải nhớ và nhập mã voucher thủ công.

## Tính năng chính

### 🎯 **Hiển thị danh sách voucher có sẵn**
- Lấy danh sách voucher đang hoạt động từ API
- Lọc voucher phù hợp với giá trị đơn hàng
- Hiển thị thông tin chi tiết của từng voucher

### 🎯 **Lọc voucher thông minh**
- **Giá trị đơn hàng tối thiểu**: Chỉ hiển thị voucher có thể áp dụng
- **Giới hạn sử dụng**: Kiểm tra số lần đã sử dụng
- **Ngày hiệu lực**: Chỉ hiển thị voucher trong thời gian có hiệu lực

### 🎯 **Tính toán giảm giá tự động**
- **Voucher phần trăm**: Tính toán dựa trên giá trị đơn hàng
- **Voucher số tiền cố định**: Áp dụng trực tiếp
- **Giới hạn tối đa**: Tự động áp dụng giới hạn nếu có

### 🎯 **UX/UI thân thiện**
- Loading states khi tải dữ liệu
- Hover effects và transitions
- Responsive design
- Thông báo rõ ràng

## Cách sử dụng

### 1. **Xem danh sách voucher**
- Click vào nút "Xem voucher có sẵn" trong phần Mã Giảm Giá
- Danh sách voucher sẽ hiển thị bên dưới

### 2. **Chọn voucher**
- Click vào voucher muốn sử dụng
- Voucher sẽ được áp dụng tự động
- Thông báo thành công sẽ hiển thị

### 3. **Xóa voucher**
- Click vào nút X (dấu nhân) trong phần voucher đã áp dụng
- Hoặc chọn voucher khác để thay thế

### 4. **Trường hợp không có voucher**
- Nếu shop chưa phát hành voucher nào: Hiển thị thông báo "Chưa có voucher nào được phát hành"
- Nếu có voucher nhưng không phù hợp với đơn hàng: Hiển thị thông báo "Không có voucher phù hợp"
- Nút "Xem voucher có sẵn" chỉ hiển thị khi có voucher đang hoạt động

## API Endpoints

### Lấy danh sách voucher đang hoạt động
```http
GET /vouchers/active
```

**Response:**
```json
{
  "vouchers": [
    {
      "_id": "60d5f484e1a2f5001f647abc",
      "discountCode": "WELCOME10",
      "discountName": "Giảm giá chào mừng",
      "discountType": "percentage",
      "discountValue": 10,
      "startDate": "2024-01-01T00:00:00.000Z",
      "endDate": "2024-12-31T23:59:59.000Z",
      "minOrderValue": 1000000,
      "maxDiscountAmount": 100000,
      "usageLimit": 100,
      "usedCount": 50,
      "isActive": true
    }
  ],
  "total": 1
}
```

## Logic lọc voucher

### Điều kiện hiển thị voucher:
1. **Giá trị đơn hàng**: `subtotal >= voucher.minOrderValue`
2. **Giới hạn sử dụng**: `voucher.usedCount < voucher.usageLimit`
3. **Ngày hiệu lực**: `now >= startDate && now <= endDate`
4. **Trạng thái hoạt động**: `voucher.isActive === true`

### Tính toán giảm giá:
- **Percentage**: `discount = min((subtotal * percentage / 100), maxDiscountAmount)`
- **Fixed Amount**: `discount = voucher.discountValue`

## Components

### OrderSummary.tsx
- **State Management**: Quản lý danh sách voucher và trạng thái hiển thị
- **API Integration**: Sử dụng `useActiveVouchers` hook
- **UI Rendering**: Hiển thị danh sách voucher và form nhập mã

### useActiveVouchers Hook
- **Data Fetching**: Lấy danh sách voucher từ API
- **Caching**: React Query cache với stale time 10 phút
- **Error Handling**: Xử lý lỗi khi tải dữ liệu

## Styling

### Voucher Card
```css
.border border-gray-200 rounded-md p-2 bg-white
hover:border-[#C28B1B] transition-colors cursor-pointer
```

### Loading State
```css
.animate-spin rounded-full h-6 w-6 border-b-2 border-[#C28B1B]
```

### Success Notification
```css
.text-green-600 bg-green-50 border border-green-200
```

## Error Handling

### Loading Errors
- Hiển thị spinner khi đang tải
- Thông báo lỗi nếu không tải được dữ liệu

### Empty States
- Thông báo khi không có voucher phù hợp
- Hướng dẫn điều kiện sử dụng voucher

### Validation Errors
- Kiểm tra điều kiện áp dụng voucher
- Hiển thị thông báo lỗi cụ thể

## Performance Considerations

### Caching
- React Query cache với stale time 10 phút
- Garbage collection time 15 phút

### Lazy Loading
- Chỉ tải voucher khi người dùng click "Xem voucher có sẵn"
- Không tải dữ liệu không cần thiết

### Optimizations
- Lọc voucher ở client-side để giảm API calls
- Debounce input để tránh validate quá nhiều

## Testing

### Unit Tests
- Test logic lọc voucher
- Test tính toán giảm giá
- Test validation rules

### Integration Tests
- Test API integration
- Test user interactions
- Test error scenarios

### E2E Tests
- Test complete voucher selection flow
- Test responsive design
- Test accessibility

## Future Enhancements

1. **Personalization**: Hiển thị voucher phù hợp với user profile
2. **Recommendations**: Gợi ý voucher tốt nhất cho đơn hàng
3. **Analytics**: Track voucher usage và conversion rates
4. **A/B Testing**: Test different UI layouts
5. **Progressive Web App**: Offline voucher caching

## Accessibility

### Keyboard Navigation
- Tab navigation through voucher list
- Enter key to select voucher
- Escape key to close voucher list

### Screen Readers
- ARIA labels cho voucher cards
- Descriptive text cho voucher information
- Status announcements cho actions

### Color Contrast
- Đảm bảo contrast ratio đạt chuẩn WCAG
- Không chỉ dựa vào màu sắc để truyền tải thông tin