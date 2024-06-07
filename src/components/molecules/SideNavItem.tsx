import Icon, { IconTypes } from '@atoms/Icon';
import React from 'react';
import { ColorsType, SideNavItemProps } from '@types';

const textColor: Record<ColorsType, string> = {
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

const SideNavItem: React.FC<SideNavItemProps & { showText?: boolean }> = ({
	to,
	children,
	iconName,
	color,
	isActive,
	showText
}) => {
	return (
		<li role="listitem" className={`nav-item ${isActive ? 'active' : ''}`}>
			<a href={to || '/'}>
				<Icon color={color} name={iconName} size={24} />
				{showText && (
					<span className={textColor[color]}>{children}</span>
				)}
			</a>
		</li>
	);
};

export default SideNavItem;
