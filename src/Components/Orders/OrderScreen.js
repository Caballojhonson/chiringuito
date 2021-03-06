import React, {useState, useEffect} from 'react';
import '../../Styles/Orders.css'
import OrderBox from './OrderBox'; 
import newOrderIcon from '../../images/add-file.png';
import axios from 'axios';

export default function OrderScreen() {  
    const [suppliers, setSuppliers] = useState('')
    const [orders, setOrders] = useState('')
    const [orderView, setOrderView] = useState({
        pending: true,
        archived: false
    })

    useEffect(() => {
        getOrders()
        getSuppliers()
    }, [])

    async function getOrders() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/orders')
        .then(res => setOrders(res.data.data))
        .catch(err => console.log(err))
    }

    async function getSuppliers() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/suppliers')
        .then(res => setSuppliers(res.data.data))
        .catch(err => console.log(err))
    }


    const pendingOrders = orders && orders.filter(order => order.isArchived === false)
    const archivedOrders = orders && orders.filter(order => order.isArchived)

    const orderTypeHeader = (
        <div className="btn-group ordertype_selection_wrapper" role="group" aria-label="Basic example">

            <button 
            type="button" 
            className={`btn ${orderView.pending ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setOrderView({pending: true, archived: false})}
            >En curso</button>

            <button 
            type="button" 
            className={`btn ${orderView.archived ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setOrderView({pending: false, archived: true})}
            >Archivados</button>

        </div>
    )

    return (
        <div className="app">
            {orderTypeHeader}
            {orderView.pending && <h5 className="screen_title">Pedidos en curso</h5>}
            {orderView.archived && <h5 className="screen_title">Pedidos archivados</h5>}
            {orders && suppliers && orderView.pending && pendingOrders.map(order => {
                return(
                <OrderBox suppliers={suppliers} order={order} key={order._id} id={order._id} refreshOrders={getOrders} />
                )
            })}
            {orders && suppliers && orderView.archived && archivedOrders.map(order => {
                return(
                <OrderBox suppliers={suppliers} order={order} key={order._id} id={order._id} refreshOrders={getOrders} />
                )
            })}

            <a href="/checklist">
				<img className=" add_new_order_icon" src={newOrderIcon} alt="Menu Icon" />
			</a>
        </div>
    )
}
