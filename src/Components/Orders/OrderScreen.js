import React, {useState, useEffect} from 'react'
import { data } from '../../data'
import '../../Styles/Orders.css'

export default function OrderScreen() {
	const orderBinId = 'a523dc4ff793';
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        data.getData(orderBinId).then(orders => setOrders(orders))
    }, [])

    return (
        <div>
            
        </div>
    )
}
