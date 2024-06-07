import MenuModal from '@organisms/MenuModal';
import { ProductContext } from 'contexts/ProductsContext';
import React from 'react';
import { ProductItemType } from '@types';

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [isUpdateModalOpen, setIsUpdateModalOpen] =
		React.useState<boolean>(false);
	const [itemId, setItemId] = React.useState<string>('');
	const [item, setItem] = React.useState<ProductItemType | undefined>(
		undefined
	);

	const openModal = (id: string | undefined) => {
		if (id) {
			setItemId(id);
			console.log('open modal', id);
			// fetch and set item here
		}
		setIsUpdateModalOpen(true);
	};

	const closeModal = () => {
		setIsUpdateModalOpen(false);
		setItemId('');
	};

	// fetch product when ID is hydrated

	return (
		<ProductContext.Provider
			value={{
				isUpdateModalOpen,
				itemId,
				closeModal,
				openModal
			}}>
			{children}
			<MenuModal
				open={isUpdateModalOpen}
				closeModal={closeModal}
				item={item}
			/>
		</ProductContext.Provider>
	);
};

export default ProductsProvider;
