import { Routes, BrowserRouter, Route }  from "react-router-dom";
import React, {useState, useEffect} from 'react';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';
import './Styles/Global.css';
import HomeScreen from "./Components/Home/HomeScreen";
import OrderScreen from "./Components/Orders/OrderScreen";
import Loadscreen from "./Components/UI/Loadscreen";

function App() {
  const stockBinId = '0d75777de94a'
  const orderBinId = 'a523dc4ff793';

  useEffect(() => {
    data.getData(stockBinId).then(stock => setstockItems(stock))
    data.getData(orderBinId).then(orders => setOrders(orders))
  }, [])

  const [stockItems, setstockItems] = useState(null)
  const [orders, setOrders] = useState(null)
  
	return (
		<div className="App">
      <MainToolbar  />
      
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />

                <Route path="checklist">
                  {stockItems ? <ChecklistMain stockItems= {stockItems} /> : <Loadscreen/>}
                </Route>

                <Route path="pedidos" element={<OrderScreen/>} />

                <Route path="opciones"> 
                  {stockItems ? <SettingsMain stockItems= {stockItems} stockBinId= {stockBinId} /> : <Loadscreen/>}
                </Route>
            </Routes>
        </BrowserRouter>
      
		</div>
	);
}

export default App; 
