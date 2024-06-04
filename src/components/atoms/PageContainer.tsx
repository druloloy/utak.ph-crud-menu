import React from 'react';

const PageContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...props
}) => {
	return (
		<section
			{...props}
			className={`w-full h-screen overflow-auto pt-8 md:pt-0 lg:pt-0 ${props.className}`}>
			{children}
		</section>
	);
};

export default PageContainer;
