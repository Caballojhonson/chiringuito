import React from 'react'
import { data } from '../../data'
import SupplierBox from './SupplierBox'
import dotsIcon from '../../images/3-vertical-dots.png'
import '../../Styles/Orders.css'

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

    const totalOrderPrice = () => {
        const sum = order.order.reduce((a,b) => {
            return  (parseFloat(b.price * b.quantity)) + parseFloat(a)  
        }, 0) 
        return (sum.toFixed(2) + '€')
    }

    const orderGenerationMessage = () => {
        return `Generado por ${order.submittedBy} el ${date} a las ${time}`
    }

    const suppilerBoxes = suppliers.map((supplier) => {
        
        if(order.order.some(item => item.supplier === supplier.name)) {
        return(
            <SupplierBox 
            name={supplier.name} 
            order={order.order.filter(item => item.supplier === supplier.name)}
            key={data.getid()}
            id={order.id}
            />
        )
        }
        
    })

    const orderSettingsDropdown = (
        <div className='order_dropdown_container'>
            <a>Archivar pedido</a>
            <a>Editar</a>
            <a>Eliminar</a>
        </div>
    )

    return (
        <div className="order_box_container">
            <div className='order_title_wrapper'>
                <h5 className="order_generation">{orderGenerationMessage()}</h5>
                <img className='order_menu_icon' src={dotsIcon} />
            </div>
            {suppilerBoxes}
            <h4 className="order_total">Total: {totalOrderPrice()}</h4>

        </div>
    )
}
