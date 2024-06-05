import React from 'react';
import { ColorsType, PillProps } from '@types';

const borderColor: Record<ColorsType, string> = {
	'primary-50': 'border-primary-50',
	'primary-100': 'border-primary-100',
	'primary-200': 'border-primary-200',
	'primary-300': 'border-primary-300',
	'primary-400': 'border-primary-400',
	'primary-500': 'border-primary-500',
	'primary-600': 'border-primary-600',
	'primary-700': 'border-primary-700',
	'primary-800': 'border-primary-800',
	'primary-900': 'border-primary-900',
	'primary-950': 'border-primary-950',

	'secondary-50': 'border-secondary-50',
	'secondary-100': 'border-secondary-100',
	'secondary-200': 'border-secondary-200',
	'secondary-300': 'border-secondary-300',
	'secondary-400': 'border-secondary-400',
	'secondary-500': 'border-secondary-500',
	'secondary-600': 'border-secondary-600',
	'secondary-700': 'border-secondary-700',
	'secondary-800': 'border-secondary-800',
	'secondary-900': 'border-secondary-900',
	'secondary-950': 'border-secondary-950',

	black: 'border-black',
	white: 'border-white'
};

const Pill: React.FC<PillProps> = ({ children, color, ...props }) => {
	return (
		<span
			{...props}
			className={`${props.className} ${borderColor[color]} pill`}>
			{children}
		</span>
	);
};

export default Pill;
