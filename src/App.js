import React, {useState, useEffect} from 'react';
import './App.css';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import { data } from './data';
import './Styles/Global.css';

function App() {
  const stockBinId = '0d75777de94a'
  const [stockItems, setstockItems] = useState(null)

  useEffect(() => {
    data.getData(stockBinId).then(stock => setstockItems(stock))
  }, [])


	return (
		<div className="App">
			{stockItems && <ChecklistMain stockItems = {stockItems} />}
		</div>
	);
}

export default App;
