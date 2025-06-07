export interface Product {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	description?: string;
	category?: string;
}

export interface Feature {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export interface Testimonial {
	id: string;
	name: string;
	location: string;
	rating: number;
	comment: string;
	avatarUrl: string;
}

export interface FAQ {
	id: string;
	question: string;
	answer: string;
}

export interface ContactForm {
	name: string;
	email: string;
	address: string;
	product: string;
	note?: string;
}
