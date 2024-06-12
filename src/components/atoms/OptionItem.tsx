import { OptionItemProps } from '@types';
import Icon from './Icon';

const OptionItem: React.FC<OptionItemProps> = ({
	name,
	removeItem,
	price,
	cost,
	stocks,
	currency,
	onClick,
	index
}) => {
	const curr = currency ? currency : '';
	return (
		<section
			title={`
			 Price: ${curr}${price.toLocaleString()}\nCost: ${curr}${cost.toLocaleString()}\nStocks: ${stocks}
			`}
			className="relative w-full flex flex-col justify-center items-center p-2 bg-primary-50 border border-primary-300 rounded-lg gap-2"
			onClick={() =>
				onClick &&
				onClick({
					name,
					price,
					cost,
					stocks,
					index
				})
			}>
			{removeItem && (
				<Icon
					className="absolute top-2 right-2"
					onClick={removeItem}
					name="MdClose"
					size={16}
					color="black"
				/>
			)}

			<p className="subtext text-center font-bold">{name}</p>
			<section className="w-full flex flex-row flex-wrap items-start justify-between gap-2">
				<p className="caption flex flex-row items-center justify-center gap-1">
					<Icon name="MdAttachMoney" size={24} color="black" />
					{curr}
					{price.toLocaleString()}
				</p>
				<p className="caption flex flex-row items-center justify-center gap-1">
					<Icon name="MdCurrencyExchange" size={24} color="black" />
					{curr}
					{cost.toLocaleString()}
				</p>
				<p className="caption flex flex-row items-center justify-center gap-1">
					<Icon name="MdStorage" size={24} color="black" /> {stocks}
				</p>
			</section>
		</section>
	);
};

export default OptionItem;
