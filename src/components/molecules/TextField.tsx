import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import BaseInput from '@atoms/BaseInput';
import { TextFieldProps } from '@types';
import FieldLabel from '@atoms/FieldLabel';
import FieldError from '@atoms/FieldError';

const TextField: React.FC<TextFieldProps> = ({
	name,
	label,
	type,
	placeholder,
	TrailingIcon,
	LeadingIcon,
	rules,
	required
}) => {
	const {
		control,
		formState: { errors }
	} = useFormContext();

	const error = errors[name]?.message as string;
	return (
		<section className="flex flex-col text-left">
			<Controller
				name={name}
				control={control}
				rules={rules[name]}
				render={({ field }) => (
					<section className="flex flex-col text-left">
						<FieldLabel text={label} required={required} />
						<BaseInput
							{...field}
							type={type}
							placeholder={placeholder}
							LeadingIcon={LeadingIcon}
							TrailingIcon={TrailingIcon}
						/>
						<FieldError text={error} />
					</section>
				)}
			/>
		</section>
	);
};

export default TextField;
