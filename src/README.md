# Jewelry Shop Frontend V2 - Cấu trúc dự án

## Cây thư mục

```
jewelry-shop/frontend-v2/
├── public/                     # Thư mục chứa file tĩnh public
│   └── vite.svg               # Icon Vite
├── src/                       # Thư mục source code chính
│   ├── apis/                  # Thư mục chứa API endpoints và React Query hooks
│   │   ├── products/          # API cho products
│   │   │   ├── product.api.ts # Định nghĩa endpoints cho products
│   │   │   ├── useProducts.ts # React Query hooks cho products
│   │   │   └── index.ts       # Export products API
│   │   └── index.ts           # Export tất cả APIs
│   ├── assets/                # Thư mục chứa tài nguyên tĩnh
│   │   └── react.svg          # Icon React
│   ├── components/            # Thư mục chứa components dùng chung nhiều page
│   │   ├── ui/                # UI components cơ bản
│   │   │   └── button.tsx     # Component Button tái sử dụng
│   │   ├── Footer.tsx         # Component Footer (dùng chung)
│   │   └── Header.tsx         # Component Header (dùng chung)
│   ├── configs/               # Thư mục chứa các file cấu hình
│   │   ├── instances.ts       # Cấu hình axios instance cho API calls
│   │   └── index.ts           # Export configs
│   ├── layouts/               # Thư mục chứa layout components
│   │   ├── MainLayout.tsx     # Layout chính với Header/Footer
│   │   └── index.ts           # Export layouts
│   ├── lib/                   # Thư mục chứa utility functions
│   │   └── utils.ts           # Các hàm tiện ích chung
│   ├── pages/                 # Thư mục chứa các trang
│   │   └── home/              # Trang chủ
│   │       ├── components/    # Components chỉ dùng cho trang chủ
│   │       │   ├── BenefitsSection.tsx       # Section hiển thị lợi ích
│   │       │   ├── ContactSection.tsx        # Section liên hệ
│   │       │   ├── FAQSection.tsx           # Section câu hỏi thường gặp
│   │       │   ├── FeaturesSection.tsx      # Section tính năng
│   │       │   ├── GuaranteeSection.tsx     # Section bảo hành
│   │       │   ├── HeroSection.tsx          # Section hero banner
│   │       │   ├── ProductGrid.tsx          # Grid hiển thị sản phẩm
│   │       │   ├── ProductShowcase.tsx      # Showcase sản phẩm nổi bật
│   │       │   ├── PromotionSection.tsx     # Section khuyến mãi
│   │       │   └── TestimonialsSection.tsx  # Section đánh giá khách hàng
│   │       └── page.tsx       # Component trang chủ
│   ├── types/                 # Thư mục chứa type definitions
│   │   ├── api.type.ts        # Types cho API responses
│   │   ├── product.type.ts    # Types cho Product
│   │   ├── home.type.ts       # Types cho trang chủ
│   │   └── index.ts           # Export tất cả types
│   ├── App.css               # CSS cho App component
│   ├── App.tsx               # Component App chính
│   ├── index.css             # CSS global
│   ├── main.tsx              # Entry point của ứng dụng
│   ├── routes.tsx            # Cấu hình routing
│   └── vite-env.d.ts         # Type declarations cho Vite
├── .gitignore                # File ignore cho Git
├── bun.lockb                 # Lock file của Bun package manager
├── components.json           # Cấu hình shadcn/ui components
├── eslint.config.js          # Cấu hình ESLint
├── index.html                # File HTML chính
├── package.json              # Thông tin dự án và dependencies
├── README.md                 # Documentation dự án
├── tsconfig.app.json         # Cấu hình TypeScript cho app
├── tsconfig.json             # Cấu hình TypeScript chính
├── tsconfig.node.json        # Cấu hình TypeScript cho Node.js
└── vite.config.ts            # Cấu hình Vite build tool
```

## Mô tả các thư mục chính

### `/src/apis/` - API Endpoints và Hooks

Chứa các API endpoints và React Query hooks:

