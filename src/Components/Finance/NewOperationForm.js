import React, {useState} from 'react'
import { data } from '../../data';

export default function NewOperationForm(props) {
    const {closeModal, financialData} = props

    const [newOperation, setnewOperation] = useState({
        usr: data.username,
        timestamp: new Date(),
        concept: '',
        amount: '',
        type: '',
    })

    const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setnewOperation({ ...newOperation, [name]: value });
	};

    const handleConfirm = async () => {
        const operation = newOperation
        const lastOperations = financialData.days[financialData.days.length - 1].operations
        if(newOperation.type === 'withdrawal') {
            operation.amount = -operation.amount 
        }
        else if (newOperation.type === 'salary') {
            operation.amount = -operation.amount 
            operation.concept = `Sueldo de ${data.username}`            
        }
        lastOperations.push(newOperation)
        await data.overwriteBin(data.financeBinId, financialData)
        closeModal()
        window.location.reload()
    }

    const typeSelect = (
        <div className="dropdown-contianer">
					<div className="form-item">
						<select
							name="type"
							value={newOperation.type}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">Tipo</option>
							<option value="withdrawal">Retirada</option>
							<option value="deposit">Ingreso</option>
							<option value="salary">Salario</option>
						</select>
					</div>
                </div>
    )

    const conceptInput = 
        newOperation.type &&
        newOperation.type !== 'salary' &&
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

    const amountInput = newOperation.type && (
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
        <div className="button_group">
					<button
						className="button_primary button_cancel"
						onClick={closeModal}
					>
						Cancelar
					</button>
					<button
						className="button_primary button_accept"
						onClick={handleConfirm}
					>
						Confirmar
					</button>
				</div>
    )

    return (
        <div>

            <h3 className='text-center'>Nuevo movimiento</h3>

            {typeSelect}
            {conceptInput}
            {amountInput}
            {formButtons}

                

        </div>
    )   
}