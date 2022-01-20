import React, {useEffect, useState} from 'react'
import { data } from '../../data'
import AddNewItem from './AddNewItem'
import deleteIcon from '../../images/trash-bin.png'
import Popup from '../UI/Popup'
import axios from 'axios'

export default function EditItems() {
    const [stockItems, setstockItems] = useState('')
    const [editItem, seteditItem] = useState('')
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        getItems()
    }, [])

    async function getItems() {
        const items = await axios.get(`https://chiringuito-api.herokuapp.com/api/items/`)
        setstockItems(items.data.data)
    }

    const deleteItem = async (itemToDelete) => {
        await axios
        .delete(`https://chiringuito-api.herokuapp.com/api/items/delete/${itemToDelete._id}`)
        await getItems()
        window.location.reload()
    }

    function StockItem(props) {
        const {name, price, iva, format, category, clickFn, deleteFn} = props
        return(
            <div onClick={clickFn} className='stockitem_info_wrapper'>
            <img onClick={deleteFn} className='stockitem_icon' src={deleteIcon} alt='icon'  />
                <p className='stockitem_info_text stockitem_name'>{name}</p>
                <p className='stockitem_info_text stockitem_price'>{`${price}€  / ${format}`}</p>
                <p className='stockitem_info_text'>{`${category}`}</p>
                <p className='stockitem_info_text'>{`IVA al ${Math.floor(iva * 100 - 100)}%`}</p>
            </div>

        )
    }

    const renderableStockItems = 
        stockItems && stockItems.map(item => {
            const {name, price, iva, format, category} = item
            return(
                <StockItem 
                    key={data.getid()}
                    name={name}
                    price={price}
                    iva={iva}
                    format={format}
                    category={category}
                    clickFn={() => seteditItem(item)}
                    deleteFn={() => setShowPopup(true)}
                />
            )
        })
    

    return (
        <div className='app'>
            {showPopup && <Popup 
                title='Borrar referencia'
                textTitle={`¿Borrar ${editItem.name}?`}
                text='Vas a borrar este producto permanentemente'
                closeModal={() => setShowPopup(false)}
                onConfirm={() => deleteItem(editItem)}
            />}
            {!editItem && <h4 className='screen_title'>Editar referencias</h4>}
            {editItem && <div className='app'>
            <AddNewItem stockItem={editItem} closeFn={() => seteditItem('')} />
            </div>}
            {!editItem && renderableStockItems}
        </div>
    )
}
