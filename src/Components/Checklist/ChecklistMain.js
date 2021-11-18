import React, { useState } from 'react';
import { data } from '../../data';

import '../../Styles/Checklist.css';
import ChecklistItem from './ChecklistItem';

export default function Checklist_Main(props) {
	const orderBinId = 'a523dc4ff793';
	const [order, setOrder] = useState([]);

	const updateQuantity = (orderItem) => {

		if (order.some((item) => item.id === orderItem.id)) {
			setOrder((prev) => {
				prev[orderItem.id] = orderItem;
				return prev;
			});
		} else {
			setOrder((prev) => prev.concat(orderItem));
		}
	};

	const submitOrder = async () => {
		const filteredOrders = order.filter((item) => item.quantity > 0);
		if (filteredOrders.length > 0) {
			const newOrder = {
				order: filteredOrders,
				submittedBy: 'Tester',
				submittedAt: new Date(),
			};
			const prevOrders = await data.getData(orderBinId);
			const updatedOrders = prevOrders.concat(newOrder);
			data.overwriteBin(orderBinId, updatedOrders);
			data.getData('a523dc4ff793').then((val) => console.log(val));
		}
	};

	const CheckList = (
		<div className="checklist_container">
			<h1>Checklist</h1>
			{props.stockItems.map((item, i) => {
				return (
					<ChecklistItem
						key={i}
						itemObject={item}
						updateQuantity={updateQuantity}
					/>
				);
			})}

			<button onClick={submitOrder} className="button_primary add_new">
				Generar pedido
			</button>
		</div>
	);

	return <div>{CheckList}</div>;
}
