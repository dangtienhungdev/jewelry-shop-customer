import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
	className?: string;
	fullWidth?: boolean;
	containerClassName?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
	children,
	className = '',
	fullWidth = false,
	containerClassName = '',
}) => {
	return (
		<div
			className={`bg-white text-gray-900 min-h-screen flex flex-col ${className}`}
		>
			<Header />
			<main
				className={`flex-1 ${
					fullWidth ? 'w-full' : 'max-w-7xl mx-auto w-full'
				} ${fullWidth ? '' : 'px-6'} ${containerClassName}`}
			>
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
