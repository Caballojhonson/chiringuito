import { Routes, BrowserRouter, Route } from 'react-router-dom';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import HomeScreen from "./Components/Home/HomeScreen";
import OrderScreen from "./Components/Orders/OrderScreen";
import './Styles/Global.css';
import React from 'react';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';

export default function Router() {
	//storage.localStockItems.then(val => console.log(val))
    //data.overwriteBin(data.stockBinId, []).then(val => console.log(val))
    //data.overwriteBin(data.orderBinId, []).then(val => console.log(val))
	//data.getData(data.orderBinId).then(val => console.log(val))

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
