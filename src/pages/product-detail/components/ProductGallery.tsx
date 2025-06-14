import React, { useState } from 'react';

const ProductGallery: React.FC = () => {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	// Mock data - trong thực tế sẽ từ props hoặc API
	const images = [
		'https://storage.googleapis.com/a1aa/image/b02ea04f-f3f7-40b9-f3a7-4a76e7290d2f.jpg',
		'https://storage.googleapis.com/a1aa/image/cbae6a4e-dc18-4a66-4ffe-11a5e4f314c5.jpg',
		'https://storage.googleapis.com/a1aa/image/681e5adf-fe2f-4e76-d9c2-58a2791a8080.jpg',
		'https://storage.googleapis.com/a1aa/image/bfd5e730-456c-4baa-cc91-ea3e356a09ce.jpg',
	];

	return (
		<div className="flex-1 lg:w-1/2">
			{/* Main Image */}
			<div className="bg-white border border-gray-200 rounded-md p-4 mb-4">
				<img
					alt="Product main image"
					className="w-full h-[400px] object-contain rounded-md"
					src={images[selectedImageIndex]}
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.src = 'https://via.placeholder.com/400x400?text=No+Image';
					}}
				/>
			</div>

			{/* Thumbnail Images */}
			<div className="grid grid-cols-4 gap-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setSelectedImageIndex(index)}
						className={`border-2 rounded-md p-1 transition-all ${
							selectedImageIndex === index
								? 'border-[#C28B1B] ring-2 ring-[#C28B1B] ring-opacity-50'
								: 'border-gray-200 hover:border-[#C28B1B]'
						}`}
					>
						<img
							alt={`Product thumbnail ${index + 1}`}
							className="w-full h-20 object-contain rounded"
							src={image}
							onError={(e) => {
								const target = e.target as HTMLImageElement;
								target.src = 'https://via.placeholder.com/80x80?text=No+Image';
							}}
						/>
					</button>
				))}
			</div>

			{/* Image Navigation */}
			<div className="flex justify-center items-center mt-4 space-x-4">
				<button
					onClick={() =>
						setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))
					}
					disabled={selectedImageIndex === 0}
					className={`p-2 rounded-full transition-colors ${
						selectedImageIndex === 0
							? 'text-gray-400 cursor-not-allowed'
							: 'text-[#C28B1B] hover:bg-[#C28B1B] hover:text-white'
					}`}
				>
					<i className="fas fa-chevron-left"></i>
				</button>
				<span className="text-sm text-gray-600">
					{selectedImageIndex + 1} / {images.length}
				</span>
				<button
					onClick={() =>
						setSelectedImageIndex(
							Math.min(images.length - 1, selectedImageIndex + 1)
						)
					}
					disabled={selectedImageIndex === images.length - 1}
					className={`p-2 rounded-full transition-colors ${
						selectedImageIndex === images.length - 1
							? 'text-gray-400 cursor-not-allowed'
							: 'text-[#C28B1B] hover:bg-[#C28B1B] hover:text-white'
					}`}
				>
					<i className="fas fa-chevron-right"></i>
				</button>
			</div>
		</div>
	);
};

export default ProductGallery;
