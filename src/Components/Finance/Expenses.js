import { format, isAfter, isBefore } from 'date-fns'
import { es } from 'date-fns/locale'
import React, {useState} from 'react'
import { data } from '../../data'
import PeriodSelectorBar from '../UI/PeriodSelectorBar'

export default function Expenses(props) {
    const {salaries, expenses} = props

    const [range, setRange] = useState('')
    function rangeHandler(start, end) {
        setRange({
            start: start,
            end: end
        })
    }

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

    const thisPeriodsExpenses = expenses
    .filter(expense => 
        isBefore(new Date(expense.payedOn), range.end) && 
        isAfter(new Date(expense.payedOn), range.start) )

    const thisPeriodsSalaries = salaries
    .filter(salary => 
        isBefore(new Date(salary.date), range.end) && 
        isAfter(new Date(salary.date), range.start) )

    const allExpenseItems = thisPeriodsExpenses
        .map(item => <ExpenseItem key={data.getid()} item={item} />)

    const allPayedSalaries = thisPeriodsSalaries
        .map(item => <SalaryItem key={data.getid()} item={item} />)

    return (
        <div className='finance_col_right'>
            <PeriodSelectorBar handler={rangeHandler} />
            <h3>Proveedores</h3>
            {allExpenseItems}
            <h3>Salarios</h3>
            {allPayedSalaries}
        </div>
    )
}
