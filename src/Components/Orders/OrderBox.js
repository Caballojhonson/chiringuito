import React from 'react'
import { data } from '../../data'
import SupplierBox from './SupplierBox'

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
    const totalOrderPrice = () => order.order.reduce((a,b) => {return parseFloat(a) + parseFloat(b.price)}, 0)
    const suppilerBoxes = suppliers.map(supplier => {
        if(order.order.some(item => item.provider === supplier.name)) {
        return(
            <SupplierBox name={supplier.name} order={order.order.filter(item => item.provider === supplier.name)} />
        )
        }
    })

    return (
        <div className="order_box_container">
            <h5 className="order_generation">{`Generado por ${order.submittedBy} el ${date} a las ${time}`}</h5>
            {suppilerBoxes}
            <h4 className="order_total">Total: {totalOrderPrice().toFixed(2) + '€'}</h4>

        </div>
    )
}
