import React from 'react';

export interface ProductContextProps {
	isUpdateModalOpen: boolean;
	itemId?: string;
	openModal: (id: string | undefined) => void;
	closeModal: () => void;
}

export const ProductContext = React.createContext<ProductContextProps | null>(
	null
);
