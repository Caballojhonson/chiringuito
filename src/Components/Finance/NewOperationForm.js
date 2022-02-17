import axios from 'axios';
import React, {useState} from 'react'
import { data } from '../../data';

export default function NewOperationForm(props) {
    const {closeModal, financialData, lastDay, refreshDays} = props

    const [newOperation, setnewOperation] = useState({
        usr: data.username,
        timestamp: new Date(),
        concept: '',
        amount: '',
        opType: '',
        bizum: false,
    })

    const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setnewOperation({ ...newOperation, [name]: value });
	};

    const handleConfirm = async () => {
        const operation = newOperation
        if(newOperation.opType === 'deposit' || newOperation.opType === 'course') {
            operation.amount = -operation.amount 
        }
        else if (newOperation.opType === 'bizum') {
            operation.bizum = true         
        }
        operation.amount = Number(operation.amount)
        await axios
        .put(`https://chiringuito-api.herokuapp.com/api/days/newop/${lastDay._id}`,
        operation
        )
        await refreshDays()
        closeModal()
    }

    const typeSelect = (
        <div className="dropdown-contianer">
					<div className="form-item">
						<select
							name="opType"
							value={newOperation.opType}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">Tipo</option>
							<option value="withdrawal">Saco pasta</option>
							<option value="deposit">Meto pasta</option>
							<option value="bizum">Bizum</option>
                            <option value="course">Pista</option>
						</select>
					</div>
                </div>
    )

    const conceptInput = 
        newOperation.opType &&
        newOperation.opType !== 'salary' &&
        (
            <div className="form-item">
            <label htmlFor="productName" className="form-label">
                Concepto
            </label>
            <input
                name="concept"
                value={newOperation.concept}
                onChange={handleChange}
                type="text"
                className="form-control"
                autoComplete="off"
            ></input>
            </div>
        )

    const amountInput = 
    newOperation.opType && 
    (
        <div className="form-item">
					<label htmlFor="price" className="form-label">
						Importe
					</label>
					<div className="input-group">
						<input
							name="amount"
							value={newOperation.amount}
							onChange={handleChange}
							type="number"
							className="form-control"
							autoComplete="off"
						></input>
						<span className="input-group-text">€</span>
					</div>
				</div>
    )

    const formButtons = (
        <div className="button_group form_spaced">
					<button
						className="btn button_cancel"
						onClick={closeModal}
					>
						Cancelar
					</button>
					<button
						className="btn button_primary"
						onClick={handleConfirm}
					>
						Confirmar
					</button>
				</div>
    )

    const withdrawalHelper = 
    (newOperation.opType === 'withdrawal') ?
        <p className='operation_helper'>
            <strong style={{color: 'red'}}>Importante:</strong> <br/>
            Utilizar solamente si retiras de CAJA<br/>
        </p>
    : null

    const depositHelper = 
    (newOperation.opType === 'deposit') ?
        <p className='operation_helper'>
            <strong style={{color: 'red'}}>Importante:</strong> <br/>
            Usar en caso de meter dinero EN LA CAJA
        </p>
    : null

    return (
        <div className='form_spaced'>

            <h3 className='text-center'>Nuevo movimiento</h3>

            {typeSelect}
            {withdrawalHelper}
            {depositHelper}
            {conceptInput}
            {amountInput}
            {formButtons}

        </div>
    )   
}