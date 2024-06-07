import { useState } from 'react';
import SideNavItem from '@molecules/SideNavItem';
import { SideNavItemProps } from '@types';
import Icon from '@atoms/Icon';

type NavigationItems = Array<
	{ title: string } & Omit<SideNavItemProps, 'children' | 'color'>
>;

const MainNavigationItems: NavigationItems = [
	{
		to: '/',
		title: 'Dashboard',
		iconName: 'MdDashboard'
	},
	{
		to: '/menu',
		title: 'Menu',
		iconName: 'MdFastfood',
		isActive: true
	},
	{
		to: '/categories',
		title: 'Categories',
		iconName: 'MdCategory'
	},
	{
		to: '/orders',
		title: 'Orders',
		iconName: 'MdReceipt'
	},
	{
		to: '/analytics',
		title: 'Analytics',
		iconName: 'MdBarChart'
	}
];

const ExtraNavigationItems: NavigationItems = [
	{
		to: '/settings',
		title: 'Settings',
		iconName: 'MdSettings'
	},
	{
		title: 'Logout',
		iconName: 'MdLogout',
		onClick: () => {}
	}
];

const SideNav = () => {
	const [isNavExpanded, setIsNavExpanded] = useState(false);
	return (
		<section
			className={` ${isNavExpanded ? 'w-80' : 'w-14'} h-screen bg-primary-400 rounded-r-3xl p-2 duration-500 transition-all`}>
			<section className="w-full h-full relative flex flex-col justify-between items-start overflow-hidden">
				<button
					className={`w-fit top-0 right-0 rounded-full bg-white ${
						isNavExpanded ? 'absolute' : 'relative'
					}`}
					onClick={() => setIsNavExpanded(!isNavExpanded)}>
					<Icon
						name={
							isNavExpanded ? 'MdChevronLeft' : 'MdChevronRight'
						}
						size={32}
						color="primary-600"
					/>
				</button>
				{isNavExpanded && (
					<h2 className="h2 text-center font-bold text-white mt-8 self-center">
						WcDonald's
					</h2>
				)}
				<ul className="w-11/12 flex flex-col gap-2">
					{MainNavigationItems.map((item, i) => (
						<SideNavItem
							key={i}
							{...item}
							color="white"
							showText={isNavExpanded}>
							{item.title}
						</SideNavItem>
					))}
				</ul>

				<ul className="w-11/12 flex flex-col gap-2">
					{ExtraNavigationItems.map((item, i) => (
						<SideNavItem
							key={i}
							{...item}
							color="white"
							showText={isNavExpanded}>
							{item.title}
						</SideNavItem>
					))}
				</ul>
			</section>
		</section>
	);
};

export default SideNav;
