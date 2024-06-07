import Icon from '@atoms/Icon';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ProductGroupProps } from '@types';
import CheckProductCard from '@molecules/CheckProductCard';

const ProductGroup: React.FC<ProductGroupProps> = ({
	title,
	name,
	products,
	toggleBulkSelect
}) => {
	const [hideGroup, sethideGroup] = React.useState<boolean>(false);
	const { control, setValue } = useFormContext();

	return (
		<section className={`w-full flex flex-col items-start gap-4`}>
			<section className="lg:sticky lg:top-0 bg-white/20 backdrop-blur-md w-full flex flex-row items-center justify-start gap-4 p-4">
				<h2 className="h2 font-bold">{title}</h2>
				<Icon
					name={hideGroup ? 'MdExpandLess' : 'MdExpandMore'}
					size={32}
					color="black"
					onClick={() => sethideGroup(!hideGroup)}
				/>
			</section>
			<Controller
				name={name}
				rules={{
					validate: {
						length: (value) => value.length > 0
					}
				}}
				control={control}
				render={({ field }) => (
					<ul
						className={`w-full h-auto ${!hideGroup ? 'flex py-4' : 'hidden'} ${toggleBulkSelect && !hideGroup ? 'border border-primary-600' : ''} overflow-hidden flex-row justify-start gap-8 flex-wrap md:px-16 lg:px-32`}>
						{products.map((product) => (
							<li key={product.id} className="list-none">
								<CheckProductCard
									setValue={setValue}
									fields={field}
									checked={!!toggleBulkSelect}
									{...product}
								/>
							</li>
						))}
					</ul>
				)}
			/>
		</section>
	);
};

export default ProductGroup;
