import React from 'react';
import { useStore } from '../../StoreContext';
import TopNavbar from '../UI/TopNavbar';
import Changelog from './Components/Changelog';

export default function HomeScreen() {

	console.log(useStore())
	return (
		<div style={{minHeight: '93vh'}}>
			<TopNavbar title='Página principal' />
			<Changelog  />
		</div>
	);
}
