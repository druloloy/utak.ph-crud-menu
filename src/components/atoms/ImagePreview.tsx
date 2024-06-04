const ImagePreview = ({ image }: { image: string }) => {
	return (
		<section className="w-full mt-4">
			<img
				src={image}
				alt="preview"
				className="w-full h-full object-cover aspect-square"
			/>
		</section>
	);
};

export default ImagePreview;
