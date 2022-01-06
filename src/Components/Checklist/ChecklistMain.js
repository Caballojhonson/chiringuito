import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { data } from '../../data';
import '../../Styles/Checklist.css';
import ChecklistCategory from './ChecklistCategory';
import ChecklistItem from './ChecklistItem';

export default function Checklist_Main() {
	let navigate = useNavigate();

	const [stockItems, setStockItems] = useState(null)
	const [order, setOrder] = useState([]);

	useEffect(() => {
		data.getData(data.stockBinId).then(stock => setStockItems(stock))
	}, [])
	

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
		const orderWithStatus = filteredOrders.map((item) => {
			item.orderStatus = 'Pendiente'
			item.paymentStatus = 'Pendiente de pago'
			return item
		})
		if (filteredOrders.length > 0) {
			const newOrder = {
				order: orderWithStatus,
				id: data.getid(),
				submittedBy: data.username,
				submittedAt: new Date(),
				isArchived: false,
			};
			const prevOrders = await data.getData(data.orderBinId);
			const updatedOrders = prevOrders.concat(newOrder);
			data.overwriteBin(data.orderBinId, updatedOrders)
			.then(() => navigate('/pedidos'));
		}
	};

	const CheckList = (
		<div className="checklist_container">
			<h1>Checklist</h1>
			{stockItems && stockItems.map((item, i) => {
				return (
					<ChecklistItem
						key={i}
						itemObject={item}
						updateQuantity={updateQuantity}
					/>
				);
			})}
			{stockItems && <ChecklistCategory updateFn={updateQuantity} stockItems={stockItems} />}

			<button onClick={submitOrder} className="button_primary add_new button_group">
				Generar pedido
			</button>
		</div>
	);

	return <div className="app">{CheckList}</div>;
}
