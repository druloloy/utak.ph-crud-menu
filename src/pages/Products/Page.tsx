import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import PageContainer from '@atoms/PageContainer';
import ProductCard from '@atoms/BaseProductCard';
import SelectionField from '@molecules/SelectionField';
import ProductGroup from '@organisms/ProductGroup';
import SearchBar from '@organisms/SearchBar';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import MenuModal from '@organisms/MenuModal';
import ProductsProvider from 'providers/ProductsProvider';
import useProduct from 'hooks/useProduct';

const Actions = {
	edit: 'Bulk Edit',
	delete: 'Bulk Delete'
};

const Page = () => {
	const { openModal } = useProduct();
	const [toggleBulkSelect, setToggleBulkSelect] =
		React.useState<boolean>(false);

	const methods = useForm({
		defaultValues: {
			'bulk-action': '',
			products: []
		},
		mode: 'onChange'
	});

	const submitBulkAction = (data) => {
		console.log(data);
	};

	const selectedProducts = methods.watch('products');

	return (
		<PageContainer className="pe-4">
			<SearchBar />
			<FormProvider {...methods}>
				<form
					onSubmit={methods.handleSubmit(submitBulkAction)}
					className="flex flex-col mt-6">
					<section className="flex flex-row items-center justify-start gap-2 flex-wrap">
						<Button
							type="button"
							buttonStyle="primary"
							onClick={() => openModal('')}>
							<Icon name="MdAdd" size={24} color="white" />
							<span className="ml-2">New Item</span>
						</Button>
						<Button
							type="button"
							className={`${toggleBulkSelect ? 'bg-secondary-300 border-secondary-300' : ''}`}
							onClick={() =>
								setToggleBulkSelect(!toggleBulkSelect)
							}
							buttonStyle="secondary">
							<Icon
								name="MdOutlineChecklist"
								size={24}
								color="black"
							/>
							<span className="ml-2">Bulk Select</span>
						</Button>
						{toggleBulkSelect && (
							<section className="md:ps-8 flex flex-row items-center justify-start gap-2 flex-wrap">
								<SelectionField
									rules={{ action: { required: true } }}
									options={Actions}
									name="bulk-action"
									placeholder="Select Bulk Action"
									required
								/>

								<Button type="submit" buttonStyle="primary">
									Apply ({selectedProducts.length})
								</Button>
								<Button
									type="button"
									buttonStyle="secondary"
									onClick={() => setToggleBulkSelect(false)}>
									Cancel
								</Button>
							</section>
						)}
					</section>
				</form>

				{toggleBulkSelect && (
					<p className="caption mt-4 font-bold">
						Select items to perform action.
					</p>
				)}

				<section className="mt-8">
					<ProductGroup
						name="products"
						title="Fritters"
						toggleBulkSelect={toggleBulkSelect}
						products={[
							{
								id: '113123',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '21',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '112',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							}
						]}
					/>
					<ProductGroup
						name="products"
						title="Drinks"
						toggleBulkSelect={toggleBulkSelect}
						products={[
							{
								id: '113',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '22',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '23',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '14',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '24',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '15',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '2245',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '1567',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							},
							{
								id: '26',
								image: 'https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg',
								name: 'Fries',
								stock: 10,
								price: 10,
								cost: 5,
								options: ['Medium', 'Large'],
								currency: '₱'
							}
						]}
					/>
				</section>
			</FormProvider>
		</PageContainer>
	);
};

export default Page;
