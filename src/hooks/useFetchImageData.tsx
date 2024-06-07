import React, { useEffect } from 'react';

function useFetchImageData(imageUrl: string) {
	const [imageData, setImageData] = React.useState<string>('');

	useEffect(() => {
		const fetchImageData = async () => {
			if (!imageUrl) {
				return '';
			}

			const response = await fetch(imageUrl);
			const blob = await response.blob();

			return new Promise((resolve, reject) => {
				try {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.readAsDataURL(blob);
				} catch (error) {
					reject('');
				}
			});
		};

		fetchImageData().then((data) => {
			setImageData(data as string);
		});
	}, [imageUrl]);

	return { imageData };
}

export default useFetchImageData;
