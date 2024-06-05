import Pill from '@atoms/Pill';
import React from 'react';
import { ProductCardProps } from '@types';

const BaseProductCard: React.FC<ProductCardProps> = ({
	image,
	name,
	stock,
	price,
	cost,
	options,
	selected,
	currency
}) => {
	return (
		<section
			className={`grid grid-row-6 max-w-80 w-full shadow-lg rounded-xl pb-4 ${selected ? 'border-4 border-secondary-500 shadow-none' : ''}`}>
			<section
				className={`row-span-4 w-full aspect-square overflow-hidden rounded-lg`}>
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover group-hover:scale-125 duration-1000 transition-all"
				/>
			</section>

			<section className="row-span-2 h-full flex flex-col items-start justify-between p-4 gap-4">
				<section className="flex flex-col">
					<h3 className="h3 font-bold line-clamp-2">{name}</h3>
					<section className="w-full flex flex-row items-center gap-2 flex-wrap">
						{options?.map((option, index) => (
							<Pill key={index} color="primary-500">
								{option}
							</Pill>
						))}
					</section>
				</section>

				<section className="w-full flex flex-row items-end justify-between flex-wrap">
					<section className="flex flex-col items-start">
						<h3 className="h3 font-bold break-all">
							{currency}
							{price.toLocaleString()}
						</h3>
						<p className="caption font-bold whitespace-nowrap">
							Cost: {currency}
							{cost}
						</p>
					</section>

					<section className="">
						<p className="caption font-bold">Stock: {stock}</p>
					</section>
				</section>
			</section>
		</section>
	);
};

export default BaseProductCard;