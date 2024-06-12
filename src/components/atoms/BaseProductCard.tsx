import React from 'react';
import { ProductCardProps } from '@types';
import OptionItem from './OptionItem';

const BaseProductCard: React.FC<ProductCardProps> = ({
	thumbnail,
	name,
	stocks,
	price,
	cost,
	options,
	selected,
	currency
}) => {
	console.log(name, options);
	return (
		<section
			className={`grid grid-row-6 max-w-96 w-full shadow-lg rounded-xl pb-4 ${selected ? 'border-4 border-secondary-500 shadow-none' : ''}`}>
			<section
				className={`row-span-4 w-full aspect-square overflow-hidden rounded-lg`}>
				<img
					src={thumbnail}
					alt={name}
					className="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-all"
				/>
			</section>

			<section className="w-full h-full flex flex-col items-start justify-between p-4">
				<section className="w-full flex flex-col gap-2">
					<h3 className="h3 font-bold line-clamp-2">{name}</h3>
					<section className="relative w-full flex flex-row flex-wrap gap-2">
						{options &&
							Object.entries(options).map(([key, value]) => (
								<section className="basis-1/3 flex-1">
									<OptionItem
										key={key}
										name={key}
										price={value.price}
										cost={value.cost}
										stocks={value.stocks}
										currency={currency}
									/>
								</section>
							))}
					</section>
				</section>

				{!!price && !!cost && !!stocks && (
					<OptionItem
						name={'Regular'}
						price={price}
						cost={cost}
						stocks={stocks}
						currency={currency}
					/>
				)}
			</section>
		</section>
	);
};

export default BaseProductCard;
