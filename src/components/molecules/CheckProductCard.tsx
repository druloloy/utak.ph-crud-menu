import BaseProductCard from '@atoms/BaseProductCard';
import Icon from '@atoms/Icon';
import useProduct from 'hooks/useProduct';
import React, { useEffect } from 'react';

import { CheckProductCardProps } from '@types';
import API from 'services/api';

const CheckProductCard: React.FC<CheckProductCardProps> = ({
	checked,
	setValue,
	fields,
	...props
}) => {
	const [toggle, setToggle] = React.useState<boolean>(false);
	const { openModal, products } = useProduct();

	useEffect(() => {
		// unchecl when checked is false
		if (!checked && setValue) {
			setToggle(false);
			setValue(fields.name, []);
		}
	}, [checked, setValue, fields.name]);

	return (
		<label className="relative group">
			{checked && (
				<input
					{...fields}
					type="checkbox"
					checked={toggle}
					onChange={() => {
						if (setValue) {
							setValue(
								fields.name,
								!toggle
									? [...fields.value, props.id]
									: fields.value.filter(
											(id: string) => id !== props.id
										)
							);
						}
						setToggle(!toggle);
					}}
					hidden
				/>
			)}
			<section className="flex lg:group-hover:flex duration-300 transition-all lg:hidden absolute z-10 top-5 right-5 rounded-full px-2 bg-white flex-row justify-between items-center gap-2 py-1">
				<button onClick={() => openModal(props.id)}>
					<Icon
						className="hover:text-black/75 duration-300 transition-all"
						name="MdEdit"
						size={24}
						color="black"
					/>
				</button>
				<button
					onClick={() => {
						if (!props?.id) return;
						API.deleteProduct(props.id, products);
					}}>
					<Icon
						className="hover:text-black/75 duration-300 transition-all"
						name="MdDelete"
						size={24}
						color="black"
					/>
				</button>
			</section>
			<BaseProductCard {...props} selected={checked && toggle} />
		</label>
	);
};

export default CheckProductCard;
