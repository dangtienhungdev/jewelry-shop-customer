import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

interface MainLayoutProps {
	children: React.ReactNode;
	className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
	children,
	className = '',
}) => {
	return (
		<div className={`bg-white text-gray-900 ${className}`}>
			<Header />
			<main className="max-w-7xl mx-auto px-6">{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
