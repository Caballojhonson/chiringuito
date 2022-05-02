import React from 'react';
import MenuSidebar from '../UI/MenuSidebar';
import Changelog from './Components/Changelog';

export default function HomeScreen() {
	

	return (
		<div style={{minHeight: '93vh'}}>
			<MenuSidebar />
			<Changelog  />
		</div>
	);
}
