import React, { useState } from 'react';
import { data } from '../../data';
import AddNewItem from './AddNewItem';

export default function SettingsMain(props) {
	const [showNewItemForm, setShowNewItemForm] = useState(false);

	const toggleNewItemForm = () => {
		setShowNewItemForm((prev) => !prev);
	};

	const addNewItem = (newObject) => {
		const updatedStock = props.stockItems.concat(newObject);
		data.overwriteBin(props.stockBinId, updatedStock);
	};

	const Itemform = (
		<AddNewItem closeForm={() => toggleNewItemForm()} addNewItem={addNewItem} newItemId={props.stockItems.length} />
	);

	return (
		<div>
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
