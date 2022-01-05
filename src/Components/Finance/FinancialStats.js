import { isSameMonth } from 'date-fns'
import React from 'react'

export default function FinancialStats(props) {
    const {financialData} = props

    function thisMonthsBalance() {
        const daysInThisMonthArray = financialData.days.filter(day => isSameMonth(new Date(day.timestamp), new Date())) 
        const balance = daysInThisMonthArray.reduce(
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
                title= 'Balance mensual'
                balanceFn= {thisMonthsBalance}
                detailLink= {'/'}
            />
        </div>
    )
}
