import React from 'react';
import { ButtonProps } from 'types';
import clsx from 'clsx';

const Button: React.FC<ButtonProps> = ({ buttonStyle, children, ...props }) => {
	const style = clsx({
		'btn btn-primary': buttonStyle === 'primary',
		'btn btn-secondary': buttonStyle === 'secondary',
		'btn btn-basic': buttonStyle === 'basic'
	});
	return (
		<button {...props} className={`${props.className} ${style}`}>
			{children}
		</button>
	);
};

export default Button;
