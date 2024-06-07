import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Icon from '@atoms/Icon';
import Throbber from '@atoms/Throbber';
import FieldError from '@atoms/FieldError';
import ImagePreview from '@atoms/ImagePreview';
import Button from '@atoms/Button';
import BaseImageInput from '@atoms/BaseImageInput';
import { ImageInputProps } from '@types';

const ImageInput: React.FC<ImageInputProps> = ({
	rules,
	name,
	showPreview,
	defaultValue
}) => {
	const {
		control,
		setValue,
		formState: { errors }
	} = useFormContext();
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const boxRef = React.useRef<HTMLDivElement | null>(null);

	const [imageUploading, setImageUploading] = React.useState<boolean>(false);
	const [imageBase64, setImageBase64] = React.useState<string | null>(
		defaultValue ?? null
	);
	const [isFileDragged, setIsFileDragged] = React.useState<boolean>(false);

	useEffect(() => {
		if (defaultValue) {
			setImageBase64(defaultValue);
		}
	}, [defaultValue]);

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setImageUploading(true);
			const file = event.target.files[0];
			const reader = new FileReader();

			reader.onload = () => {
				const result = reader.result as string;
				setImageBase64(result);
				setValue(name, result);
				setImageUploading(false);
			};

			reader.readAsDataURL(file);
		}
	};

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click();
		}
	};

	const handleFileDragAndDrop = (event: React.DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer.files) {
			setImageUploading(true);
			const file = event.dataTransfer.files[0];
			const reader = new FileReader();

			reader.onload = () => {
				const result = reader.result as string;
				setImageBase64(result);
				setValue(name, result);
				setImageUploading(false);
			};

			reader.readAsDataURL(file);
			setIsFileDragged(false);
		}
	};

	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();

		if (boxRef.current) {
			setIsFileDragged(true);
		} else {
			setIsFileDragged(false);
		}
	};

	const handleDragLeave = (event: React.DragEvent) => {
		event.preventDefault();
		if (boxRef.current) {
			setIsFileDragged(false);
		}
	};

	const clearImage = () => {
		if (inputRef.current) {
			return (inputRef.current.files = null);
		}
		setImageBase64(null);
		setValue(name, '');
	};

	return (
		<section className="image-input flex flex-col">
			{showPreview && imageBase64 && <ImagePreview image={imageBase64} />}
			<Controller
				name={name}
				control={control}
				rules={rules[name]}
				render={({ field }) =>
					imageBase64 ? (
						<Button
							className="py-2 mt-4"
							buttonStyle="secondary"
							onClick={clearImage}>
							<Icon
								name="MdDelete"
								size={24}
								color="primary-400"
							/>
							Remove Image
						</Button>
					) : (
						<BaseImageInput
							fields={field}
							ref={boxRef}
							inputRef={inputRef}
							handleFileDragAndDrop={handleFileDragAndDrop}
							handleClick={handleClick}
							handleDragOver={handleDragOver}
							handleDragLeave={handleDragLeave}
							handleImageUpload={handleImageUpload}
							dragStyle={isFileDragged ? 'bg-primary-100' : ''}
							placeholder={
								!imageUploading ? (
									<>
										<Icon
											name="MdCloudUpload"
											size={32}
											color="primary-400"
										/>
										<p
											role="status"
											className="caption text-black text-center">
											Drop the photo or click to select
											one.
										</p>
									</>
								) : (
									<Throbber size={16} text="Uploading..." />
								)
							}
						/>
					)
				}
			/>
			<FieldError text={errors[name]?.message as string} />
		</section>
	);
};

export default ImageInput;
