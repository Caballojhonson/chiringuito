import React from 'react'
import { data } from '../../data'
import ChecklistItem from './ChecklistItem'

export default function ChecklistCategory(props) {
    const {stockItems, updateFn, filterBy} = props

const getAllCategories = () => [...new Set(stockItems.map(item => capitalize(item.category)))]
const getAllSuppliers = () => [...new Set(stockItems.map(item => capitalize(item.supplier)))]

function capitalize(word) {
    return (
        word.charAt(0).toUpperCase() + word.slice(1)
    )
}

function CriteriaBox(props) {
    const {title, itemList} = props
    return (
        <div>
            <h5>{title}</h5>
            <div>
                {itemList}
            </div>
        </div>
    )
}

const itemsByCategory = () => {
    return getAllCategories().map(category => {
        return (<CriteriaBox
            key={data.getid()} 
            title={capitalize(category)} 
            itemList={stockItems.map((item, i) => {
           if(capitalize(item.category) === category) {
               return <ChecklistItem key={i} updateQuantity={updateFn}  itemObject={item} />
           }
        })} />)
    })
}

const itemsBySupplier = () => {
    return getAllSuppliers().map(supplier => {
        return (<CriteriaBox
            key={data.getid()} 
            title={capitalize(supplier)} 
            itemList={stockItems.map((item, i) => {
           if(capitalize(item.supplier) === supplier) {
               return <ChecklistItem key={i} updateQuantity={updateFn}  itemObject={item} />
           }
        })} />)
    })
}


    return (
        <div>
            {filterBy === 'category' && itemsByCategory()}
            {filterBy === 'supplier' && itemsBySupplier()}
        </div>
    )
}
