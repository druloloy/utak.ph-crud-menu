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
			className={`grid grid-row-6 max-w-80 w-full shadow-lg rounded-xl pb-4 ${selected ? 'border-4 border-secondary-500 shadow-none' : ''}`}>
			<section
				className={`row-span-4 w-full aspect-square overflow-hidden rounded-lg`}>
				<img
					src={thumbnail}
					alt={name}
					className="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-all"
				/>
			</section>

			<section className="row-span-2 h-full flex flex-col items-start justify-between p-4">
				<section className="flex flex-col gap-2">
					<h3 className="h3 font-bold line-clamp-2">{name}</h3>
					<section className="w-full grid grid-cols-2 gap-2">
						{options &&
							Object.entries(options).map(([key, value]) => (
								<OptionItem
									key={key}
									name={key}
									price={value.price}
									cost={value.cost}
									stocks={value.stocks}
									currency={currency}
								/>
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
					// <section className="w-full flex flex-col items-center justify-center flex-wrap px-8 py-2 bg-primary-50 border border-primary-300 rounded-lg">
					// 	<section className="w-full flex flex-row items-center justify-center">
					// 		<h3 className="h3 font-bold flex flex-row">
					// 			{currency}
					// 			{price.toLocaleString()}
					// 		</h3>
					// 	</section>

					// 	<section className="w-full flex flex-row items-center justify-between gap-2">
					// 		<p className="body font-bold whitespace-nowrap flex flex-row gap-2 items-center justify-center">
					// 			<Icon
					// 				name="MdCurrencyExchange"
					// 				size={18}
					// 				color="black"
					// 			/>
					// 			{currency}
					// 			{cost.toLocaleString()}
					// 		</p>
					// 		<p className="body font-bold flex flex-row gap-2 items-center justify-center">
					// 			<Icon
					// 				name="MdStorage"
					// 				size={18}
					// 				color="black"
					// 			/>
					// 			{stocks}
					// 		</p>
					// 	</section>
					// </section>
				)}
			</section>
		</section>
	);
};

export default BaseProductCard;
