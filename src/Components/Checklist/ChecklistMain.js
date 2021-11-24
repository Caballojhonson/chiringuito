import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { data } from '../../data';
import '../../Styles/Checklist.css';
import ChecklistItem from './ChecklistItem';

export default function Checklist_Main(props) {
	let navigate = useNavigate();
	const stockBinId = '0d75777de94a'
	const orderBinId = 'a523dc4ff793';

	const [stockItems, setStockItems] = useState(null)
	const [order, setOrder] = useState([]);

	useEffect(() => {
		data.getData(stockBinId).then(stock => setStockItems(stock))
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
		if (filteredOrders.length > 0) {
			const newOrder = {
				order: filteredOrders,
				submittedBy: 'Caballo',
				submittedAt: new Date(),
			};
			const prevOrders = await data.getData(orderBinId);
			const updatedOrders = prevOrders.concat(newOrder);
			data.overwriteBin(orderBinId, updatedOrders);
			navigate('/pedidos')
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

			<button onClick={submitOrder} className="button_primary add_new">
				Generar pedido
			</button>
		</div>
	);

	return <div className="app">{CheckList}</div>;
}
