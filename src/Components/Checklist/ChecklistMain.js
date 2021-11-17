import React, { useState } from 'react';
import { data } from '../../data';
import '../../Styles/Checklist.css';
import AddNewItem from './AddNewItem';
import ChecklistItem from './ChecklistItem';

export default function Checklist_Main(props) {
	const stockBinId = '0d75777de94a';
	const [showNewItemForm, setShowNewItemForm] = useState(false);

	const toggleNewItemForm = () => {
		setShowNewItemForm((prev) => !prev);
	};

	const addNewItem = (newObject) => {
		const updatedStock = props.stockItems.concat(newObject);
		data.overwriteBin(stockBinId, updatedStock);
	};

	const Itemform = (
		<AddNewItem closeForm={() => toggleNewItemForm()} addNewItem={addNewItem} />
	);
	const CheckList = (
        <div className="checklist_container">
            <h1>Checklist</h1>
            {props.stockItems.map((item, i) => {
                return(
                    <ChecklistItem key={i} itemObject={item}/>
                )
            })}
            <button className="button_primary add_new" onClick={toggleNewItemForm}>
                Nueva referencia
            </button>
        </div>
	);

	return (
		<div>
			{showNewItemForm ? Itemform : CheckList}
		</div>
	);
}
