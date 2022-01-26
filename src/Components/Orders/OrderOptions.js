import axios from 'axios';
import React, {useState} from 'react'
import { data } from '../../data';
import dotsIcon from '../../images/3-vertical-dots.png'
import Popup from '../UI/Popup';
import EditOrder from './EditOrder';

export default function OrderOptions(props) {
    const {order, refreshOrders} = props;

    const [dropdownHidden, setdropdownHidden] = useState(true)
    const [archivePopup, setarchivePopup] = useState(false)
    const [deletionPopup, setdeletionPopup] = useState(false)
    const [editScreen, seteditScreen] = useState(false)

    const toggleDropdown = () => setdropdownHidden(prev => !prev)

    const archiveOrder = async () => {
        await axios
        .put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
		, {isArchived: true})
        setarchivePopup(false)
        refreshOrders()
    }

    const deleteOrder = async () => {
        await axios
        .delete(`https://chiringuito-api.herokuapp.com/api/orders/delete/${order._id}`)
        setdeletionPopup(false)
        refreshOrders()
    }

    const editOrder = async () => {
        order.items.forEach(async item => {
            if(!item.quantity) {
                order.items = order.items.filter(itm => itm._id !== item._id)
            } else 
            item.totalPrice = item.item.price * item.quantity
        })
        await axios
        .put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
		, {items: order.items})
        seteditScreen(false)
        refreshOrders()
    }

    const dropdownMenu = (
        <nav className='order_dropdown_container' role="navigation">
                <div onClick={() => setarchivePopup(true)} className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Archivar</p>
                </div>
                <div onClick={() => seteditScreen(true)} className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Editar</p>
                </div>
                <div onClick={() => setdeletionPopup(true)} className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Eliminar</p>
                </div>
            </nav>
    )

    return (
        <div>
            {console.log(order)}
            {archivePopup && <Popup 
                title="Archivar pedido"
                textTitle="¿Archivar?"
                text="Este pedido pasará a la historia, ¿Continuar?"
                closeModal={() => setarchivePopup(false)}
                onConfirm={archiveOrder}
                />
            }

            {deletionPopup && <Popup 
                title="Borrar pedido"
                textTitle="Vas a borrar este pedido permanentemente"
                text="CUIDAO! Si continúas el pedido se destruirá para siempre. No hay vuelta atrás"
                closeModal={() => setdeletionPopup(false)}
                onConfirm={deleteOrder}
                />
            }

            {editScreen && <EditOrder 
                order={order}
                closeModal={() => seteditScreen(false)}
                onConfirm={editOrder}
                />
            }
            <div onClick={toggleDropdown} className='order_menu_icon_wrapper'>
                <img  className='order_menu_icon' src={dotsIcon} alt='orderIcon'  />
            </div>
            {dropdownHidden ? null : dropdownMenu}
        </div>
    )
}
