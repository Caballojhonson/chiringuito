import React from 'react';
import { useDb } from '../../DbContext';
import TopNavbar from '../UI/TopNavbar';
import Changelog from './Components/Changelog';

export default function HomeScreen() {

	console.log(useDb())
	return (
		<div style={{minHeight: '93vh'}}>
			<TopNavbar title='Página principal' />
			<Changelog  />
		</div>
	);
}
