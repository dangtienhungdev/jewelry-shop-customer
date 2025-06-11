import { MainLayout } from '@/layouts';
import React from 'react';
import DeliveryInfo from './components/DeliveryInfo';
import OrderSummary from './components/OrderSummary';
import PaymentBreadcrumb from './components/PaymentBreadcrumb';

const PaymentPage: React.FC = () => {
	return (
		<MainLayout>
			<div className="mb-24">
				<PaymentBreadcrumb />
				<section className="flex flex-col lg:flex-row gap-6">
					<DeliveryInfo />
					<OrderSummary />
				</section>
			</div>
		</MainLayout>
	);
};

export default PaymentPage;
