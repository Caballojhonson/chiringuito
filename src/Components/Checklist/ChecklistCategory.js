import React from 'react'
import ChecklistItem from './ChecklistItem'

export default function ChecklistCategory(props) {
    const {stockItems, updateFn} = props

const getAllCategories = () => [...new Set(stockItems.map(item => item.category))]
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
            <h1>{title}</h1>
            <div>
                {itemList}
            </div>
        </div>
    )
}
//          PLEASE REFACTOR!!!!

const itemsByCategory = () => {

    return getAllCategories().map(category => {
        return (<CriteriaBox title={capitalize(category)} itemList={stockItems.map(item => {
           if(item.category === category) {
               return <ChecklistItem updateQuantity={updateFn}  itemObject={item} />
           }
        })} />)
    })
}
//          PLEASE REFACTOR!!!!


    return (
        <div>
            {console.log(getAllCategories())}
            {itemsByCategory()}
        </div>
    )
}
