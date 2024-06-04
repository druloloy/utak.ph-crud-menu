import Avatar from '@atoms/Avatar';
import useWindowDimension from 'hooks/useWindowDimension';

const Header = () => {
	const { device } = useWindowDimension();

	return (
		<section className="absolute top-5 right-0 z-10">
			<section className="bg-primary-100 pl-4 px-2 md:pl-8 lg:px-16 py-1 md:py-2 rounded-l-full">
				<section className="flex flex-row gap-4 items-center">
					<section className="flex flex-col items-end">
						<h2 className="text-base md:text-lg lg:text-xl font-bold">
							Howdy, Mark!
						</h2>
						<a className="caption md:subtext underline" href="#">
							Manage Profile
						</a>
					</section>
					<Avatar
						src="https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds"
						size={
							device === 'desktop'
								? 16
								: device === 'tablet'
									? 14
									: 12
						}
					/>
				</section>
			</section>
		</section>
	);
};

export default Header;
