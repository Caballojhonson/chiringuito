import React, { useState } from 'react';
import { Box, Drawer } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
//import ScaleIcon from '@mui/icons-material/Scale';
import MenuBookIcon from '@mui/icons-material/MenuBook';
//import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
//import PersonAddIcon from '@mui/icons-material/PersonAdd';
//import AddIcon from '@mui/icons-material/Add';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import MainSidebarBtn from './Components/MainSidebarBtn';
//import KitchenIcon from '@mui/icons-material/Kitchen';
import BalanceIcon from '@mui/icons-material/Balance';
import { data } from '../../data';

function MenuBtnGroup(props) {
	const { iconList, isOpen, isSubmenu } = props;

	const mainContainerStyle = {
		display: 'flex',
		flexDirection: 'column',
		paddingTop: '2rem',
		alignItems: 'center',
	};

	const btnContainerStyle = {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr',
		gridTemplateRows: '1fr 1fr',
		justifyContent: 'center',
		width: 'min-content',
		maxHeight: 'max-content',
	};

	return (
		<Box sx={mainContainerStyle} color="primary">
			<Box sx={btnContainerStyle}>
				<Drawer anchor={'left'} open={isOpen} onClose={props.closeFn}>
					{isSubmenu && (
						<MainSidebarBtn
							mainIcon={<ArrowBackIcon />}
							closeFn={props.closeFn}
						/>
					)}

					{iconList.map((icon) => {
						return (
							<MainSidebarBtn
								mainIcon={icon.icon}
								title={icon.title}
								path={icon.path}
								key={data.getid()}
								subMenu={icon.subMenu}
							/>
						);
					})}
				</Drawer>
			</Box>
		</Box>
	);
}

export default function MenuSidebar(props) {
	const [menu, setMenu] = useState({ main: true });
	const [isOpen, setIsOpen] = useState(false);

	function setMenuScreen(viewKey) {
		const clearedScreens = Object.keys(menu).forEach(
			(key) => (menu[key] = false)
		);
		setMenu(clearedScreens); //Set all to false
		setMenu({ ...menu, [viewKey]: true }); //Set param to true
	}

	const orderMenuList = [
		{
			icon: <LocalShippingIcon fontSize="inherit" />,
			title: 'Pedidos',
			path: '/pedidos',
		},
		{
			icon: <ShoppingCartIcon fontSize="inherit" />,
			title: 'Pedir',
			path: '/checklist',
		},
	];

	const menusMenuList = [
		{
			icon: <BalanceIcon fontSize="inherit" />,
			title: 'Escandallar',
			path: '/escandallar',
		},
		{
			icon: <MenuBookIcon fontSize="inherit" />,
			title: 'Carta',
			path: '/carta',
		},
	];

	const mainMenuList = [
		{
			icon: <LocalShippingIcon fontSize="inherit" />,
			title: 'Pedidos',
			subMenu: () => setMenuScreen('orders'),
		},
		{
			icon: <RestaurantMenuIcon fontSize="inherit" />,
			title: 'Menús',
			subMenu: () => setMenuScreen('menus'),
		},
		{
			icon: <CalendarMonthIcon fontSize="inherit" />,
			title: 'Eventos',
			path: '/eventos',
		},
		{
			icon: <PeopleAltIcon fontSize="inherit" />,
			title: 'Proveedores',
		},
		{
			icon: <AttachMoneyIcon fontSize="inherit" />,
			title: 'Contabilidad',
			path: '/finanzas',
		},
		{
			icon: <SettingsIcon fontSize="inherit" />,
			title: 'Opciones',
			path: '/opciones',
		},
	];

	return (
		<div style={{  }}>
			<MenuIcon fontSize='large' onClick={() => setIsOpen(true)} sx={{ml: 2, mt: 1}} />
			{isOpen && menu.main && (
				<MenuBtnGroup
					iconList={mainMenuList}
					isOpen={isOpen}
					closeFn={() => setIsOpen(false)}
				/>
			)}
			{menu.orders && (
				<MenuBtnGroup
					iconList={orderMenuList}
					isOpen={true}
					closeFn={() => setMenuScreen('main')}
					isSubmenu={true}
				/>
			)}
			{menu.menus && (
				<MenuBtnGroup
					iconList={menusMenuList}
					isOpen={true}
					closeFn={() => setMenuScreen('main')}
					isSubmenu={true}
				/>
			)}
		</div>
	);
}
