import { ProductItemType } from '@types';
import React from 'react';

export interface ProductContextProps {
	isUpdateModalOpen: boolean;
	itemId?: string;
	openModal: (id: string | undefined) => void;
	closeModal: () => void;
	products: Record<string, ProductItemType[]> | undefined;
	setProducts: React.Dispatch<
		React.SetStateAction<Record<string, ProductItemType[]> | undefined>
	>;
}

export const ProductContext = React.createContext<ProductContextProps | null>(
	null
);
