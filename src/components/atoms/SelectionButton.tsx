import { SelectRootSlotProps } from '@mui/base';
import Icon from './Icon';
import React from 'react';

const SelectionButton = React.forwardRef(function Button<
	TValue extends Record<string, never>,
	Multiple extends boolean
>(
	props: SelectRootSlotProps<TValue, Multiple> & { defaultValue?: string },
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const { ...other } = props;

	return (
		<button type="button" {...other} ref={ref}>
			{props.defaultValue || other.children}
			<Icon name="MdArrowDropDown" size={24} color="primary-700" />
		</button>
	);
});

export default SelectionButton;
