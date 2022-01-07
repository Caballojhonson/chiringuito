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

export default function Router() {
	function capitalize(word) {
		return (
			word.charAt(0).toUpperCase() + word.slice(1)
		)
	}

	const forceFinance = {
		"days": [
		  {
			"id": "f25a9b3d-99aa-4408-835e-917d89fda3cd",
			"by": "El Jota",
			"timestamp": "2022-01-03T21:40:09.115Z",
			"operations": [
			  {
				"concept": "Apertura",
				"timestamp": "2022-01-03T21:40:09.115Z",
				"by": "El Jota",
				"type": "opening cash",
				"amount": 234
			  },
			  {
				"concept": "Compra Makro",
				"timestamp": "2022-01-03T21:40:09.115Z",
				"by": "Caballo",
				"type": "withdrawal",
				"amount": -150
			  },
			  {
				"concept": "Vuelta Makro",
				"timestamp": "2022-01-03T21:40:09.115Z",
				"by": "Caballo",
				"type": "deposit",
				"amount": 41.5
			  }
			],
			"openingCash": 234,
			"isOpen": false,
			"closingCash": 302,
			"totalBalance": 68
		  },
		  {
			"id": "194492ce-1981-4b22-8ce9-7e8cde613360",
			"by": "Caballo",
			"timestamp": "2022-01-04T16:38:10.768Z",
			"operations": [
			  {
				"concept": "Apertura",
				"timestamp": "2022-01-04T16:38:10.768Z",
				"by": "Caballo",
				"type": "opening cash",
				"amount": 150
			  },
			  {
				"usr": "Caballo",
				"timestamp": "2022-01-04T16:53:33.599Z",
				"concept": "Mercadona",
				"amount": -90,
				"type": "withdrawal"
			  },
			  {
				"usr": "Caballo",
				"timestamp": "2022-01-04T22:35:18.142Z",
				"concept": "Bizum",
				"amount": 7.5,
				"type": "deposit"
			  }
			],
			"openingCash": 150,
			"isOpen": false,
			"closingCash": 250,
			"totalBalance": 17.5
		  },
		  
		],
		"debts": {
		  "in": [],
		  "out": []
		},
		"salaries": [],
		"expenses": [],
	  }
	  


	//data.getData(data.orderBinId).then(val => console.log(val))
	//data.getData(data.stockBinId).then(val => console.log(val))
	data.getData(data.financeBinId).then(val => console.log(val))
	//data.getData(data.usersBinId).then(val => console.log(val))
	// data.overwriteBin(data.financeBinId, forceFinance)
	
	//data.getData(data.supplierBinId).then(val => console.log(val))
	//data.overwriteBin(data.financeBinId, {})
	//console.log(refranero[Math.floor(Math.random() * refranero.length )])
	//data.createBin([]).then(val => console.log(val))

	// async function  modifyStockTaxFormat() {
	// 	const originalStock = await data.getData(data.stockBinId)
	// 	const modifiedTaxFormatObject = originalStock.map(item => {
	// 		capitalize(item.category) 
	// 	return item
	// 	})
	// 	console.log(modifiedTaxFormatObject)
	//  	data.overwriteBin(data.stockBinId, modifiedTaxFormatObject)
	//  }
	// modifyStockTaxFormat()

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

