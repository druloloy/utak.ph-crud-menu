import React from 'react';

type Props = {
	src: string;
	size?: number;
};

const imageSize: { [key: number]: string } = {
	8: 'w-8 h-8',
	12: 'w-12 h-12',
	14: 'w-14 h-14',
	16: 'w-16 h-16',
	24: 'w-24 h-24',
	32: 'w-32 h-32'
};

const Avatar: React.FC<Props & React.HTMLAttributes<HTMLDivElement>> = ({
	src,
	size = 24
}) => {
	return (
		<section
			className={`${imageSize[size]} rounded-full overflow-hidden border border-secondary-500`}>
			<img
				src={src}
				alt="user-avatar"
				className={`${imageSize[size]} rounded-full object-cover`}
			/>
		</section>
	);
};

export default Avatar;
