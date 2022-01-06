import React, {useState, useEffect} from 'react';
import { data } from '../../data';
import '../../Styles/Orders.css'
import OrderBox from './OrderBox'; 
import newOrderIcon from '../../images/add-file.png';


export default function OrderScreen() {  
    const [suppliers, setSuppliers] = useState(null)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        data.getData(data.orderBinId).then(orders => setOrders(orders))
        data.getData(data.supplierBinId).then(suppliers => setSuppliers(suppliers))
    }, [])

    return (
        <div className="app">
            <h1 className="screen_title">Pedidos</h1>
            {orders && suppliers && orders.map((order) => {
                return(
                <OrderBox suppliers={suppliers} order={order} key={order.id} id={order.id} />
                )
            })}
            <a href="/checklist">
				<img className=" add_new_order_icon" src={newOrderIcon} alt="Menu Icon" />
			</a>
        </div>
    )
}
