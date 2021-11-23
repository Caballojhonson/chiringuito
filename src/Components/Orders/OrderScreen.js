import React, {useState, useEffect} from 'react';
import { data } from '../../data';
import '../../Styles/Orders.css'
import OrderBox from './OrderBox'; 

export default function OrderScreen() {  
    const [suppliers, setSuppliers] = useState(null)
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        data.getData(data.orderBinId).then(orders => setOrders(orders))
        data.getData(data.supplierBinId).then(suppliers => setSuppliers(suppliers))
      }, [])

    return (
        <div className="app">
            <h1>Pedidos</h1>
            {orders && suppliers && orders.map((order, i) => {
                return(
                <OrderBox suppliers={suppliers} order={order} key={i} />
                )
            })}
        </div>
    )
}
