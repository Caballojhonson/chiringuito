import React from 'react'

export default function OrderItem(props) {
    const {item} = props
    return (
        <div className="order_item">
            <h6 className="order_item_name">{item.name}</h6>
            <p className="order_item_quantity">{item.quantity}</p>
            <p className="order_item_price">{item.price + '€'}</p>
        </div>
    )
}
