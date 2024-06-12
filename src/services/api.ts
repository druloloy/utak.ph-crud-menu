import { ProductItemType } from '@types';
import { Database, Storage } from './firebase';

function addItemToMenu(
	item: ProductItemType,
	products: Record<string, ProductItemType[]> | undefined
) {
	const updatedData = { ...products };

	if (!updatedData[item.category]) {
		updatedData[item?.category] = [];
	}

	updatedData[item.category].push(item);
	return updatedData;
}

function updateItemInMenu(
	item: ProductItemType,
	products: Record<string, ProductItemType[]> | undefined
) {
	const updatedData = { ...products };
	updatedData[item.category] = updatedData[item.category].map((i) => {
		if (i.id === item.id) {
			return item;
		}
		return i;
	});
	return updatedData;
}

function removeItemById(
	itemId: string,
	products: Record<string, ProductItemType[]> | undefined
) {
	const updatedData = { ...products };
	for (const category in updatedData) {
		updatedData[category] = updatedData[category].filter(
			(item) => item.id !== itemId
		);
	}
	return updatedData;
}

const API = {
	getProduct: async (id: string) => {
		const response = await Database.readData<ProductItemType>(
			'menu_items',
			id
		);
		return response;
	},
	getAllProducts: async () => {
		const response =
			await Database.readAllData<Record<string, ProductItemType>>(
				'menu_items'
			);

		if (!response) {
			return [];
		}
		// convert result to array

		return Object.values(response);
	},
	createProduct: async (
		data: ProductItemType,
		products?: Record<string, ProductItemType[]>
	) => {
		return await Database.writeData<ProductItemType>(
			data,
			'menu_items'
		).then(() => {
			return addItemToMenu(data, products);
		});
	},
	updateProduct: async (
		data: ProductItemType,
		products?: Record<string, ProductItemType[]>
	) => {
		return await Database.updateData<ProductItemType>(
			data,
			'menu_items'
		).then(() => {
			return updateItemInMenu(data, products);
		});
	},
	deleteProduct: async (
		id: string,
		products?: Record<string, ProductItemType[]>
	) => {
		return await Database.deleteData('menu_items', id).then(() => {
			Storage.deleteImage('products', id);
			return removeItemById(id, products);
		});
	},
	getProductsByCategory: async (category: string) => {
		const response =
			await Database.readAllData<Record<string, ProductItemType>>(
				'menu_items'
			);

		if (!response) {
			return [];
		}
		return Object.values(response).filter(
			(item) => item.categorySlug === category
		);
	},
	getCategories: async () => {
		const response =
			await Database.readAllData<Record<string, string>>('categories');
		return response;
	},
	uploadImage: async (imageStr: string, fileId: string) => {
		const response = await Storage.uploadFile(imageStr, 'products', fileId);
		return await Storage.getImageUrl(response.ref);
	}
};

export default API;
