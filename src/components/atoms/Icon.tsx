import React from 'react';
import * as MdIcons from 'react-icons/md';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import { ColorsType } from 'types';

export type IconTypes = keyof typeof MdIcons;

interface IconProps {
	name: IconTypes;
	size: number;
	color?: ColorsType;
	className?: string;
	onClick?: React.MouseEventHandler<SVGElement>;
}

const iconColor: Record<ColorsType, string> = {
	'primary-50': 'text-primary-50',
	'primary-100': 'text-primary-100',
	'primary-200': 'text-primary-200',
	'primary-300': 'text-primary-300',
	'primary-400': 'text-primary-400',
	'primary-500': 'text-primary-500',
	'primary-600': 'text-primary-600',
	'primary-700': 'text-primary-700',
	'primary-800': 'text-primary-800',
	'primary-900': 'text-primary-900',
	'primary-950': 'text-primary-950',

	'secondary-50': 'text-secondary-50',
	'secondary-100': 'text-secondary-100',
	'secondary-200': 'text-secondary-200',
	'secondary-300': 'text-secondary-300',
	'secondary-400': 'text-secondary-400',
	'secondary-500': 'text-secondary-500',
	'secondary-600': 'text-secondary-600',
	'secondary-700': 'text-secondary-700',
	'secondary-800': 'text-secondary-800',
	'secondary-900': 'text-secondary-900',
	'secondary-950': 'text-secondary-950',

	black: 'text-black',
	white: 'text-white'
};

const getIconComponent = (name: IconTypes): IconType => {
	const icons = MdIcons as Record<string, React.ComponentType>;
	return icons[name as keyof typeof icons] as IconType;
};

const Icon: React.FC<IconProps> = ({
	name,
	size,
	color = 'primary-500',
	onClick,
	className
}) => {
	const IconComponent = getIconComponent(name);

	const iconClickable = clsx({
		'cursor-pointer transition duration-300 hover:scale-110': onClick
	});

	return (
		<IconComponent
			className={`${iconColor[color]} ${iconClickable} ${className}`}
			size={size}
			onClick={onClick}
		/>
	);
};

export default Icon;
