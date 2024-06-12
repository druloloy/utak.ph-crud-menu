import { Switch, SwitchProps } from '@mui/base';
import clsx from 'clsx';
import React from 'react';

const resolveSlotProps = (fn: unknown, args: unknown) =>
	typeof fn === 'function' ? fn(args) : fn;

const BaseSwitch = React.forwardRef<HTMLSpanElement, SwitchProps>(
	(props, ref) => {
		return (
			<Switch
				ref={ref}
				{...props}
				slotProps={{
					...props.slotProps,
					root: (ownerState) => {
						const resolvedSlotProps = resolveSlotProps(
							props.slotProps?.root,
							ownerState
						);

						return {
							...resolvedSlotProps,
							className: clsx(
								`group relative inline-block w-[38px] h-[24px] m-2.5 ${
									ownerState.disabled
										? 'cursor-not-allowed opacity-40'
										: 'cursor-pointer'
								}`,
								resolvedSlotProps?.className
							)
						};
					},
					input: (ownerState) => {
						const resolvedSlotProps = resolveSlotProps(
							props.slotProps?.input,
							ownerState
						);
						return {
							...resolvedSlotProps,
							className: clsx(
								'cursor-inherit absolute w-full h-full top-0 left-0 opacity-0 z-10 border-none',
								resolvedSlotProps?.className
							)
						};
					},
					track: (ownerState) => {
						const resolvedSlotProps = resolveSlotProps(
							props.slotProps?.track,
							ownerState
						);

						return {
							...resolvedSlotProps,
							className: clsx(
								`absolute block w-full h-full transition rounded-full border border-solid outline-none border-primary-300 group-[.base--focusVisible]:shadow-outline-switch
                        ${
							ownerState.checked
								? 'bg-primary-500'
								: 'bg-primary-100  hover:bg-primary-200'
						} `,
								resolvedSlotProps?.className
							)
						};
					},
					thumb: (ownerState) => {
						const resolvedSlotProps = resolveSlotProps(
							props.slotProps?.thumb,
							ownerState
						);
						return {
							...resolvedSlotProps,
							className: clsx(
								`block w-4 h-4 top-1 rounded-2xl border border-solid outline-none border-primary-300 transition shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] ${
									ownerState.checked
										? 'left-[18px] bg-white shadow-[0_0_0_rgb(0_0_0_/_0.3)]'
										: 'left-[4px] bg-white'
								}  relative transition-all`,
								resolvedSlotProps?.className
							)
						};
					}
				}}
			/>
		);
	}
);

export default BaseSwitch;
