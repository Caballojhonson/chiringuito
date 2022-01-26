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
				await axios.post('https://chiringuito-api.herokuapp.com/api/orders/new', order)
			})
			navigate('/pedidos')
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
