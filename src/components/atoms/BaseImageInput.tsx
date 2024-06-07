import { Input } from '@mui/base';
import React from 'react';
import { BaseImageInputProps } from '@types';

const BaseImageInput = React.forwardRef(function CustomInput(
	props: BaseImageInputProps & React.HTMLAttributes<HTMLDivElement>,
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
