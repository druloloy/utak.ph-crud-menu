export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	thumbnail: string;
	price: number;
	cost: number;
	stocks: number;
	categorySlug?: string;
	options?: string | string[];
	updatedAt?: number | Date;
	createdAt?: number | Date;
};

export type ProductCategoryType = {
	slug: string;
	name: string;
};
