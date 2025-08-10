# Test Cases - Tính Năng Chọn Voucher

## Test Scenarios

### 1. **Hiển thị danh sách voucher**

#### Test Case 1.1: Load voucher list successfully
- **Precondition**: User đang ở trang payment
- **Steps**:
  1. Click "Xem voucher có sẵn"
  2. Đợi loading spinner
- **Expected Result**:
  - Loading spinner hiển thị
  - Danh sách voucher hiển thị sau khi load xong
  - Số lượng voucher hiển thị đúng

#### Test Case 1.2: No vouchers available
- **Precondition**: Không có voucher nào đang hoạt động
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Thông báo "Chưa có voucher nào được phát hành"
  - Hướng dẫn "Shop sẽ phát hành voucher trong thời gian sớm nhất"
  - Icon gift hiển thị

#### Test Case 1.3: No vouchers published by shop
- **Precondition**: Shop chưa phát hành voucher nào
- **Steps**:
  1. Mở trang payment
- **Expected Result**:
  - Thông báo "Shop chưa phát hành voucher nào"
  - Hướng dẫn "Hãy theo dõi để nhận thông báo khi có voucher mới"
  - Nút "Xem voucher có sẵn" không hiển thị

#### Test Case 1.4: API error
- **Precondition**: API trả về lỗi
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Thông báo lỗi hiển thị
  - Fallback về form nhập mã thủ công

#### Test Case 1.5: Vouchers exist but not suitable for order
- **Precondition**: Có voucher nhưng không phù hợp với giá trị đơn hàng
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Thông báo "Không có voucher phù hợp với đơn hàng này"
  - Hướng dẫn "Đơn hàng cần có giá trị tối thiểu để sử dụng voucher"
  - Icon info-circle hiển thị

### 2. **Lọc voucher theo điều kiện**

#### Test Case 2.1: Filter by order value
- **Precondition**: Có voucher với minOrderValue = 1,000,000đ
- **Steps**:
  1. Tạo đơn hàng với giá trị 500,000đ
  2. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Voucher không hiển thị trong danh sách
  - Thông báo "Đơn hàng cần có giá trị tối thiểu"

#### Test Case 2.2: Filter by usage limit
- **Precondition**: Voucher đã đạt giới hạn sử dụng
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Voucher không hiển thị trong danh sách
  - Hoặc hiển thị nhưng disabled

#### Test Case 2.3: Filter by date range
- **Precondition**: Voucher đã hết hạn
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Voucher không hiển thị trong danh sách

### 3. **Chọn voucher**

#### Test Case 3.1: Select percentage voucher
- **Precondition**: Có voucher giảm 10% tối đa 100,000đ
- **Steps**:
  1. Click vào voucher
- **Expected Result**:
  - Voucher được áp dụng
  - Giảm giá được tính đúng
  - Thông báo thành công hiển thị

#### Test Case 3.2: Select fixed amount voucher
- **Precondition**: Có voucher giảm 50,000đ
- **Steps**:
  1. Click vào voucher
- **Expected Result**:
  - Voucher được áp dụng
  - Giảm giá 50,000đ được áp dụng
  - Thông báo thành công hiển thị

#### Test Case 3.3: Replace existing voucher
- **Precondition**: Đã có voucher được áp dụng
- **Steps**:
  1. Click vào voucher khác
- **Expected Result**:
  - Voucher cũ bị thay thế
  - Voucher mới được áp dụng
  - Giảm giá được tính lại

### 4. **Tính toán giảm giá**

#### Test Case 4.1: Percentage with max limit
- **Precondition**: Voucher 10% tối đa 100,000đ, đơn hàng 2,000,000đ
- **Steps**:
  1. Áp dụng voucher
- **Expected Result**:
  - Giảm giá = 100,000đ (không phải 200,000đ)

#### Test Case 4.2: Percentage without max limit
- **Precondition**: Voucher 10% không giới hạn, đơn hàng 1,000,000đ
- **Steps**:
  1. Áp dụng voucher
- **Expected Result**:
  - Giảm giá = 100,000đ

#### Test Case 4.3: Fixed amount
- **Precondition**: Voucher giảm 50,000đ
- **Steps**:
  1. Áp dụng voucher
- **Expected Result**:
  - Giảm giá = 50,000đ

### 5. **UI/UX Testing**

