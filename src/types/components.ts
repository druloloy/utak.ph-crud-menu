import { IconTypes } from '@atoms/Icon';
import { SingleLineInputProps } from '@mui/base';

type ButtonStyle = 'primary' | 'secondary' | 'basic';
type ButtonSize = 'sm' | 'md' | 'lg';

export type InputType = {
	type: 'number' | 'text' | 'email' | 'password' | 'date';
	label?: string;
	placeholder?: string;
	TrailingIcon?: React.ReactElement;
	LeadingIcon?: React.ReactElement;
} & Omit<SingleLineInputProps, 'type' | 'startAdornment' | 'endAdornment'>;

export type ColorsType =
	| 'primary-50'
	| 'primary-100'
	| 'primary-200'
	| 'primary-300'
	| 'primary-400'
	| 'primary-500'
	| 'primary-600'
	| 'primary-700'
	| 'primary-800'
	| 'primary-900'
	| 'primary-950'
	| 'secondary-50'
	| 'secondary-100'
	| 'secondary-200'
	| 'secondary-300'
	| 'secondary-400'
	| 'secondary-500'
	| 'secondary-600'
	| 'secondary-700'
	| 'secondary-800'
	| 'secondary-900'
	| 'secondary-950'
	| 'black'
	| 'white';

export type ButtonProps = {
	buttonStyle?: ButtonStyle;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type PillProps = {
	color: ColorsType;
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export type SideNavItemProps = {
	children: React.ReactNode;
	iconName: IconTypes;
	color: ColorsType;
	isActive?: boolean;
	to?: string;
} & React.HTMLAttributes<HTMLLIElement>;
