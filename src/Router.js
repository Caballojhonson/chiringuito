import { Routes, BrowserRouter, Route }  from "react-router-dom";
import React from 'react'
import ChecklistMain from "./Components/Checklist/ChecklistMain";
import HomeScreen from "./Components/Home/HomeScreen";
import OrderScreen from "./Components/Orders/OrderScreen";
import SettingsMain from "./Components/Settings/SettingsMain";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="checklist" element={<ChecklistMain/>} />
                <Route path="pedidos" element={<OrderScreen/>} />
                <Route path="opciones" element={<SettingsMain/>}/>
            </Routes>
        </BrowserRouter>
    )
}
