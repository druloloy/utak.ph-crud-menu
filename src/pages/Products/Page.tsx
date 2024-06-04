import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import PageContainer from '@atoms/PageContainer';
import ProductCard from '@molecules/ProductCard';
import SelectionField from '@molecules/SelectionField';
import SearchBar from '@organisms/SearchBar';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const Page = () => {
	const [toggleBulkSelect, setToggleBulkSelect] =
		React.useState<boolean>(false);
	const methods = useForm();
	return (
		<PageContainer className="pe-4">
			<SearchBar />
			<FormProvider {...methods}>
				<section className="flex flex-col mt-6">
					<section className="flex flex-row items-center justify-start gap-2 flex-wrap">
						<Button buttonStyle="primary">
							<Icon name="MdAdd" size={24} color="white" />
							<span className="ml-2">New Item</span>
						</Button>
						<Button
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
									rules={{}}
									options={{
										select: 'Bulk Select',
										edit: 'Bulk Edit',
										delete: 'Bulk Delete'
									}}
									name="bulk-select"
									placeholder="Select Bulk Action"
								/>

								<Button buttonStyle="primary">Apply</Button>
								<Button
									buttonStyle="secondary"
									onClick={() => setToggleBulkSelect(false)}>
									Cancel
								</Button>
							</section>
						)}
					</section>
				</section>

				<section className="w-full h-fit flex flex-row justify-start gap-8 flex-wrap mt-16 px-32">
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries and Mcdownalds with food in can"
						stock={10}
						price={10000000}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
					<ProductCard
						image="https://d3bjzufjcawald.cloudfront.net/public/web/2024-03-07/65e934e80364e/Menu_Fries_500x500_FriesMedium-500.jpg"
						name="Fries"
						stock={10}
						price={10}
						cost={5}
						options={['Medium', 'Large']}
						currency="₱"
					/>
				</section>
			</FormProvider>
		</PageContainer>
	);
};

export default Page;
