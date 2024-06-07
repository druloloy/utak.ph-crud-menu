import { MemoizedMenuModal } from '@organisms/MenuModal';
import { ProductContext } from 'contexts/ProductsContext';
import React, { useEffect } from 'react';
import { ProductItemType } from '@types';
import API from 'services/api';

const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [isUpdateModalOpen, setIsUpdateModalOpen] =
		React.useState<boolean>(false);
	const [itemId, setItemId] = React.useState<string>('');
	const [products, setProducts] = React.useState<
		Record<string, ProductItemType[]> | undefined
	>();
	const [categories, setCategories] = React.useState<
		Record<string, string> | undefined
	>();
	const [item, setItem] = React.useState<ProductItemType | null>();
	const [loadingItem, setLoadingItem] = React.useState<boolean>(false);

	useEffect(() => {
		if (itemId) {
			setLoadingItem(true);
			API.getProduct(itemId).then((data) => {
				setItem(data);
				setLoadingItem(false);
			});
		}
	}, [itemId]);

	useEffect(() => {
		API.getCategories().then((data) => {
			setCategories(data as Record<string, string>);
		});
	}, []);

	useEffect(() => {
		const products: Record<string, ProductItemType[]> = {};
		const requests: Promise<ProductItemType[]>[] = [];
		if (categories) {
			console.log(categories);
			Object.entries(categories).forEach(([slug, category]) => {
				products[category as string] = [];
				requests.push(API.getProductsByCategory(slug));
			});

			Promise.all(requests).then((data) => {
				data.forEach((item) => {
					item.forEach((p) => {
						products[p.category].push(p);
					});
					setProducts(products);
				});
			});
		}
	}, [categories]);

	const openModal = async (id: string | undefined) => {
		setLoadingItem(true);
		if (id) {
			setItemId(id);

			// fetch and set item here
			await API.getProduct(id).then((data) => {
				setItem(data);
			});
		}

		setLoadingItem(false);
		setIsUpdateModalOpen(true);
	};

	const closeModal = () => {
		setItem(null);
		setIsUpdateModalOpen(false);
		setItemId('');
	};

	return (
		<ProductContext.Provider
			value={{
				isUpdateModalOpen,
				itemId,
				closeModal,
				openModal,
				setProducts,
				products
			}}>
			{children}
			{loadingItem ? null : (
				<MemoizedMenuModal
					open={isUpdateModalOpen}
					closeModal={closeModal}
					item={item}
					setProducts={setProducts}
				/>
			)}
		</ProductContext.Provider>
	);
};

export default ProductsProvider;
