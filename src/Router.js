import { Routes, BrowserRouter, Route } from 'react-router-dom';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import HomeScreen from './Components/Home/HomeScreen';
import OrderScreen from './Components/Orders/OrderScreen';
import './Styles/Global.css';
import React from 'react';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';
import AddNewItem from './Components/Settings/AddNewItem';
import AddNewSupplier from './Components/Settings/AddNewSupplier';
import refranero from './refranero';
import NewUserScreen from './Components/UI/NewUserScreen';

export default function Router() {
	//data.overwriteBin(data.stockBinId, []).then(val => console.log(val))
	//data.overwriteBin(data.orderBinId, []).then(val => console.log(val))
	//data.getData(data.orderBinId).then(val => console.log(val))
	//data.getData(data.financeBinId).then(val => console.log(val))
	/*data.overwriteBin(data.financeBinId, {
		suppliers: {
			debts: []
		}
	})
	*/
	//data.getData(data.supplierBinId).then(val => console.log(val))
	//data.overwriteBin(data.supplierBinId, [])
	//console.log(refranero[Math.floor(Math.random() * refranero.length )])
	//data.createBin([]).then(val => console.log(val))

	const loginScreen = <NewUserScreen/>

	const privateNavigation = (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="checklist" element={<ChecklistMain />} />
				<Route path="pedidos" element={<OrderScreen />} />
				<Route path="opciones" element={<SettingsMain />} />
				<Route path="nueva-referencia" element={<AddNewItem />} />
				<Route path="nuevo-proveedor" element={<AddNewSupplier />} />
				<Route path="nuevo-usuario" element={<NewUserScreen />} />
			</Routes>

			<MainToolbar />
		</BrowserRouter>
	);

	return (
		<div className="app">
			{data.isAuthorized && privateNavigation}
			{!data.isAuthorized && loginScreen}

		</div>
	)
}
