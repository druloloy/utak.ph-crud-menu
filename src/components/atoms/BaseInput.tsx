import React from 'react';
import { Input } from '@mui/base/Input';
import { InputType } from 'types';

const BaseInput = React.forwardRef(function CustomInput(
	props: InputType,
	ref: React.ForwardedRef<HTMLInputElement>
) {
	const { placeholder, LeadingIcon, TrailingIcon, ...field } = props;

	return (
		<Input
			{...field}
			ref={ref}
			type={props.type}
			className="textfield"
			placeholder={placeholder}
			startAdornment={LeadingIcon}
			endAdornment={TrailingIcon}
		/>
	);
});

export default BaseInput;
