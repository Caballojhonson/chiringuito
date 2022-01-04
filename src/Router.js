import { Routes, BrowserRouter, Route } from 'react-router-dom';
import React, { useEffect} from 'react';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import HomeScreen from './Components/Home/HomeScreen';
import OrderScreen from './Components/Orders/OrderScreen';
import './Styles/Global.css';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';
import AddNewItem from './Components/Settings/AddNewItem';
import AddNewSupplier from './Components/Settings/AddNewSupplier';
import NewUserScreen from './Components/UI/NewUserScreen';
import Loadscreen from './Components/UI/Loadscreen';
import FinanceScreen from './Components/Finance/FinanceScreen';
import EventsMain from './Components/Events/EventsMain';

export default function Router() {
	//data.getData(data.orderBinId).then(val => console.log(val))
	//data.getData(data.financeBinId).then(val => console.log(val))
	//data.getData(data.usersBinId).then(val => console.log(val))
	// data.overwriteBin(data.financeBinId, forceFinance)
	
	//data.getData(data.supplierBinId).then(val => console.log(val))
	//data.overwriteBin(data.financeBinId, {})
	//console.log(refranero[Math.floor(Math.random() * refranero.length )])
	//data.createBin([]).then(val => console.log(val))

	let newSession = localStorage.getItem('newSession')

	useEffect(() => {
		localStorage.setItem('newSession', '')
		setTimeout(() => {
			localStorage.setItem('newSession', true);
		}, 300000) //Time of inactivity for session expiry 300000 = 5min
	}, [])

	const loginScreen = <NewUserScreen/>

	const privateNavigation = (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="checklist" element={<ChecklistMain />} />
				<Route path="pedidos" element={<OrderScreen />} />
				<Route path="eventos" element={<EventsMain />} />
				<Route path="opciones" element={<SettingsMain />} />
				<Route path="nueva-referencia" element={<AddNewItem />} />
				<Route path="nuevo-proveedor" element={<AddNewSupplier />} />
				<Route path="nuevo-usuario" element={<NewUserScreen />} />
				<Route path="bienvenida" element={<Loadscreen />} />
				<Route path="finanzas" element={<FinanceScreen />} />
			</Routes>

			<MainToolbar />
		</BrowserRouter>
	);

	return (
		<div >
			{newSession  && <Loadscreen/>}
			{data.isAuthorized && privateNavigation}
			{!data.isAuthorized && loginScreen}
		</div>
	)
}

