import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { data } from '../../data';
import '../../Styles/Checklist.css';
import editIcon from '../../images/edit-square-line.png'
import searchIcon from '../../images/search-line.png'
import ChecklistCategory from './ChecklistCategory';
import ChecklistItem from './ChecklistItem';
import axios from 'axios';
import startOfWeek from 'date-fns/startOfWeek';
import { isSameDay } from 'date-fns';

export default function Checklist_Main() {
	let navigate = useNavigate();

	const [stockItems, setStockItems] = useState('')
	const [order, setOrder] = useState([]);
	const [orders, setOrders] = useState('')
	const [filterBy, setFilterBy] = useState('supplier')
	const [search, setSearch] = useState('')

	useEffect(() => {
		getItems()
		getOrders()
	}, [])

	async function getItems() {
        const items = await axios.get(`https://chiringuito-api.herokuapp.com/api/items/`)
        setStockItems(items.data.data)
    }	

	async function getOrders() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/orders')
        .then(res => setOrders(res.data.data))
        .catch(err => console.log(err))
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

	const submitAsMerger = (order) => {
		const compatibleOrder = orders.find(dbOrder => {
			if (
			dbOrder.supplier === order.supplier
			&& dbOrder.isArchived === false
			&& isSameDay(new Date(dbOrder.week), startOfWeek(new Date(), { weekStartsOn: 1 }))
			&& dbOrder.orderStatus === 'Pendiente'
			&& dbOrder.paymentStatus === 'Pendiente de pago'){
			getOrders()
			return true
		}
		})

		if (compatibleOrder) 
		{
			order.items.forEach(async item => {
				await axios
				.put(`https://chiringuito-api.herokuapp.com/api/orders/additem/${compatibleOrder._id}`,
				item
				).then(() => navigate('/pedidos'))
			})
			return true
		}
		else return false
	}

	const submitOrder = () => {
		const orderedItems = order.filter((item) => item.quantity > 0);
		const suppliersInThisOrder = [...new Set(orderedItems.map(item => item.supplier))]

		const ordersBySupplier = suppliersInThisOrder.map(supplier => {
			
			const thisSuppliersOrderedItems = orderedItems.filter(item => item.supplier === supplier)
			const itemObjects = thisSuppliersOrderedItems.map(item => {
				return {
					item: item._id,
					quantity: item.quantity,
					totalPrice: item.quantity * item.price
				}
			})

			return {
				submittedBy: data.username,
				submittedAt: new Date(),
				supplier: supplier,
				orderStatus: 'Pendiente',
				paymentStatus: 'Pendiente de pago',
				totalPrice: thisSuppliersOrderedItems.reduce((a,b) => a + (b.price * b.quantity), 0),
				isArchived: false,
				items: itemObjects,
			}
		})

		if (orderedItems.length > 0) {
			ordersBySupplier.forEach(async order => {
				//IF IS MERGER.... MERGE else...
				if(submitAsMerger(order)) return
				else
				await axios.post('https://chiringuito-api.herokuapp.com/api/orders/new', order).then(() => navigate('/pedidos'))
			})
			
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
			<button onClick={submitOrder} className="button_primary button_group order_btn">
				Generar pedido
			</button>

		</div>
	) ;
}
