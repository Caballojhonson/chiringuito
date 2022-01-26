import React, {useState, useEffect} from 'react';
import { data } from '../../data';
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
        data.getData(data.supplierBinId).then(suppliers => setSuppliers(suppliers))

    }, [])

    async function getOrders() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/orders')
        .then(res => setOrders(res.data.data))
        .catch(err => console.log(err))
    }

    const pendingOrders = orders && orders.filter(order => order.isArchived === false)
    const archivedOrders = orders && orders.filter(order => order.isArchived)

    // const groupedOrdersByWeek = orders && orders.reduce((groups, item) => {
    //     let week = item.week
    //     let group = groups[week] || (groups[week] = [ ]);
    //     group.push(item);
    //     return groups;
    // }, { })

    const weekSet = orders && [...new Set(orders.map(order => order.week))]

    // const pendingGroups = weekSet.map(weekDate => {

    // })

    const orderTypeHeader = (
        <div class="btn-group ordertype_selection_wrapper" role="group" aria-label="Basic example">

            <button 
            type="button" 
            class={`btn ${orderView.pending ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => setOrderView({pending: true, archived: false})}
            >En curso</button>

            <button 
            type="button" 
            class={`btn ${orderView.archived ? 'btn-success' : 'btn-secondary'}`}
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
