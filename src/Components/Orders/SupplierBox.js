import React from 'react'
import OrderItem from './OrderItem'

export default function SupplierBox(props) {
  const {name, order} = props
    return (
        <div className="supplier_box">
            <h4 className="supplier_name">{name}</h4>
            <div className="order_item_container">
                {order.map(item => {
                    return(
                        <OrderItem item={item} />
                    )
                })}
            </div>
            <h6 className="order_supplier_total">{'Total: ' + (order.reduce((a,b) => {return parseFloat(a) + parseFloat(b.price)}, 0)).toFixed(2) + '€'}</h6>
        </div>
    )
}
