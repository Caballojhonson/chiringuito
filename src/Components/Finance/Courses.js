import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React from 'react'
import { data } from '../../data'

export default function Courses(props) {
    const {days} = props

    const allCourseOperations = () => {
       const allOperations = days.map(day => day.operations).flat()
       const courseOperations = allOperations.filter(op => op.opType === 'course')
       return courseOperations
    }

    function CourseItem(props) {
        const {item} = props

        return (
        <div className='expense_item_container'>
            <span>{format(new Date(item.timestamp), 'P', {locale: es})}</span>
            <p>{item.concept}</p>
            <p><strong>{`${-item.amount}€`}</strong></p>
        </div>
        )
    }

    function renderMovements() {
        return allCourseOperations().map(item => <CourseItem item={item} />)
    }

    const totalCourseCash = allCourseOperations().reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)

    const ourReturns = totalCourseCash * 0.4
    const toRepay = totalCourseCash * 0.6

    const footer = (
        <div className='course_stats_container'>
            <div className="dailybalance_container ">
                <p className="dailybalance dailybalance_tag">Total</p>
                <h1 className="dailybalance">{`${-totalCourseCash.toFixed(2)}€`}</h1>
            </div>
            <div className="dailybalance_container ">
                <p style={{color: 'green'}} className="dailybalance dailybalance_tag">Beneficio</p>
                <h1 className="dailybalance">{`${-ourReturns.toFixed(2)}€`}</h1>
            </div>
            <div className="dailybalance_container ">
                <p style={{color: 'darkred'}} className="dailybalance dailybalance_tag">Club</p>
                <h1 className="dailybalance">{`${-toRepay.toFixed(2)}€`}</h1>
            </div>
        </div>
    )

    return (
        <div className='finance_col_right'>
            <h3>Pistas</h3>
            {renderMovements()}
            {footer}
        </div>
    )
}
