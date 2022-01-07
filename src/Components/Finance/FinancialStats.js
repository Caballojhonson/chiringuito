import { isSameMonth, isSameWeek } from 'date-fns'
import React from 'react'

export default function FinancialStats(props) {
    const {financialData} = props

    function thisMonthsEarnings() {
        const daysInThisMonth = financialData.days.filter(day =>
            !day.isOpen && isSameMonth(new Date(day.timestamp), new Date())) 
        const balance = daysInThisMonth.reduce(
        (prev, curr) => prev + curr.totalBalance, 0)
        return Number(balance)
    } 

    function thisWeeksEarnings() {
        const daysInThisWeek = financialData.days.filter(day =>
            !day.isOpen && isSameWeek(new Date(day.timestamp), new Date()))
        const balance = daysInThisWeek.reduce(
            (prev, curr) => prev + curr.totalBalance, 0)
            return Number(balance)
    }

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
            <h1 style={balanceColor(balanceFn())}>{`${balanceFn()}€`}</h1>
            <a className='statBox_detail_link' href={detailLink}>Ver detalle</a>
        </div>
        )
    }

    return (
        <div className='stats_section_container'>
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
        </div>
    )
}