#### Test Case 5.1: Responsive design
- **Precondition**: Test trên mobile
- **Steps**:
  1. Mở trang payment trên mobile
  2. Click "Xem voucher có sẵn"
- **Expected Result**:
  - UI hiển thị đúng trên mobile
  - Scroll hoạt động tốt
  - Touch interactions mượt mà

#### Test Case 5.2: Keyboard navigation
- **Precondition**: Sử dụng keyboard
- **Steps**:
  1. Tab đến nút "Xem voucher có sẵn"
  2. Enter để mở danh sách
  3. Tab qua các voucher
  4. Enter để chọn voucher
- **Expected Result**:
  - Focus indicator hiển thị rõ ràng
  - Keyboard navigation hoạt động đúng
  - Screen reader announcements

#### Test Case 5.3: Loading states
- **Precondition**: Slow network
- **Steps**:
  1. Click "Xem voucher có sẵn"
  2. Đợi loading
- **Expected Result**:
  - Loading spinner hiển thị
  - Disabled state cho buttons
  - Smooth transition khi load xong

### 6. **Error Handling**

#### Test Case 6.1: Network error
- **Precondition**: Mất kết nối mạng
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Error message hiển thị
  - Retry option có sẵn
  - Fallback to manual input

#### Test Case 6.2: Invalid voucher data
- **Precondition**: API trả về data không hợp lệ
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Error handling graceful
  - Không crash ứng dụng

### 7. **Performance Testing**

#### Test Case 7.1: Large voucher list
- **Precondition**: Có 100+ voucher
- **Steps**:
  1. Click "Xem voucher có sẵn"
- **Expected Result**:
  - Load time < 2 seconds
  - Smooth scrolling
  - Memory usage ổn định

#### Test Case 7.2: Caching behavior
- **Precondition**: Đã load voucher list
- **Steps**:
  1. Click "Xem voucher có sẵn" lần nữa
- **Expected Result**:
  - Load instantly từ cache
  - Không gọi API lại

### 8. **Integration Testing**

#### Test Case 8.1: Complete checkout flow
- **Precondition**: User có items trong cart
- **Steps**:
  1. Đi đến trang payment
  2. Chọn voucher từ danh sách
  3. Hoàn tất thanh toán
- **Expected Result**:
  - Voucher được áp dụng đúng
  - Order được tạo với discount
  - Payment process hoàn tất

#### Test Case 8.2: Voucher validation
- **Precondition**: Voucher có điều kiện đặc biệt
- **Steps**:
  1. Chọn voucher từ danh sách
  2. Thay đổi đơn hàng (thêm/bớt items)
- **Expected Result**:
  - Voucher được validate lại
  - Thông báo nếu không còn hợp lệ

## Test Data

### Sample Vouchers
```json
[
  {
    "discountCode": "WELCOME10",
    "discountName": "Giảm giá chào mừng",
    "discountType": "percentage",
    "discountValue": 10,
    "minOrderValue": 1000000,
    "maxDiscountAmount": 100000
  },
  {
    "discountCode": "SALE500K",
    "discountName": "Giảm giá mùa sale",
    "discountType": "fixed",
    "discountValue": 500000,
    "minOrderValue": 5000000
  }
]
```

### Test Orders
- Order 1: 500,000đ (không đủ điều kiện voucher)
- Order 2: 1,500,000đ (đủ điều kiện WELCOME10)
- Order 3: 6,000,000đ (đủ điều kiện cả 2 voucher)

## Automation Scripts

### Cypress Test
```javascript
describe('Voucher Selection', () => {
  it('should display available vouchers', () => {
    cy.visit('/payment')
    cy.get('[data-testid="show-vouchers"]').click()
    cy.get('[data-testid="voucher-list"]').should('be.visible')
  })

  it('should apply selected voucher', () => {
    cy.get('[data-testid="voucher-item"]').first().click()
    cy.get('[data-testid="applied-discount"]').should('contain', '100,000')
  })
})
```

### Jest Unit Test
```javascript
describe('Voucher Filtering', () => {
  it('should filter vouchers by order value', () => {
    const vouchers = getAvailableVouchers(500000)
    expect(vouchers).toHaveLength(0)
  })

  it('should calculate discount correctly', () => {
    const discount = calculateVoucherDiscount(voucher, 2000000)
    expect(discount).toBe(100000)
  })
})
```