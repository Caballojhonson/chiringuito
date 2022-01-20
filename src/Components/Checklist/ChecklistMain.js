import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { data } from '../../data';
import '../../Styles/Checklist.css';
import editIcon from '../../images/edit-square-line.png'
import searchIcon from '../../images/search-line.png'
import ChecklistCategory from './ChecklistCategory';
import ChecklistItem from './ChecklistItem';
import axios from 'axios';

export default function Checklist_Main() {
	let navigate = useNavigate();

	const [stockItems, setStockItems] = useState('')
	const [order, setOrder] = useState([]);
	const [filterBy, setFilterBy] = useState('supplier')
	const [search, setSearch] = useState('')

	useEffect(() => {
		getItems()
	}, [])

	async function getItems() {
        const items = await axios.get(`https://chiringuito-api.herokuapp.com/api/items/`)
        setStockItems(items.data.data)
    }	

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

	const submitOrder2 = async () => {
		const orderedItems = order.filter((item) => item.quantity > 0);
		const totalPrice = orderedItems.reduce(
			(prev, curr) => Number(prev) + Number(curr.price * curr.quantity), 0)
		const suppliersInThisOrder = [...new Set(orderedItems.map(item => item.supplier))]
		const ordersBySupplier = suppliersInThisOrder.map(supplier => {
			const thisSuppliersOrderedItems = orderedItems.filter(item => item.supplier === supplier)
			return {
				orderStatus: 'Pendiente',
				paymentStatus: 'Pendiente de pago',
				supplier: supplier,
				id: data.getid(),
				items: thisSuppliersOrderedItems,
				isArchived: false,
				totalPrice: thisSuppliersOrderedItems.reduce((a,b) => a + (b.price * b.quantity), 0)
			}
		})

		if (orderedItems.length > 0) {
			const newOrder = {
				orders: ordersBySupplier,
				id: data.getid(),
				submittedBy: data.username,
				submittedAt: new Date(),
				isArchived: false,
				totalPrice: totalPrice,
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
			key={data.getid()}
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
			<button onClick={submitOrder2} className="button_primary button_group order_btn">
				Generar pedido
			</button>

		</div>
	) ;
}
