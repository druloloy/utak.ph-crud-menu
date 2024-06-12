import { ProductItemType } from '@types';
import { Database, DatabasePath, Storage, StoragePath } from './firebase';

const __DEV__ = import.meta.env.DEV;
const dbPath: DatabasePath = __DEV__ ? 'staging_menu_items' : 'menu_items';
const storagePath: StoragePath = __DEV__ ? 'staging_products' : 'products';

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
		const response = await Database.readData<ProductItemType>(dbPath, id);
		return response;
	},
	getAllProducts: async () => {
		const response =
			await Database.readAllData<Record<string, ProductItemType>>(dbPath);

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
		return await Database.writeData<ProductItemType>(data, dbPath).then(
			() => {
				return addItemToMenu(data, products);
			}
		);
	},
	updateProduct: async (
		data: ProductItemType,
		products?: Record<string, ProductItemType[]>
	) => {
		return await Database.updateData<ProductItemType>(data, dbPath).then(
			() => {
				return updateItemInMenu(data, products);
			}
		);
	},
	deleteProduct: async (
		id: string,
		products?: Record<string, ProductItemType[]>
	) => {
		return await Database.deleteData(dbPath, id).then(() => {
			Storage.deleteImage(storagePath, id);
			return removeItemById(id, products);
		});
	},
	getProductsByCategory: async (category: string) => {
		const response =
			await Database.readAllData<Record<string, ProductItemType>>(dbPath);

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
		const response = await Storage.uploadFile(
			imageStr,
			storagePath,
			fileId
		);
		return await Storage.getImageUrl(response.ref);
	}
};

export default API;
