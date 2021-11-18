import React, {useState, useEffect} from 'react';
import ChecklistMain from './Components/Checklist/ChecklistMain';
import SettingsMain from './Components/Settings/SettingsMain';
import MainToolbar from './Components/UI/MainToolbar';
import { data } from './data';
import './Styles/Global.css';

function App() {
  const stockBinId = '0d75777de94a'
  const [stockItems, setstockItems] = useState(null)
  const [showSettings, setshowSettings] = useState(false)

  const toggleSettings = () => {
    setshowSettings(prev => !prev)
  }

  useEffect(() => {
    data.getData(stockBinId).then(stock => setstockItems(stock))
  }, [])

  //data.getData('a523dc4ff793').then(val => console.log(val))
  //data.overwriteBin('a523dc4ff793', [])

	return (
		<div className="App">
			{stockItems && <ChecklistMain stockItems = {stockItems} />}
      {showSettings && <SettingsMain stockItems={stockItems} stockBinId = {stockBinId} />}
      <MainToolbar toggleSettings = {toggleSettings} />
		</div>
	);
}

export default App;
