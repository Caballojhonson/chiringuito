import { isAfter, isBefore, isSameMonth, isSameWeek } from 'date-fns'
import React, {useState} from 'react'
import PeriodSelectorBar from '../UI/PeriodSelectorBar'

export default function FinancialStats(props) {
    const {financialData, days, salaries, expenses} = props

    const [range, setRange] = useState('')

    function rangeHandler(start, end) {
        setRange({
            start: start,
            end: end
        })
    }

    function thisMonthsEarnings() {
        const daysInThisMonth = days.filter(day =>
            !day.isOpen && isSameMonth(new Date(day.timestamp), new Date())) 
        const balance = daysInThisMonth.reduce(
        (prev, curr) => prev + curr.totalBalance, 0)
        return Number(balance)
    } 

    function thisWeeksEarnings() {
        const daysInThisWeek = days.filter(day =>
            !day.isOpen && isSameWeek(new Date(day.timestamp), new Date(), { weekStartsOn: 1 }))
        const balance = daysInThisWeek.reduce(
            (prev, curr) => prev + curr.totalBalance, 0)
            return Number(balance)
    }

    function thisPeriodsEarnings() {
        const daysInThisPeriod = days.filter(day => 
            isBefore(new Date(day.timestamp), range.end) && 
            isAfter(new Date(day.timestamp), range.start)
            )
        
        const balance = daysInThisPeriod.reduce(
            (prev, curr) => prev + curr.totalBalance, 0)

        return Number(balance)
    }

    const totalExpenses = () => expenses
    .reduce((a, b) => a - b.amount, 0)

    const totalSalaries = () => salaries
    .reduce((a, b) => a - b.amount, 0)

    const totalExpenditure = () =>  totalExpenses() + totalSalaries()

    const balanceColor = (num) => {
        const green = {color: 'green'}
        const red = {color: 'red'}
        return (num >= 0) ? green : red
    }

    const StatBox = (props) => {
        const {title, balanceFn, detailLink} = props
        return(
        <div className='statbox_wrapper'>
            <h4 className='text-center'>{title}</h4>
            <h1 style={balanceColor(balanceFn())}>{`${balanceFn().toFixed(2)}€`}</h1>
            <a className='statBox_detail_link' href={detailLink}>Ver detalle</a>
        </div>
        )
    }

    const financialStatement = (
        <div>
            
        </div>
    )

    return (
        <div className='stats_section_container'>
            {<PeriodSelectorBar handler={rangeHandler} />}
            <StatBox
                title= 'Facturación esta semana'
                balanceFn= {thisWeeksEarnings}
                detailLink= {'/'}
            />
            <StatBox
                title= 'Facturación este mes'
                balanceFn= {thisMonthsEarnings}
                detailLink= {'/'}
            />
            <StatBox
                title= 'Compras'
                balanceFn= {totalExpenses}
                detailLink= {'/'}
            />
            <StatBox
                title= 'Salarios'
                balanceFn= {totalSalaries}
                detailLink= {'/'}
            />
            <StatBox
                title= 'Gastos totales'
                balanceFn= {totalExpenditure}
                detailLink= {'/'}
            />
        </div>
    ) 
}
