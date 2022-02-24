import { isAfter, isBefore, isSameMonth, isSameWeek } from 'date-fns'
import React, {useState} from 'react'
import PeriodSelectorBar from '../UI/PeriodSelectorBar'

export default function FinancialStats(props) {
    const {days, salaries, expenses, debts} = props

    const [range, setRange] = useState('')

    function rangeHandler(start, end) {
        setRange({
            start: start,
            end: end
        })
    }

    // COURSES

    const allCourseOperationsInThisPeriod = () => {
        const allOperations = days.map(day => day.operations).flat()
        const courseOperations = allOperations.filter(op => {
        return (
            op.opType === 'course_e' ||
            op.opType === 'course_n' ||
            op.opType === 'course_a')
        })
        const filteredByDateRange = courseOperations.filter(op => 
            isBefore(new Date(op.timestamp), range.end) && 
            isAfter(new Date(op.timestamp), range.start)
            )
        return filteredByDateRange
    }

    const schoolCourseOps = allCourseOperationsInThisPeriod().filter(op => op.opType === 'course_e')
    const privateCourseOps = allCourseOperationsInThisPeriod().filter(op => op.opType === 'course_n')
    const anualCourseOps = allCourseOperationsInThisPeriod().filter(op => op.opType === 'course_a')

    const totalSchoolCourseCash = schoolCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalPrivateCourseCash = privateCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalAnualCourseCash = anualCourseOps.reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)
    const totalCourseCash = allCourseOperationsInThisPeriod().reduce((acc, curr) => {
        return acc + curr.amount
    }, 0)

    const ourSchoolReturns = totalSchoolCourseCash * 0.4
    const coursesToRepay = totalSchoolCourseCash * 0.6

    const totalCourseReturns = ourSchoolReturns + totalPrivateCourseCash + totalAnualCourseCash

    // EARNINGS

    const daysInThisPeriod = days.filter(day => 
        isBefore(new Date(day.timestamp), range.end) && 
        isAfter(new Date(day.timestamp), range.start)
        )

    function thisPeriodsBarCash() {
        const balance = daysInThisPeriod.reduce(
            (prev, curr) => prev + curr.totalBalance, 0).toFixed(2)

        return Number(balance)
    }

    const totalEarnings = thisPeriodsBarCash() + -totalCourseCash

    // EXPENSES

    const supplierExpenses = expenses.filter(expense => expense.concept === 'order')
    const fixedExpenses = expenses.filter(expense => expense.isRecurrent)

    const thisPeriodsSupplierExpenses = supplierExpenses.filter(expense => 
        isBefore(new Date(expense.payedOn), range.end) && 
        isAfter(new Date(expense.payedOn), range.start)
        )

    const thisPeriodsFixedExpenses = fixedExpenses.filter(expense => 
        isBefore(new Date(expense.payedOn), range.end) && 
        isAfter(new Date(expense.payedOn), range.start)
        )

    const thisPeriodsTotalExpenses = expenses.filter(expense => 
        isBefore(new Date(expense.payedOn), range.end) && 
        isAfter(new Date(expense.payedOn), range.start)
        )

    const totalSupplierExpenses = () => thisPeriodsSupplierExpenses
    .reduce((a, b) => a - b.amount, 0).toFixed(2)

    const totalFixedExpenses = () => thisPeriodsFixedExpenses
    .reduce((a, b) => a - b.amount, 0).toFixed(2)

    const totalExpenses = () => thisPeriodsTotalExpenses
    .reduce((a, b) => a - b.amount, 0).toFixed(2)

    // SALARIES

    const thisPeriodsSalaries = salaries.filter(salary => 
        isBefore(new Date(salary.date), range.end) && 
        isAfter(new Date(salary.date), range.start)
        )

    const totalSalaries = () => thisPeriodsSalaries
    .reduce((a, b) => a - b.amount, 0).toFixed(2)

    // DEBTS
    const debtsInRange = debts.filter(debt => 
        isBefore(new Date(debt.generatedOn), range.end) && 
        isAfter(new Date(debt.generatedOn), range.start)
        )
    const totalDebt = () => debtsInRange.length && debts
    .reduce((a, b) => a - b.amount, 0).toFixed(2)

    //const totalExpenditure = () =>  totalExpenses() + totalSalaries()

    // const balanceColor = (num) => {
    //     const green = {color: 'green'}
    //     const red = {color: 'red'}
    //     return (num >= 0) ? green : red
    // }

    // const StatBox = (props) => {
    //     const {title, balanceFn, detailLink} = props
    //     return(
    //     <div className='statbox_wrapper'>
    //         <h4 className='text-center'>{title}</h4>
    //         <h1 style={balanceColor(balanceFn())}>{`${balanceFn().toFixed(2)}€`}</h1>
    //         <a className='statBox_detail_link' href={detailLink}>Ver detalle</a>
    //     </div>
    //     )
    // }

    // BALANCE SHEET

    const totalExpenditure = 
    Number(totalSupplierExpenses()) +
    Number(totalFixedExpenses()) +
    Number(totalSalaries()) +
    Number(totalDebt()) +
    Number(coursesToRepay)

    const totalBalance = (totalEarnings + totalExpenditure).toFixed(2)

    const financialStatement = (
        <div style={{width: '80%'}}>

            <h6 className='text-center'>Facturación</h6>

            <div className="stats_financial_row">
                <span>Cajas</span>
                <p><strong>{`${thisPeriodsBarCash()}€`}</strong></p>
            </div>
            <div className="stats_financial_row">
                <span>Pistas</span>
                <p><strong>{`${-totalCourseCash}€`}</strong></p>
            </div>
            <div className="stats_financial_row" style={{marginTop: '1rem'}}>
                <span>Total</span>
                <p><strong>{`${totalEarnings}€`}</strong></p>
            </div>

            <h6 className='text-center' style={{marginTop: '1rem'}}>Gastos</h6>

            <div className="stats_financial_row">
                <span>Proveedores</span>
                <p><strong>{`${totalSupplierExpenses()}€`}</strong></p>
            </div>
            <div className="stats_financial_row">
                <span>Gastos fijos</span>
                <p><strong>{`${totalFixedExpenses()}€`}</strong></p>
            </div>
            <div className="stats_financial_row">
                <span>Sueldos</span>
                <p><strong>{`${totalSalaries()}€`}</strong></p>
            </div>
            <div className="stats_financial_row">
                <span>Deudas</span>
                <p><strong>{`${totalDebt()}€`}</strong></p>
            </div>
            <div className="stats_financial_row">
                <span>Pistas</span>
                <p><strong>{`${coursesToRepay}€`}</strong></p>
            </div>
            <div className="stats_financial_row" style={{marginTop: '1rem'}}>
                <span>Total</span>
                <p><strong>{`${totalExpenditure}€`}</strong></p>
            </div>

            <h6 className='text-center' style={{marginTop: '1rem'}}>Resultado</h6>
            <div  style={{marginTop: '1rem'}}>
                <p className="text-center" style={{fontSize: '1.2rem'}} ><strong>{`${totalBalance}€`}</strong></p>
            </div>
        </div>
    )

    return (
        <div className='stats_section_container'>
            {<PeriodSelectorBar handler={rangeHandler} />}
            {/* <StatBox
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
            />  */}
            {financialStatement}
        </div>
    ) 
}
