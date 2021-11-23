import { Routes, BrowserRouter, Route } from 'react-router-dom';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import HomeScreen from "./Components/Home/HomeScreen";
import OrderScreen from "./Components/Orders/OrderScreen";
import './Styles/Global.css';


import React from 'react';
import MainToolbar from './Components/UI/MainToolbar';

export default function Router() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomeScreen />} />

					<Route path="checklist" element={<ChecklistMain/>}/>
			
					<Route path="pedidos" element={<OrderScreen />} />

					<Route path="opciones" element={<SettingsMain/>} />
				</Routes>
			</BrowserRouter>
			<MainToolbar />
		</div>
	);
}
