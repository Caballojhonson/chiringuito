import React, {useState, useEffect} from 'react'
import { data } from '../../data'

export default function DebtsOut(props) {
    const {financialData} = props
    const [orders, setOrders] = useState('')

    useEffect(() => {
        data.getData(data.orderBinId).then(res => setOrders(res))
        return () => {
            setOrders('')
        }
    }, [])

    const supplierTotalDebt = () => {
        const orderedOrRecieved = orders.filter(order => order.order.filter(item => item.paymentStatus === 'Recibido'))
        console.log(orderedOrRecieved)
    }


    return (
        <div className="finance_col_right">
            <h3>Acreedores</h3>
            <h6>Proveedores</h6>
            {orders && supplierTotalDebt()}
        </div>
    )
}
