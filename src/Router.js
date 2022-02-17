import { Routes, BrowserRouter, Route, } from 'react-router-dom';
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
import EditItems from './Components/Settings/EditItems';
import AddNewFixedExpense from './Components/Settings/AddNewFixedExpense';
import run from './runOnStartup';
import RunOnStartup from './runOnStartup';

export default function Router() {

	data.getData(data.supplierBinId).then(val => console.log(val))

	let newSession = localStorage.getItem('newSession')

	useEffect(() => {
		localStorage.setItem('newSession', '')
		setTimeout(() => {
			localStorage.setItem('newSession', true);
		}, 900000) //Time of inactivity for session expiry 300000 = 5min
	}, [])


	const loginScreen = <NewUserScreen/>
	const loadScreen = () => window.location.href = '/bienvenida'

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
				<Route path="editar-referencias" element={<EditItems />} />
				<Route path="nuevo-gasto-fijo" element={<AddNewFixedExpense />} />
			</Routes>

			<MainToolbar />

		</BrowserRouter>
	);

	return (
		<div >

			{newSession && loadScreen()}
			{data.isAuthorized && privateNavigation}
			{!data.isAuthorized && loginScreen}
		</div>
	)
}

