import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import { data } from '../../data'

export default function Expenses(props) {
    const {salaries, expenses} = props

    function ExpenseItem(props) {
        const {item} = props

        if(!item.isRecurrent && !item.fromOrder) return  // ANTI SUSANA FAILSAFE

        else return (
        <div className='expense_item_container'>
            <span>{format(new Date(item.payedOn), 'P', {locale: es})}</span>
            <p>{item.isRecurrent ? item.concept : item.fromOrder.supplier}</p>
            <p><strong>{`-${item.amount}€`}</strong></p>
        </div>
        )
    }

    function SalaryItem(props) {
        const {item} = props
        
        return(
            item.isPayed &&
            <div className='expense_item_container'>
            <span>{format(new Date(item.date), 'P', {locale: es})}</span>
            <p>{item.user}</p>
            <p><strong>{`-${item.amount}€`}</strong></p>
        </div>
        )
    }

    const allExpenseItems = expenses
        .map(item => <ExpenseItem key={data.getid()} item={item} />)

    const tenExpenseItems = expenses.slice(0, 10)
        .map(item => <ExpenseItem key={data.getid()} item={item} />)  //PLEASE FINISH MAXNUM OF EXPENSES

    const allPayedSalaries = salaries
        .map(item => <SalaryItem key={data.getid()} item={item} />)

    return (
        <div className='finance_col_right'>
            <h3>Proveedores</h3>
            {allExpenseItems}
            <h3>Salarios</h3>
            {allPayedSalaries}
        </div>
    )
}
