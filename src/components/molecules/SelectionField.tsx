import BaseSelect from '@atoms/BaseSelect';
import FieldError from '@atoms/FieldError';
import FieldLabel from '@atoms/FieldLabel';
import SelectionButton from '@atoms/SelectionButton';
import SelectionOption from '@atoms/SelectionOption';
import { prepareForSlot } from '@mui/base';
import React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';

interface SelectionFieldProps {
	name: string;
	rules: Record<string, RegisterOptions>;
	options: { [key: string]: string | number };
	placeholder: string;
	label?: string;
	defaultValue?: string;
	required?: boolean;
}

const ButtonSlot = prepareForSlot(SelectionButton);

const SelectionField: React.FC<SelectionFieldProps> = ({
	name,
	label,
	rules,
	options,
	defaultValue,
	placeholder,
	required
}) => {
	const optionsArray = React.useMemo(() => {
		let entries: [string, string | number][] = [];
		if (options) {
			entries = Object.entries(options).sort((a, b) => {
				if (a[1] < b[1]) {
					return -1;
				}
				if (a[1] > b[1]) {
					return 1;
				}
				return 0;
			});
		}
		return entries;
	}, [options]);
	const {
		control,
		setValue,
		formState: { errors }
	} = useFormContext();

	return (
		<section className="flex flex-col text-left">
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field: { name, ref } }) => (
					<section className="flex flex-col text-left">
						<FieldLabel text={label} required={required} />
						<BaseSelect
							component={ButtonSlot}
							ref={ref}
							name={name}
							defaultValue={defaultValue || ''}
							onChange={(event) => {
								const matchedPair = optionsArray.find(
									([key]) =>
										key ==
										((event?.target as HTMLInputElement)
											.textContent as string)
								);
								setValue(
									name,
									(matchedPair &&
										(matchedPair[1] as string)) ||
										null
								);
							}}>
							<SelectionOption value="" disabled>
								{placeholder}
							</SelectionOption>
							{optionsArray.map(([key, value]) => (
								<SelectionOption
									key={key as string}
									value={key as string}>
									{value as string}
								</SelectionOption>
							))}
						</BaseSelect>
						<FieldError text={errors[name]?.message as string} />
					</section>
				)}
			/>
		</section>
	);
};

export default SelectionField;
