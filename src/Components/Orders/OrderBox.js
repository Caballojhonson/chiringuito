import React from 'react'
import { data } from '../../data'
import SupplierBox from './SupplierBox'
import '../../Styles/Orders.css'
import OrderOptions from './OrderOptions'

export default function OrderBox(props) {
    const {order, suppliers} = props

    const dateOptions= {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    }
    const date = new Intl.DateTimeFormat('es-ES', dateOptions).format(new Date(order.submittedAt))
    const time = new Date(order.submittedAt).toLocaleTimeString('es-ES', timeOptions)

    const orderGenerationMessage = () => {
        return `Generado por ${order.submittedBy} el ${date} a las ${time}`
    }

    const supplierBoxes2 = order.orders.map(supplier => {
        return (
            <SupplierBox 
            name={supplier.supplier} 
            order={supplier}
            key={data.getid()}
            id={order.id}
            />
        )
    })

    return (
        <div className="order_box_container">
            <div className='order_title_wrapper'>
                <h5 className="order_generation">{orderGenerationMessage()}</h5>
                <OrderOptions order={order} />
            </div>
            {supplierBoxes2}
            {console.log(order)}
            <h4 className="order_total">Total: {order.totalPrice.toFixed(2) + '€'}</h4>
        </div>
    )
}
