import { IconTypes } from '@atoms/Icon';
import { SingleLineInputProps } from '@mui/base';
import React from 'react';
import {
	ControllerRenderProps,
	FieldValues,
	RegisterOptions,
	UseFormSetValue
} from 'react-hook-form';
import { ProductItemType } from './product';

type ButtonStyle = 'primary' | 'secondary' | 'basic';
// type ButtonSize = 'sm' | 'md' | 'lg';

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

export type ProductCardProps = {
	thumbnail: string;
	name: string;
	currency: string;
	options?: {
		[key: string]: {
			price: number | string;
			cost: number | string;
			stocks: number | string;
		};
	} | null;
	stocks?: number | null;
	price?: number | null;
	cost?: number | null;
	selected?: boolean;
};

export type CheckProductCardProps = {
	fields: ControllerRenderProps<FieldValues, string>;
	setValue?: UseFormSetValue<FieldValues>;
	checked?: boolean;
} & (ProductCardProps & { id?: string });

export type ImageInputProps = {
	rules: Record<string, RegisterOptions>;
	name: string;
	showPreview?: boolean;
	defaultValue?: string;
};

export type OptionInputProps = {
	name: string;
	rules: Record<string, RegisterOptions>;
	inputOptionPlaceholder?: string;
	inputPricePlaceholder?: string;
	inputCostPlaceholder?: string;
	inputStocksPlaceholder?: string;
	inputOptionLabel?: string;
	inputPriceLabel?: string;
	inputCostLabel?: string;
	inputStocksLabel?: string;
	required?: boolean;
	options?: {
		[key: string]: {
			price: number | string;
			cost: number | string;
			stocks: number | string;
		};
	}[];
};

export type OptionItemProps = {
	name: string;
	price: number | string;
	cost: number | string;
	stocks: number | string;
	removeItem?: () => void;
	currency?: string;
	onClick?: ({
		name,
		price,
		cost,
		stocks,
		index
	}: {
		name: string;
		price: number | string;
		cost: number | string;
		stocks: number | string;
		index?: number;
	}) => void;
	index?: number;
};

export type SelectionFieldProps = {
	name: string;
	rules: Record<string, RegisterOptions>;
	options: { [key: string]: string | number };
	placeholder: string;
	label?: string;
	defaultValue?: string;
	required?: boolean;
};

export type TextFieldProps = {
	name: string;
	rules: Record<string, RegisterOptions>;
	required?: boolean;
} & InputType;

export type BaseImageInputProps = {
	inputRef: React.MutableRefObject<HTMLInputElement | null>;
	handleFileDragAndDrop: (event: React.DragEvent) => void;
	handleClick: () => void;
	handleDragOver: (event: React.DragEvent) => void;
	handleDragLeave: (event: React.DragEvent) => void;
	handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fields: ControllerRenderProps<FieldValues, string>;
	dragStyle: string;
	placeholder?: React.ReactNode;
};

export type MenuModalProps = {
	open: boolean;
	closeModal: () => void;
	setProducts: React.Dispatch<
		React.SetStateAction<Record<string, ProductItemType[]> | undefined>
	>;
	item?: ProductItemType | null;
};

export type ProductGroupProps = {
	title: string;
	name: string;
	products: ProductItemType[];
	toggleBulkSelect?: boolean;
};

export type DeviceType = 'mobile' | 'tablet' | 'desktop';
