# Jewelry Shop Frontend V2 - Cấu trúc dự án

## Cây thư mục

```
jewelry-shop/frontend-v2/
├── public/                     # Thư mục chứa file tĩnh public
│   └── vite.svg               # Icon Vite
├── src/                       # Thư mục source code chính
│   ├── assets/                # Thư mục chứa tài nguyên tĩnh
│   │   └── react.svg          # Icon React
│   ├── components/            # Thư mục chứa components dùng chung nhiều page
│   │   ├── ui/                # UI components cơ bản
│   │   │   └── button.tsx     # Component Button tái sử dụng
│   │   ├── Footer.tsx         # Component Footer (dùng chung)
│   │   └── Header.tsx         # Component Header (dùng chung)
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
│   │   └── home.type.ts       # Types cho trang chủ
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

### `/src/components/` - Components dùng chung

Chứa các React components có thể tái sử dụng ở nhiều page:

- **ui/**: Các component UI cơ bản (button, input, modal, etc.)
- **Header.tsx**: Component Header dùng chung cho tất cả các page
- **Footer.tsx**: Component Footer dùng chung cho tất cả các page

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

- **home.type.ts**: Types cho trang chủ

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

## Tech Stack

- **React 18** với TypeScript
- **Vite** cho build tool
- **Tailwind CSS** cho styling
- **Bun** cho package manager
- **ESLint** cho code linting
