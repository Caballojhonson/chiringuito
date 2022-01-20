import React from "react";
import ChecklistItem from "../Checklist/ChecklistItem";

export default function EditOrder(props) {
  const { order, closeModal, onConfirm } = props;
  console.log(order.orders)

  const uselessFunc = () => {};

  const renderItems = (
    order.orders.forEach(order => {
      order.items.map(item => {
      return (
        <ChecklistItem
          itemObject={item}
          updateQuantity={uselessFunc}
          key={item.id}
        />
      );
    })})
  )

  return (
    <div className="app fullscreen">
        <h1 className="text-center">Editar</h1>
        {renderItems}
        <div className="button_group">
        <button onClick={closeModal} className="btn btn-secondary">Cancelar</button>
        <button onClick={onConfirm} className="btn btn-primary">Confirmar</button>
        </div>
    </div>
  );
}
