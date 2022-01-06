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
	const [filterBy, setFilterBy] = useState('supplier')

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
			
			
			<h1 className='text-center'>Referencias</h1>
			
			{stockItems && <ChecklistCategory 
			updateFn={updateQuantity} 
			stockItems={stockItems} 
			filterBy={filterBy}
			/>}

			<button onClick={submitOrder} className="button_primary button_group order_btn">
				Generar pedido
			</button>
		</div>
	);

	return <div className="app">{CheckList}</div>;
}
