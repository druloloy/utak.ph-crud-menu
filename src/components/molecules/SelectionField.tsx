import BaseSelect from '@atoms/BaseSelect';
import FieldError from '@atoms/FieldError';
import FieldLabel from '@atoms/FieldLabel';
import SelectionButton from '@atoms/SelectionButton';
import SelectionOption from '@atoms/SelectionOption';
import { prepareForSlot } from '@mui/base';
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectionFieldProps } from '@types';

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

	useEffect(() => {
		console.log('defaultValue', defaultValue);
		setValue(name, defaultValue);
	}, [defaultValue, name, setValue]);

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
							defaultValue={
								optionsArray.find(
									(pair) => pair[0] === defaultValue
								)?.[1] || ''
							}
							onChange={(event) => {
								const matchedPair = optionsArray.find(
									(pair) =>
										pair[1] ==
										((event?.target as HTMLInputElement)
											.textContent as string)
								);
								setValue(
									name,
									(matchedPair &&
										(matchedPair[0] as string)) ||
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
