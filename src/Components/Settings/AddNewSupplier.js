import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNewSupplier() {
	let navigate = useNavigate();

	const [newSupplier, setNewSupplier] = useState({
		name: '',
		cif: '',
		phoneNumber: '+34 ',
		delivers: false,
		admitsDebt: false,
		delivery: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
		if (name === 'delivers') {
			value = !newSupplier.delivers;
		}
		if (name === 'admitsDebt') {
			value = !newSupplier.admitsDebt;
		}
		setNewSupplier({ ...newSupplier, [name]: value });
	};

	const handleSubmit = async () => {
		await submitSupplier();
		navigate('/opciones');
	};

	async function submitSupplier() {
		await axios.post(
			`https://chiringuito-api.herokuapp.com/api/suppliers/new`,
			newSupplier
		);
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
				<label htmlFor="supplierName" className="form-label">
					Proveedor
				</label>
				<input
					name="name"
					value={newSupplier.name}
					onChange={handleChange}
					type="text"
					className="form-control"
					id="supplierName"
					autoComplete="off"
				></input>
			</div>

			<div className="form_two_col">
				<div className="form-item form_half_row">
					<label htmlFor="CIF" className="form-label">
						CIF
					</label>
					<input
						name="cif"
						value={newSupplier.CIF}
						onChange={handleChange}
						type="text"
						className="form-control"
						id="CIF"
						autoComplete="off"
					></input>
				</div>

				<div className="form-item form_half_row">
					<label htmlFor="Contact" className="form-label">
						Contacto
					</label>
					<input
						name="phoneNumber"
						value={newSupplier.contact}
						onChange={handleChange}
						type="text"
						className="form-control"
						id="contact"
						autoComplete="off"
					></input>
				</div>
			</div>

			<div className="form-item">
				<label htmlFor="deliveries" className="form-label">
					Días y horarios de entrega
				</label>
				<input
					name="delivery"
					value={newSupplier.deliveries}
					onChange={handleChange}
					type="text"
					className="form-control"
					id="deliveries"
					placeholder="Lun-Jue 8:00-14:00"
				></input>
			</div>

			<div className="form_centered">
				<div className="form-check form-switch">
					<input
						name="delivers"
						className="form-check-input"
						type="checkbox"
						checked={newSupplier.delivers}
						onChange={handleChange}
					/>
					<label className="form-check-label" htmlFor="formSwitchCheckDefault">
						Hace repartos?
					</label>
				</div>

				<div className="form-check form-switch">
					<input
						name="admitsDebt"
						className="form-check-input"
						type="checkbox"
						checked={newSupplier.admitsDebt}
						onChange={handleChange}
					/>
					<label className="form-check-label" htmlFor="formSwitchCheckChecked">
						Admite deuda?
					</label>
				</div>
			</div>

			<div className="button_group">
				<button
					className="button_primary button_cancel"
					onClick={() => navigate('/opciones')}
				>
					Cancelar
				</button>
				<button className="button_primary button_accept" onClick={handleSubmit}>
					Añadir
				</button>
			</div>
		</div>
	);
}
