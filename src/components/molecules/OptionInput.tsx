import Icon from '@atoms/Icon';
import Pill from '@atoms/Pill';
import { TextareaAutosize } from '@mui/base';
import React from 'react';
import {
	Controller,
	FieldValues,
	RegisterOptions,
	UseFormGetValues,
	UseFormRegister,
	useFieldArray,
	useFormContext
} from 'react-hook-form';
import BaseInput from '@atoms/BaseInput';
import FieldLabel from '@atoms/FieldLabel';
import FieldError from '@atoms/FieldError';

type Props = {
	name: string;
	rules: Record<string, RegisterOptions>;
	placeholder?: string;
	label?: string;
	required?: boolean;
};

type OptionItemProps = {
	name: string;
	removeItem: () => void;
	getValues: UseFormGetValues<FieldValues>;
};

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

const OptionInput: React.FC<Props> = ({
	name,
	rules,
	placeholder,
	label,
	required
}) => {
	const inputName = `${name}-input`;
	const {
		control,
		register,
		getValues,
		setValue,
		formState: { errors }
	} = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name,
		rules: rules[name]
	});

	const addItem = () => {
		const value: string = getValues(inputName);
		if (!value) return;
		append(value.trim());
		setValue(inputName, '');
	};

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
								<FieldLabel text={label} />
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
									<OptionItem
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
