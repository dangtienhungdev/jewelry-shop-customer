import { Button } from '@/components/ui/button';
import type { FAQ } from '@/types/home.type';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const faqs: FAQ[] = [
	{
		id: '1',
		question: 'Nhẫn đá quý có bền không?',
		answer:
			'Nhẫn đá quý được làm từ chất liệu cao cấp, có độ bền cao và khó bị trầy xước.',
	},
	{
		id: '2',
		question: 'Làm sao để chọn nhẫn phù hợp?',
		answer:
			'Bạn nên chọn nhẫn phù hợp với kích thước ngón tay và phong thủy của mình.',
	},
	{
		id: '3',
		question: 'Chính sách bảo hành như thế nào?',
		answer:
			'Chúng tôi bảo hành sản phẩm trong vòng 12 tháng với các lỗi kỹ thuật.',
	},
	{
		id: '4',
		question: 'Có thể đổi trả nếu không hài lòng?',
		answer: 'Bạn có thể đổi trả trong vòng 30 ngày nếu sản phẩm không đúng ý.',
	},
];

const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="mb-3 border border-[#b87a1f] rounded p-3">
			<button
				className="w-full flex justify-between items-center cursor-pointer font-semibold text-left"
				onClick={() => setIsOpen(!isOpen)}
			>
				{faq.question}
				{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
			</button>
			{isOpen && <p className="mt-2 text-gray-700">{faq.answer}</p>}
		</div>
	);
};

const FAQSection: React.FC = () => {
	return (
		<section className="mt-20 max-w-7xl mx-auto px-6">
			<h3 className="text-[#b87a1f] font-semibold text-sm md:text-base mb-6 max-w-3xl mx-auto text-center">
				Câu hỏi thường gặp
			</h3>
			<div className="max-w-4xl mx-auto text-xs md:text-sm text-gray-900">
				{faqs.map((faq) => (
					<FAQItem key={faq.id} faq={faq} />
				))}
			</div>
			<div className="mt-6 max-w-4xl mx-auto text-center">
				<p className="mb-4 text-xs md:text-sm">Bạn có câu hỏi nào khác?</p>
				<Button className="text-xs md:text-sm font-semibold py-2 px-6">
					Gửi câu hỏi
				</Button>
			</div>
		</section>
	);
};

export default FAQSection;
