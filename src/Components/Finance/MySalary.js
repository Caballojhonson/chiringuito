import axios from 'axios'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import React, {useState} from 'react'
import { data } from '../../data'

export default function MySalary(props) {
    const {financialData, salaries, refreshSalaries} = props



    async function togglePayed(salaryId) {
        console.log(salaries)
        console.log(salaryId.toString())
        const salary = salaries.find(item => item._id === salaryId)
        salary.isPayed = !salary.isPayed
        await axios.put(`https://chiringuito-api.herokuapp.com/api/salaries/update/${salaryId}`, salary)
        refreshSalaries()
        // const salary = financialData.salaries.find(item => item.id === salaryId)
        // salary.isPayed = !salary.isPayed
        // console.log(salary)
        // await data.overwriteBin(data.financeBinId, financialData)
        // window.location.reload()
    }

    const thisUsersSalaries = salaries.filter(salary => salary.user === data.username)

    const displayUserSalaries = thisUsersSalaries.map(item => <UserSalaryItem item={item} />)

    function UserSalaryItem(props) {
        const {item} = props

        return(
            <div className='expense_item_container'>
                <span>{format(new Date(item.date), 'P', {locale: es})}</span>
                <p>{item.user}</p>
                <p><strong>{`-${item.amount}€`}</strong></p>
                <div className="form-check form-switch is_payed">
					<input
						name="admitsDebt"
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


    return (
        <div className='finance_col_right'>
            <h3>Mis horas</h3>
            {displayUserSalaries}

        </div>
    )
}