- **products/**: API và hooks cho products
  - **product.api.ts**: Định nghĩa các endpoint API
  - **useProducts.ts**: React Query hooks cho CRUD operations
  - **index.ts**: Export APIs và hooks
- **index.ts**: Export tất cả APIs

### `/src/components/` - Components dùng chung

Chứa các React components có thể tái sử dụng ở nhiều page:

- **ui/**: Các component UI cơ bản (button, input, modal, etc.)
- **Header.tsx**: Component Header dùng chung cho tất cả các page
- **Footer.tsx**: Component Footer dùng chung cho tất cả các page

### `/src/configs/` - Cấu hình ứng dụng

Chứa các file cấu hình cho ứng dụng:

- **instances.ts**: Cấu hình axios instance để call API
- **index.ts**: Export tất cả configs

### `/src/layouts/`

Chứa các layout template có thể sử dụng chung cho nhiều trang:

- **MainLayout**: Layout chính với Header và Footer

### `/src/pages/`

Chứa các trang của ứng dụng, mỗi trang được tổ chức trong thư mục riêng:

- **home/**: Trang chủ
  - **components/**: Components chỉ dùng cho trang chủ
  - **page.tsx**: Component chính của trang chủ

### `/src/types/`

Chứa các type definitions và interfaces TypeScript:

- **api.type.ts**: Generic types cho API responses
- **product.type.ts**: Types cho Product và query parameters
- **home.type.ts**: Types cho trang chủ
- **index.ts**: Export tất cả types

### `/src/lib/`

Chứa các utility functions và helper functions:

- **utils.ts**: Các hàm tiện ích chung

### `/src/assets/`

Chứa các tài nguyên tĩnh như hình ảnh, icons

## Nguyên tắc tổ chức Components

### 🔄 **Components dùng chung** (`/src/components/`)

- Header, Footer
- UI components cơ bản (Button, Input, Modal, etc.)
- Components được sử dụng ở 2+ trang khác nhau

### 📄 **Components riêng theo trang** (`/src/pages/[page]/components/`)

- Components chỉ dùng trong 1 trang cụ thể
- Giúp tránh clutter trong thư mục components chung
- Dễ dàng tìm kiếm và bảo trì

## Quy ước đặt tên

- **Components**: PascalCase (VD: `HeaderComponent.tsx`)
- **Pages**: snake_case cho thư mục, PascalCase cho file (VD: `home/page.tsx`)
- **Types**: snake_case với suffix `.type.ts` (VD: `home.type.ts`)
- **APIs**: snake_case với suffix `.api.ts` (VD: `product.api.ts`)
- **Hooks**: camelCase với prefix `use` (VD: `useProducts.ts`)
- **Utilities**: camelCase (VD: `utils.ts`)

## Cách sử dụng Layout

```tsx
import { MainLayout } from '@/layouts';

const YourPage = () => {
	return <MainLayout>{/* Nội dung trang của bạn */}</MainLayout>;
};
```

## Cách import Components

### Import components dùng chung:

```tsx
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
```

### Import components riêng của trang:

```tsx
import HeroSection from './components/HeroSection';
import ContactSection from './components/ContactSection';
```

## Cách sử dụng API với React Query

### Import APIs và hooks:

```tsx
import { productApi, useProducts, useProduct } from '@/apis';
// hoặc
import { useProducts, useCreateProduct } from '@/apis/products';
```

### Sử dụng Query hooks:

```tsx
// Lấy danh sách sản phẩm với pagination
const { data, isLoading, error } = useProducts({
	page: 1,
	limit: 10,
	categoryId: 'category-id',
	isFeatured: true,
});

// Lấy chi tiết sản phẩm
const { data: product } = useProduct('product-id');

// Lấy sản phẩm nổi bật
const { data: featuredProducts } = useFeaturedProducts();

// Tìm kiếm sản phẩm
const { data: searchResults } = useSearchProducts({
	search: 'nhẫn vàng',
	page: 1,
	limit: 20,
});
```

### Sử dụng Mutation hooks:

```tsx
// Tạo sản phẩm mới
const createProductMutation = useCreateProduct({
	onSuccess: (data) => {
		console.log('Tạo sản phẩm thành công:', data);
	},
	onError: (error) => {
		console.error('Lỗi tạo sản phẩm:', error);
	},
});

// Thực hiện tạo sản phẩm
const handleCreate = () => {
	createProductMutation.mutate({
		productName: 'Nhẫn Kim cương',
		description: 'Nhẫn kim cương đẹp',
		price: 5000000,
		weight: 3.5,
		material: 'Vàng 18k',
		stockQuantity: 10,
		categoryId: 'category-id',
	});
};

// Cập nhật sản phẩm
const updateProductMutation = useUpdateProduct();

// Xóa sản phẩm
const deleteProductMutation = useDeleteProduct();
```

### Query Parameters hỗ trợ:

- **page**: Số trang (default: 1)
- **limit**: Số items per page (default: 10)
- **categoryId**: Lọc theo category
- **isFeatured**: Lọc sản phẩm nổi bật
- **material**: Lọc theo chất liệu
- **minPrice/maxPrice**: Lọc theo khoảng giá
- **search**: Tìm kiếm theo tên
- **sortBy**: Sắp xếp theo ('price', 'createdAt', 'views', 'productName')
- **sortOrder**: Thứ tự sắp xếp ('asc', 'desc')

## Cách sử dụng API trực tiếp (không dùng hooks)

```tsx
import { api } from '@/configs';
import { productApi } from '@/apis';

// Sử dụng API instance trực tiếp
const getProducts = async () => {
	try {
		const response = await api.get('/products');
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};

// Sử dụng product API
const getProducts2 = async () => {
	try {
		const response = await productApi.getProducts({ page: 1, limit: 10 });
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
	}
};
```

### Cấu hình API:

- **Base URL**: `http://localhost:8000/api`
- **Timeout**: 10 giây
- **Headers**: Tự động thêm `Content-Type` và `Accept` là `application/json`
- **Authentication**: Tự động thêm `Bearer token` từ localStorage nếu có
- **Error Handling**: Xử lý tự động các lỗi 401, 403, 404, 422, 500
- **Logging**: Log requests/responses trong development mode

## Tech Stack

- **React 18** với TypeScript
- **Vite** cho build tool
- **Tailwind CSS** cho styling
- **Axios** cho HTTP client
- **TanStack Query (React Query)** cho data fetching và caching
- **Bun** cho package manager
- **ESLint** cho code linting
