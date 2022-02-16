import axios from 'axios';
import { startOfMonth } from 'date-fns';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';

export default function AddNewSupplier() {
	let navigate = useNavigate();

	const [newExpense, setNewExpense] = useState({
        amount: '',
        createdBy: data.username,
        createdOn: new Date(),
        concept: '',
        dueBy: '', //Day of month
        frequency: ''
	});

	const handleChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;

		setNewExpense({ ...newExpense, [name]: value });
	};

    const handleSubmit = async () => {
        await axios
        .post(`https://chiringuito-api.herokuapp.com/api/fixed/new`,
        newExpense
        )
        navigate('/finanzas')
    }

	return (
		<div className="form_container">
			<button
				type="button"
				className="btn-close"
				aria-label="Close"
				onClick={() => navigate('/opciones')}
			></button>

			<div className="form-item">
				<label htmlFor="concept" className="form-label">
					Concepto
				</label>
				<input
					name="concept"
					value={newExpense.concept}
					onChange={handleChange}
					type="text"
					className="form-control"
					autoComplete="off"
				></input>
			</div>

            <div className="dropdown-contianer">
					<div className="form-item">
						<select
							name="frequency"
							value={newExpense.frequency}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">Frecuencia</option>
							<option value="1">1 mes</option>
							<option value="3">3 meses</option>
							<option value="12">12 meses</option>
						</select>
					</div>
            </div>

            <div className="form-item">
					<label htmlFor="dueBy" className="form-label">
						Día límite de pago
					</label>
					<div className="input-group">
						<input
							name="dueBy"
							value={newExpense.dueBy}
							onChange={handleChange}
							type="number"
							className="form-control"
							autoComplete="off"
						></input>
					</div>
				</div>

                <div className="form-item">
					<label htmlFor="amount" className="form-label">
						Cantidad
					</label>
					<div className="input-group">
						<input
							name="amount"
							value={newExpense.amount}
							onChange={handleChange}
							type="number"
							className="form-control"
							autoComplete="off"
						></input>
						<span className="input-group-text">€</span>
					</div>
				</div>

                <div className="button_group">
					<button
						className="button_primary button_cancel"
						onClick={() => navigate('/finanzas')}
					>
						Cancelar
					</button>
					<button
						className="button_primary button_accept"
						onClick={handleSubmit}
					>
						Añadir
					</button>
				</div>

		</div>
	);
}
