export type ProductItemType = {
	id: string;
	category: string;
	name: string;
	thumbnail: string;
	price?: number | null;
	cost?: number | null;
	stocks?: number | null;
	categorySlug?: string;
	options?: {
		[key: string]: {
			price: number | string;
			cost: number | string;
			stocks: number | string;
		};
	} | null;
	updatedAt?: number | Date | null;
	createdAt?: number | Date | null;
};

export type ProductCategoryType = {
	slug: string;
	name: string;
};
