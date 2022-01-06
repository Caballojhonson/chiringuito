import React from 'react'
import ChecklistItem from './ChecklistItem'

export default function ChecklistCategory(props) {
    const {stockItems, updateFn, filterBy} = props

const getAllCategories = () => [...new Set(stockItems.map(item => item.category))]
const getAllSuppliers = () => [...new Set(stockItems.map(item => item.supplier))]

//          PLEASE REFACTOR!!!!

function capitalize(word) {
    return (
        word.charAt(0).toUpperCase() + word.slice(1)
    )
}

//          PLEASE REFACTOR!!!!

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
//          PLEASE REFACTOR!!!!

const itemsByCategory = () => {

    return getAllCategories().map(category => {
        return (<CriteriaBox title={capitalize(category)} itemList={stockItems.map((item, i) => {
           if(item.category === category) {
               return <ChecklistItem key={i} updateQuantity={updateFn}  itemObject={item} />
           }
        })} />)
    })
}

const itemsBySupplier = () => {
    return getAllSuppliers().map(supplier => {
        return (<CriteriaBox title={capitalize(supplier)} itemList={stockItems.map((item, i) => {
           if(item.supplier === supplier) {
               return <ChecklistItem key={i} updateQuantity={updateFn}  itemObject={item} />
           }
        })} />)
    })
}


    return (
        <div>
            {console.log(getAllCategories())}
            {filterBy === 'category' && itemsByCategory()}
            {filterBy === 'supplier' && itemsBySupplier()}
        </div>
    )
}
