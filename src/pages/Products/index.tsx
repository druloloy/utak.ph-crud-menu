import ProductsProvider from 'providers/ProductsProvider';
import Page from './Page';

export default function Products() {
	return (
		<ProductsProvider>
			<Page />
		</ProductsProvider>
	);
}
