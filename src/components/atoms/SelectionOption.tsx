import { Option, OptionOwnerState, OptionProps } from '@mui/base';
import React from 'react';

const getOptionColorClasses = ({
	selected,
	highlighted,
	disabled
}: Partial<OptionOwnerState<number | string>>) => {
	let classes = '';

	if (disabled) {
		classes += ' opacity-50';
		return classes;
	}

	if (selected) {
		classes += ' bg-primary-100 text-black';
	} else if (highlighted) {
		classes += ' bg-primary-200';
	}

	classes += ' hover:bg-primary-300 hover:text-primary-900';
	classes +=
		' focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-400';

	return classes;
};

const SelectionOption = React.forwardRef<
	HTMLLIElement,
	OptionProps<number | string>
>((props, ref) => {
	return (
		<Option
			ref={ref}
			{...props}
			slotProps={{
				root: ({ selected, highlighted, disabled }) => ({
					className: `${getOptionColorClasses({
						selected,
						highlighted,
						disabled
					})}`
				})
			}}
		/>
	);
});

export default SelectionOption;
