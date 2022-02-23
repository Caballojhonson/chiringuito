import axios from 'axios';
import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { data } from '../../data';
import '../../Styles/Calendar.css'

export default function GetPayed() {
    const [calDate, onChange] = useState(new Date());
    const [salary, setSalary] = useState('')
    const [isPayed, setIsPayed] = useState(false)

    function handleSalaryAmount(e) {
        setSalary(e.target.value)
    }

    async function submit() {
       const newSalary = {
           date: calDate,
           amount: salary,
           isPayed: isPayed,
           user: data.username,
       }

       await axios
       .post('https://chiringuito-api.herokuapp.com/api/salaries/new', newSalary)
       .then(res => console.log(res))
       .catch(err => err.message)
        window.location.reload()
    }

    const formButtons = (
        <div className="button_group form_spaced salary_btns">
					<button
						className="btn button_cancel"
						onClick={() => setSalary('')}
					>
						Cancelar
					</button>
					<button
						className="btn button_primary"
						onClick={submit}
					>
						Confirmar
					</button>
				</div>
    )

    const salaryInput = (
        <div className="form-item">
					<label htmlFor="price" className="form-label">
						Importe
					</label>
					<div className="input-group ">
						<input
							name="amount"
							value={salary}
							onChange={handleSalaryAmount}
							type="number"
							className="form-control"
							autoComplete="off"
						></input>
						<span className="input-group-text">€</span>
					</div>
				</div>
    )

    const isPayedSwitch = (
        <div className="form-check form-switch is_payed">
					<input
						name="admitsDebt"
						className="form-check-input"
						type="checkbox"
						checked={isPayed}
						onChange={() => setIsPayed(prev => !prev)}
					/>
					<label className="form-check-label" htmlFor="formSwitchCheckChecked">
						Cobrado?
					</label>
				</div>
    )

    return (
        <div className='finance_col_right'>
            <p>Selecciona un día, introduce tu sueldo</p>
            <Calendar
                onChange={onChange}
                value={calDate}
                locale={'es-ES'}
            />
            {salaryInput}
            {isPayedSwitch}
            {formButtons}
        </div>
    )
}