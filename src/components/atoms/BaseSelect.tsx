import { Select, SelectProps } from '@mui/base';
import clsx from 'clsx';
import React from 'react';

const resolveSlotProps = (fn: unknown, args: unknown) =>
	typeof fn === 'function' ? fn(args) : fn;

const BaseSelect = React.forwardRef(function CustomSelect<
	TValue extends string | number,
	Multiple extends boolean
>(
	props: SelectProps<TValue, Multiple> & { component: React.ElementType },
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const { component, ...otherProps } = props;

	return (
		<Select
			ref={ref}
			{...props}
			className={clsx('selection-field', otherProps.className)}
			slots={{
				root: component
			}}
			slotProps={{
				...otherProps.slotProps,
				root: (ownerstate) => {
					const resolvedSlotProps = resolveSlotProps(
						otherProps.slotProps?.root,
						ownerstate
					);
					return {
						...resolvedSlotProps,
						className: resolvedSlotProps?.className
					};
				},
				listbox: (ownerstate) => {
					const resolvedSlotProps = resolveSlotProps(
						otherProps.slotProps?.listbox,
						ownerstate
					);
					return {
						...resolvedSlotProps,
						className: clsx(
							`listbox `,
							resolvedSlotProps?.className
						)
					};
				},
				popup: (ownerstate) => {
					const resolvedSlotProps = resolveSlotProps(
						otherProps.slotProps?.popup,
						ownerstate
					);
					return {
						...resolvedSlotProps,
						className: clsx(`z-20`, resolvedSlotProps?.className)
					};
				}
			}}
		/>
	);
});

export default BaseSelect;
