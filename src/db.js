import React from "react"
import axios from "axios"

const collections = [
    'days',
    'debts',
    'expenses',
    'fixed',
    'items',
    'meals',
    'orders',
    'salaries',
    'suppliers',
]
const db = {}

collections.forEach(collection => {
    db[collection] = async () => {
        const response = await axios.get(`https://chiringuito-api.herokuapp.com/api/${collection}`)
        return response.data.data
}
})

async function loadStore(setFn) {
    const days = await db.days()
    const debts = await db.debts()
    const expenses = await db.expenses()
    const fixeds = await db.fixed()
    const items = await db.items()
    const meals = await db.meals()
    const salaries = await db.salaries()
    const orders = await db.orders()
    const suppliers = await db.suppliers()

    setFn({
         days: days,
         debts: debts,
         expenses: expenses,
         fixeds: fixeds,
         items: items,
         meals: meals,
         salaries: salaries,
         orders: orders,
         suppliers: suppliers
        })
}

export {loadStore}

// Usage :
// loadStore(setSTATE function in top level component)
// link state value to context provider
// consume as useStore() in child elements