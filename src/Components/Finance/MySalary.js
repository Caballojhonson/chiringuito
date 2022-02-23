import axios from 'axios'
import { format, isAfter, isBefore, isSameMonth } from 'date-fns'
import { es } from 'date-fns/locale'
import React, {useState} from 'react'
import { data } from '../../data'
import PeriodSelectorBar from '../UI/PeriodSelectorBar'

export default function MySalary(props) {
    const {salaries, refreshSalaries} = props

    const [range, setRange] = useState('')

    async function togglePayed(salaryId) {
        const salary = salaries.find(item => item._id === salaryId)
        salary.isPayed = !salary.isPayed
        await axios.put(`https://chiringuito-api.herokuapp.com/api/salaries/update/${salaryId}`, salary)
        await refreshSalaries()
    }

    function rangeHandler(start, end) {
        setRange({
            start: start,
            end: end
        })
    }

    const thisUsersSalaries = salaries.filter(salary => salary.user === data.username)
    const thisMonth = thisUsersSalaries.filter(salary => isSameMonth(new Date(salary.date), new Date()) )
    const thisPeriod = thisUsersSalaries.filter(salary => isBefore(new Date(salary.date), range.end) && isAfter(new Date(salary.date), range.start) )

    function UserSalaryItem(props) {
        const {item} = props

        return(
            <div className='expense_item_container' style={{width: '80%'}}>
                <span>{format(new Date(item.date), 'P', {locale: es})}</span>
                <p><strong>{`${item.amount}€`}</strong></p>
                <div className="form-check form-switch is_payed">
					<input
						className="form-check-input"
						type="checkbox"
						checked={item.isPayed}
						onChange={() => togglePayed(item._id)}
					/>
					<label className="form-check-label" htmlFor="formSwitchCheckChecked">
						Cobrado?
					</label>
				</div>
            </div>
        )
    }

    function displayTotalSalary(salaries) {
        const sum = salaries.reduce((a, b) => a + b.amount, 0)

        return (
            <div className="dailybalance_container">
                <h1 className="dailybalance">{`${sum}€`}</h1>
                <p className="dailybalance dailybalance_tag">Total periodo</p>
            </div>
        )
    }

    function displayUserSalaries(salaries) {
        return salaries.map((item, i) => <UserSalaryItem item={item} key={i} />)
    }


    return (
        <div className='finance_col_right'>
            {<PeriodSelectorBar handler={rangeHandler} />}
            <h3>Mis horas</h3>
            {displayUserSalaries(thisPeriod)}
            {displayTotalSalary(thisPeriod)}
        </div>
    )
}
