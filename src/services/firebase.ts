import { initializeApp } from '@firebase/app';
import {
	getDatabase,
	ref as dbRef,
	set,
	update,
	get
} from '@firebase/database';
import {
	StorageReference,
	deleteObject,
	getDownloadURL,
	getStorage,
	ref as storageRef,
	uploadString
} from '@firebase/storage';
import { ProductItemType } from '@types';

type StoragePath = 'thumbnails' | 'products';
type DatabasePath = 'menu_items' | 'categories';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

const Storage = {
	uploadFile: async (str: string, path: StoragePath, filename: string) => {
		const ref = storageRef(storage, `${path}/${filename}`);
		return await uploadString(ref, str, 'data_url');
	},

	getImageUrl: async (ref: StorageReference) => {
		return await getDownloadURL(ref);
	},

	deleteImage: async (path: StoragePath, filename: string) => {
		const ref = storageRef(storage, `${path}/${filename}`);
		return await deleteObject(ref);
	}
};

const Database = {
	writeData: async function <T>(
		data: T extends Record<
			string,
			string | number | boolean | null | undefined | Date
		>
			? T
			: ProductItemType,
		path: DatabasePath
	) {
		const ref = dbRef(database, `/${path}/${data.id}`);
		await set(ref, data);
	},
	readData: async function <T>(path: DatabasePath, id?: string) {
		const ref = dbRef(database, id ? `/${path}/${id}` : `/${path}`);
		return get(ref).then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val() as T;
			}

			return null;
		}) as Promise<T | null>;
	},
	readAllData: async function <T>(path: DatabasePath) {
		const ref = dbRef(database, `/${path}`);
		return get(ref).then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val() as T;
			}

			return null;
		}) as Promise<T | null>;
	},
	updateData: async function <T>(
		data: T extends Record<
			string,
			string | number | boolean | null | undefined | Date
		>
			? T
			: ProductItemType,
		path: DatabasePath
	) {
		const ref = dbRef(database, `/${path}/${data.id}`);
		return update(ref, data);
	},
	deleteData: async function (path: DatabasePath, id: string) {
		const ref = dbRef(database, `/${path}/${id}`);
		return await set(ref, null);
	}
};

export { app, database, storage, dbRef, storageRef, Storage, Database };
