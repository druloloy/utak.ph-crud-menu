import { Input } from '@mui/base';
import React from 'react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

const BaseImageInput = React.forwardRef(function CustomInput(
	props: React.HTMLAttributes<HTMLDivElement> & {
		inputRef: React.MutableRefObject<HTMLInputElement | null>;
		handleFileDragAndDrop: (event: React.DragEvent) => void;
		handleClick: () => void;
		handleDragOver: (event: React.DragEvent) => void;
		handleDragLeave: (event: React.DragEvent) => void;
		handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
		fields: ControllerRenderProps<FieldValues, string>;
		dragStyle: string;
		placeholder?: React.ReactNode;
	},
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const {
		inputRef,
		handleFileDragAndDrop,
		handleClick,
		handleDragOver,
		handleDragLeave,
		handleImageUpload,
		dragStyle,
		placeholder,
		fields
	} = props;

	return (
		<section
			ref={ref}
			onClick={handleClick}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleFileDragAndDrop}
			className={`upload-box ${dragStyle}`}>
			<Input
				{...fields}
				type="file"
				slotProps={{
					input: {
						ref: (element) => {
							inputRef.current = element;
						},
						hidden: true,
						accept: 'image/jpeg, image/png, image/jpg',
						onChange: handleImageUpload
					}
				}}
			/>

			{placeholder ? placeholder : null}
		</section>
	);
});

export default BaseImageInput;
