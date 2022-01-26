import React from 'react'
import { data } from '../../data'
import SupplierBox from './SupplierBox'
import '../../Styles/Orders.css'
import OrderOptions from './OrderOptions'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function OrderBox(props) {
    const {order, refreshOrders} = props

    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
    }
    const date = format(new Date(order.submittedAt), 'P', {locale: es})
    const time = new Date(order.submittedAt).toLocaleTimeString('es-ES', timeOptions)

    const orderGenerationMessage = () => {
        return `Generado por ${order.submittedBy} el ${date} a las ${time}`
    }

    const supplierBoxes = (
            <SupplierBox 
            name={order.supplier} 
            order={order}
            key={data.getid()}
            id={order._id}
            refreshOrders={refreshOrders}
            />
        )

    return (
        <div className="order_box_container">
            <div className='order_title_wrapper'>
                <h5 className="order_generation">{orderGenerationMessage()}</h5>
                <OrderOptions order={order} refreshOrders={refreshOrders} />
            </div>
            {supplierBoxes}
            <h4 className="order_total">Total: {order.totalPrice.toFixed(2) + '€'}</h4>
        </div>
    )
}
