import React, { useState, useEffect } from 'react';

export default function Checklist_Item(props) {
	const item = props.itemObject;
	const updateQuantity = props.updateQuantity;
	const editing = props.editing
	const [quantity, setQuantity] = useState(item.quantity ? item.quantity : 0);

	const add = () => {
		item.format === 'Kg'
			? setQuantity((prev) => parseFloat(prev) + 0.5)
			: setQuantity((prev) => parseInt(prev) + 1);
	};

	const substract = () => {
		if (quantity > 0)
			item.format === 'Kg'
				? setQuantity((prev) => parseFloat(prev) - 0.5)
				: setQuantity((prev) => parseInt(prev) - 1);
	};

	useEffect(() => {
			item.quantity = quantity;
			updateQuantity(item);
	}, [quantity]);

	const handleChange = (e) => {
		setQuantity(e.target.value);
	};

	return (
		<div className="checklist_item">
			<div className="item_name_group">

				{editing  
				? <p className="item_name">{item.item.name}</p>  
				: <p className="item_name">{item.name}</p>
				}
				{editing 
				? <p className="item_format"><strong>{`${item.item.price}€ / `}</strong> {item.item.format}</p>
				: <p className="item_format"><strong>{`${item.price}€ / `}</strong> {item.format}</p>
				}
			</div>
			<div className="item_quantity_group">
				<button
					onClick={substract}
					className=" btn btn-outline-secondary btn-sm plusmin_btn"
				>
					-
				</button>
				<input
					onChange={handleChange}
					value={quantity}
					className="form-control quantity_input"
					type="number"
				/>
				<button
					onClick={add}
					className=" btn btn-outline-secondary btn-sm plusmin_btn"
				>
					+
				</button>
			</div>
		</div>
	);
}
