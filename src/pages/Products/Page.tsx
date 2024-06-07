import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import PageContainer from '@atoms/PageContainer';
import SelectionField from '@molecules/SelectionField';
import ProductGroup from '@organisms/ProductGroup';
import SearchBar from '@organisms/SearchBar';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useProduct from 'hooks/useProduct';
import API from 'services/api';

const Actions = {
	delete: 'Bulk Delete'
};

type BulkSelectFields = {
	'bulk-action': keyof typeof Actions | '';
	products: string[];
};

const Page = () => {
	const { openModal, products } = useProduct();
	const [toggleBulkSelect, setToggleBulkSelect] =
		React.useState<boolean>(false);

	const methods = useForm<BulkSelectFields>({
		defaultValues: {
			'bulk-action': '',
			products: []
		},
		mode: 'onChange'
	});

	const submitBulkAction = (data: BulkSelectFields) => {
		if (data['bulk-action'] === 'delete') {
			const requests: Promise<void>[] = [];

			data.products.forEach((id) => {
				requests.push(API.deleteProduct(id, products));
			});
		}
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
					{products === undefined ||
					Object.keys(products).length === 0 ? (
						<section className="flex flex-row items-center gap-x-2 flex-wrap">
							<p className="subtext mt-4 font-bold">
								You haven't added any product yet.
								<span
									className="underline cursor-pointer ms-1"
									onClick={() => openModal('')}>
									Create your first product.
								</span>
							</p>
						</section>
					) : (
						Object.keys(products).map((category) => (
							<ProductGroup
								key={category}
								name="products"
								title={category}
								toggleBulkSelect={toggleBulkSelect}
								products={products[category]}
							/>
						))
					)}
				</section>
			</FormProvider>
		</PageContainer>
	);
};

export default Page;
