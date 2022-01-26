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
import axios from 'axios';

export default function Router() {

	async function pushNewOrders () {
		const oldData = await data.getData(data.orderBinId)
		const newItems = await axios.get(`https://chiringuito-api.herokuapp.com/api/items/`)
	
		const allOrders = oldData.map(item => {
			
			const orders = item.orders
	
			orders.forEach(order => {
				order.submittedBy = item.submittedBy
				order.submittedAt = item.submittedAt
			})
	
			return orders
		})
	
		var merged = [].concat.apply([], allOrders)
		
		merged.forEach(order => {
			const matchingItemIds = order.items.map(orderItem => {
				const matchingItem = newItems.data.data.find(stockItem => stockItem.name === orderItem.name)
				const matchingSupplierAndPrice = newItems.data.data.find(stockItem => stockItem.supplier === orderItem.supplier && stockItem.price === orderItem.price)
				const matchingPrice = newItems.data.data.find(stockItem => stockItem.price === orderItem.price)
				if(matchingItem) {
					return {item: matchingItem._id, quantity: orderItem.quantity, totalPrice: orderItem.price * orderItem.quantity}
				} else if(matchingSupplierAndPrice) {
					return {item: matchingSupplierAndPrice._id, quantity: orderItem.quantity, totalPrice: orderItem.price * orderItem.quantity}
				} else if(matchingPrice) {
					return {item: matchingPrice._id, quantity: orderItem.quantity, totalPrice: orderItem.price * orderItem.quantity}
				}
				
			})
			order.items = matchingItemIds
		})
	
		console.log(merged)
		merged.forEach(async order => {
			
				await axios.post(`https://chiringuito-api.herokuapp.com/api/orders/new`, order)
			
		})
		
	}
	
//pushNewOrders()

	//data.getData(data.orderBinId).then(val => console.log(val))
	//data.getData(data.stockBinId).then(val => console.log(val))
	//data.getData(data.financeBinId).then(val => console.log(val.days))
	//data.getData(data.usersBinId).then(val => console.log(val))
	//data.getData(data.stockBinId).then(val => console.log(val))
	// data.overwriteBin(data.financeBinId, forceFinance)
	
	//data.getData(data.supplierBinId).then(val => console.log(val))
	//data.overwriteBin(data.financeBinId, {})
	//console.log(refranero[Math.floor(Math.random() * refranero.length )])
	//data.createBin([]).then(val => console.log(val))

	// async function resetExpenses() {
	// 	const finance = await data.getData(data.financeBinId)
	// 	finance.expenses = []
	// 	await data.overwriteBin(data.financeBinId, finance)
	// 	console.log(finance)
	// }
	// resetExpenses()

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

