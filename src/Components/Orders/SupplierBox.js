import React from 'react'
import OrderItem from './OrderItem'

export default function SupplierBox(props) {
  const {name, order} = props
  const supplierTotal = () => {
      const sum = order.reduce((a, b) => {
         return parseFloat(a) + (parseFloat(b.price) * parseFloat(b.quantity))
      }, 0)
      return sum.toFixed(2) + '€'
  }
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
            <h6 className="order_supplier_total">{supplierTotal()}</h6>
        </div>
    )
}
