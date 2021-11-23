import React, { useState, useEffect } from 'react';
import { data } from '../../data';
import AddNewItem from './AddNewItem';
import '../../Styles/Settings.css'

export default function SettingsMain() {
	const [showNewItemForm, setShowNewItemForm] = useState(false);
	const [stockItems, setstockItems] = useState(null)
	const [suppliers, setSuppliers] = useState(null)
 

	useEffect(() => {
		data.getData(data.stockBinId).then(stock => setstockItems(stock))
		data.getData(data.supplierBinId).then(suppliers => setSuppliers(suppliers))
	  }, [])
	

	const toggleNewItemForm = () => {
		setShowNewItemForm((prev) => !prev);
	};

	const addNewItem = (newObject) => {
		if (stockItems) {
		const updatedStock = stockItems.concat(newObject)
		data.overwriteBin(data.stockBinId, updatedStock)
		}
	};

	const Itemform = (
		stockItems && suppliers && <AddNewItem closeForm={() => toggleNewItemForm()} addNewItem={addNewItem} newItemId={stockItems.length} suppliers= {suppliers} />
	);

	return (
		<div className="app settings_main">
			{showNewItemForm ? (
				Itemform
			) : (
				<button className="button_primary add_new" onClick={toggleNewItemForm}>
					Nueva referencia
				</button>
			)}
		</div>
	);
}
