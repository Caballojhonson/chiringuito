import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { data } from '../../data';
import '../../Styles/Checklist.css';
import editIcon from '../../images/edit-square-line.png'
import searchIcon from '../../images/search-line.png'
import ChecklistCategory from './ChecklistCategory';
import ChecklistItem from './ChecklistItem';

export default function Checklist_Main() {
	let navigate = useNavigate();

	const [stockItems, setStockItems] = useState(null)
	const [order, setOrder] = useState([]);
	const [filterBy, setFilterBy] = useState('supplier')
	const [search, setSearch] = useState('')

	useEffect(() => {
		data.getData(data.stockBinId).then(stock => setStockItems(stock))
	}, [])
	
	const handleChange = (e) => {
		setSearch(e.target.value)
		window.scrollTo(0,0)
	}

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

	const searchbar = (
		<div className='searchbar_container'>
			<img className='icon_small' src={searchIcon} alt='search icon'/>
			<input onChange={handleChange} className='invisible_input' type='text' autoComplete='false' />
		</div>
	)

	const CheckList = (
		<div className="checklist_container">
			
			{stockItems && <ChecklistCategory 
			updateFn={updateQuantity} 
			stockItems={stockItems} 
			filterBy={filterBy}
			/>}

		</div>
	);

	const searchResults = () => {
		return (
			<div className="checklist_container">
				{stockItems.map((item, i) => {
			if(item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
				return <ChecklistItem 
				key={i}
				itemObject={item}
				updateQuantity={updateQuantity}
				/>
			}
		})}
			</div>
		) 
	}

	const filterBadges = (
		<div className='order_badge_container'>
			<span className='order_by'>Ordenar por</span>
			<span onClick={() => setFilterBy('supplier')} className={filterBy === 'supplier' ? 'filter_badge_active filter_badge' : 'filter_badge '}>Proveedor</span>
			<span onClick={() => setFilterBy('category')} className={filterBy === 'category' ? 'filter_badge_active filter_badge' : 'filter_badge '}>Categoría</span>
		</div>
	) 

	return (
		<div className="app">
			<a href='/editar-referencias'><img className='toolbar_icon checklist_edit_icon' src={editIcon} alt='edit icon'  /></a>
			<h1 className='screen_title'>Referencias</h1>
			{searchbar}
			{filterBadges}
			{!search && CheckList}
			{search && searchResults()}
			<button onClick={submitOrder} className="button_primary button_group order_btn">
				Generar pedido
			</button>

		</div>
	) ;
}
