export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	thumbnail: string;
	price: number;
	cost: number;
	stocks: number;
	options?: string;
};

export type ProductCategoryType = {
	slug: string;
	name: string;
};
