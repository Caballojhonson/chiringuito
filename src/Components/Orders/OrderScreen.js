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

      //data.overwriteBin(data.stockBinId, []).then(val => console.log(val))
      //data.overwriteBin(data.orderBinId, []).then(val => console.log(val))

    return (
        <div className="app">
            <h1 className="order_title">Pedidos</h1>
            {orders && suppliers && orders.map((order, i) => {
                return(
                <OrderBox suppliers={suppliers} order={order} key={i} id={i} />
                )
            })}
        </div>
    )
}
