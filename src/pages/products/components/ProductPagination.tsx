import React, { useState } from 'react';

const ProductPagination: React.FC = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const totalPages = 5; // Mock data - trong thực tế sẽ tính từ API

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top khi chuyển trang
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handlePrevPage = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pages = [];
		const startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, currentPage + 2);

		// Thêm trang đầu nếu cần
		if (startPage > 1) {
			pages.push(
				<button
					key={1}
					onClick={() => handlePageChange(1)}
					className="border border-[#C49A4A] px-3 py-1 hover:bg-[#C49A4A] hover:text-white transition-colors"
				>
					1
				</button>
			);
			if (startPage > 2) {
				pages.push(
					<span key="dots1" className="px-2">
						...
					</span>
				);
			}
		}

		// Thêm các trang xung quanh trang hiện tại
		for (let i = startPage; i <= endPage; i++) {
			pages.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`border border-[#C49A4A] px-3 py-1 transition-colors ${
						currentPage === i
							? 'bg-[#C49A4A] text-white'
							: 'hover:bg-[#C49A4A] hover:text-white'
					}`}
				>
					{i}
				</button>
			);
		}

		// Thêm trang cuối nếu cần
		if (endPage < totalPages) {
			if (endPage < totalPages - 1) {
				pages.push(
					<span key="dots2" className="px-2">
						...
					</span>
				);
			}
			pages.push(
				<button
					key={totalPages}
					onClick={() => handlePageChange(totalPages)}
					className="border border-[#C49A4A] px-3 py-1 hover:bg-[#C49A4A] hover:text-white transition-colors"
				>
					{totalPages}
				</button>
			);
		}

		return pages;
	};

	return (
		<div className="flex justify-center items-center space-x-2 mt-8 mb-16 text-xs font-semibold text-[#C49A4A]">
			{/* Nút Previous */}
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 1}
				className={`border border-[#C49A4A] px-3 py-1 transition-colors ${
					currentPage === 1
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-[#C49A4A] hover:text-white'
				}`}
			>
				<i className="fas fa-angle-double-left"></i>
			</button>

			{/* Số trang */}
			{renderPageNumbers()}

			{/* Nút Next */}
			<button
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className={`border border-[#C49A4A] px-3 py-1 transition-colors ${
					currentPage === totalPages
						? 'opacity-50 cursor-not-allowed'
						: 'hover:bg-[#C49A4A] hover:text-white'
				}`}
			>
				<i className="fas fa-angle-double-right"></i>
			</button>
		</div>
	);
};

export default ProductPagination;
