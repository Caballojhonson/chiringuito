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
        bizum: false,
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
        else if (newOperation.type === 'bizum') {
            operation.bizum = true         
        }
        console.log(operation.amount)
        operation.amount = Number(operation.amount)
        lastOperations.push(operation)
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
							<option value="deposit">Vaciado caja</option>
							<option value="bizum">Bizum</option>
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

    const amountInput = 
    newOperation.type && 
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
    (newOperation.type === 'withdrawal') ?
        <p className='operation_helper'>
            <strong style={{color: 'red'}}>Importante:</strong> <br/>
            Utilizar al retirar de caja o de cualquier otro lugar. <br/>
            Introducir las vueltas SIEMPRE en caja.
        </p>
    : null

    const depositHelper = 
    (newOperation.type === 'deposit') ?
        <p className='operation_helper'>
            <strong style={{color: 'red'}}>Importante:</strong> <br/>
            Usar en caso de GUARDAR dinero <strong>de la caja</strong> en otro lugar.
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