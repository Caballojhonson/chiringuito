import React, { useState, useEffect } from 'react';
import { data } from '../../data';
import AddNewItem from './AddNewItem';

export default function SettingsMain() {
	const stockBinId = '0d75777de94a'

	const [showNewItemForm, setShowNewItemForm] = useState(false);
	const [stockItems, setstockItems] = useState(null)


	useEffect(() => {
		data.getData(stockBinId).then(stock => setstockItems(stock))
	  }, [])
	

	const toggleNewItemForm = () => {
		setShowNewItemForm((prev) => !prev);
	};

	const addNewItem = (newObject) => {
		if (stockItems) {
		const updatedStock = stockItems.concat(newObject)
		data.overwriteBin(stockBinId, updatedStock)
		}
	};

	const Itemform = (
		stockItems && <AddNewItem closeForm={() => toggleNewItemForm()} addNewItem={addNewItem} newItemId={stockItems.length} />
	);

	return (
		<div className="app">
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
