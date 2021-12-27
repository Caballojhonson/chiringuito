import React, {useState} from 'react'
import { data } from '../../data';
import dotsIcon from '../../images/3-vertical-dots.png'
import Popup from '../UI/Popup';

export default function OrderOptions(props) {
    const {order} = props;

    const [dropdownHidden, setdropdownHidden] = useState(true)
    const [archivePopup, setarchivePopup] = useState(false)
    const [deletionPopup, setdeletionPopup] = useState(false)

    const toggleDropdown = () => setdropdownHidden(prev => !prev)

    const archiveOrder = async () => {
        const orders =  await data.getData(data.orderBinId);
        const setArchived = () => orders.find(item => order.id === item.id).isArchived = true;
        setArchived();
        await data.overwriteBin(data.orderBinId, orders)
        setarchivePopup(false)
    }

    const deleteOrder = async () => {
        const orders =  await data.getData(data.orderBinId);
        const updatedOrders = orders.filter(val => val.id !== order.id)
        await data.overwriteBin(data.orderBinId, updatedOrders)
        setdeletionPopup(false)
    }

    const dropdownMenu = (
        <nav className='order_dropdown_container' role="navigation">
                <div onClick={() => setarchivePopup(true)} className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Archivar</p>
                </div>
                <div  className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Editar</p>
                </div>
                <div onClick={() => setdeletionPopup(true)} className='order_dropdown_tab'>
                    <p className='order_dropdown_text'>Eliminar</p>
                </div>
            </nav>
    )

    return (
        <div>
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
            <img onClick={toggleDropdown} className='order_menu_icon' src={dotsIcon} />
            {dropdownHidden ? null : dropdownMenu}
            {console.log(order)}
        </div>
    )
}
