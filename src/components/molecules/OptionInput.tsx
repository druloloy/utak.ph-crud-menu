import Icon from '@atoms/Icon';
import Pill from '@atoms/Pill';
import React, { useCallback, useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import BaseInput from '@atoms/BaseInput';
import FieldLabel from '@atoms/FieldLabel';
import FieldError from '@atoms/FieldError';
import { OptionInputProps, OptionItemProps } from '@types';

const OptionItem: React.FC<OptionItemProps> = ({
	name,
	removeItem,
	getValues
}) => {
	return (
		<Pill color="secondary-300">
			{getValues(name)}
			<Icon name="MdClose" color="black" size={18} onClick={removeItem} />
		</Pill>
	);
};

const MemoizedOptionItem = React.memo(OptionItem);

const OptionInput: React.FC<OptionInputProps> = ({
	name,
	rules,
	placeholder,
	label,
	required,
	options
}) => {
	const inputName = `${name}-input`;
	const {
		control,
		getValues,
		setValue,
		formState: { errors }
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name,
		shouldUnregister: true,
		rules: rules[name]
	});

	useEffect(() => {
		if (options) {
			append(options);
			setValue(inputName, '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const addItem = useCallback(() => {
		const value: string = getValues(inputName);
		if (!value) return;
		append(value.trim());
		setValue(inputName, '');
	}, [append, getValues, inputName, setValue]);

	useEffect(() => {
		const addItemOnEnter = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				addItem();
			}
		};

		window.addEventListener('keydown', addItemOnEnter);
		return () => window.removeEventListener('keydown', addItemOnEnter);
	}, [addItem]);

	const removeItem = (index: number) => remove(index);

	return (
		<section className="flex flex-col">
			<Controller
				name={inputName}
				rules={rules[inputName]}
				control={control}
				render={({ field }) => {
					return (
						<section className="flex flex-col w-full gap-2">
							<section className="flex flex-col text-left">
								<FieldLabel text={label} required={required} />
								<BaseInput
									{...field}
									type="text"
									placeholder={placeholder}
									TrailingIcon={
										<Icon
											name="MdAdd"
											size={24}
											color="primary-400"
											onClick={addItem}
										/>
									}
								/>
								<FieldError
									text={errors[inputName]?.message as string}
								/>
							</section>

							<section className="flex flex-row flex-wrap gap-2">
								{fields.map((field, index) => (
									<MemoizedOptionItem
										key={field.id}
										name={`${name}.${index}`}
										removeItem={() => removeItem(index)}
										getValues={getValues}
									/>
								))}
							</section>
						</section>
					);
				}}
			/>
		</section>
	);
};

export default OptionInput;
