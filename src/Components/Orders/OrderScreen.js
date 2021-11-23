import React, {useState, useEffect} from 'react';
import { data } from '../../data';
import '../../Styles/Orders.css'
import OrderBox from './OrderBox'; 

export default function OrderScreen() {
    const orderBinId = 'a523dc4ff793';
  
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        data.getData(orderBinId).then(orders => setOrders(orders))
      }, [])

    return (
        <div className="app">
            {orders && orders.map(order => {
                <OrderBox order={order} />
            })}
        </div>
    )
}
