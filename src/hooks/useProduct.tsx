import { ProductContext, ProductContextProps } from 'contexts/ProductsContext';
import { useContext } from 'react';

const useProduct = (): ProductContextProps =>
	useContext(ProductContext) as ProductContextProps;

export default useProduct;
