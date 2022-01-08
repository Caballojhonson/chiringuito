import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'

export default function Expenses(props) {
    const {financialData} = props

    const totalExpenses = financialData.expenses
    .reduce((a, b) => a + b, 0)

    function ExpenseItem(props) {
        const {item} = props

        return (
        <div className='expense_item_container'>
            <span>{format(new Date(item.payedOn), 'P', {locale: es})}</span>
            <p>{item.order.supplier}</p>
            <p><strong>{`-${item.amount}€`}</strong></p>
        </div>
        )
    }

    const allExpenseItems = financialData.expenses
        .map(item => <ExpenseItem item={item} />)

    return (
        <div className='finance_col_right'>
            <h3>Gastos</h3>
            {console.log(financialData.expenses)}
            {allExpenseItems}
        </div>
    )
}
