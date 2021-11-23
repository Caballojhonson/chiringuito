import React, {useState, useEffect} from 'react';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';
import './Styles/Global.css';

function App() {
  const stockBinId = '0d75777de94a'
  const orderBinId = 'a523dc4ff793';

  useEffect(() => {
    data.getData(stockBinId).then(stock => setstockItems(stock))
    data.getData(orderBinId).then(orders => setOrders(orders))
  }, [])

  const [stockItems, setstockItems] = useState(null)
  const [orders, setOrders] = useState(null)

  const [homeIsHidden, setHomeIsHidden] = useState(true)
  const [checklistIsHidden, setChecklistIsHidden] = useState(true)
  const [ordersIsHidden, setOrdersIsHidden] = useState(true)
  const [eventsIsHidden, setEventsIsHidden] = useState(true)
  const [settingstIsHidden, setSettingsIsHidden] = useState(true)

  const toggleChecklist = () => setChecklistIsHidden(prev => !prev)
  
	return (
		<div className="App">
      {stockItems && <ChecklistMain isHidden={checklistIsHidden} stockItems = {stockItems} />}
      {stockItems && <SettingsMain isHidden={settingstIsHidden} stockItems={stockItems} stockBinId = {stockBinId} />}
      <MainToolbar  />
		</div>
	);
}

export default App;
