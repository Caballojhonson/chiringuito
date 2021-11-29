import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';

export default function AddNewSupplier() {
	let navigate = useNavigate();

	const [newSupplier, setNewSupplier] = useState({
		id: data.getid(),
		name: '',
		CIF: '',
		contact: '+34 ',
		delivers: false,
		admitsDebt: false,
		deliveries: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		let value = e.target.value;
        if(name === 'delivers') {
            value = !newSupplier.delivers
        }
        if(name === 'admitsDebt') {
            value = !newSupplier.admitsDebt
        }
		setNewSupplier({ ...newSupplier, [name]: value });
	};

    const handleSubmit = async () => {
        let supplierList = await data.getData(data.supplierBinId)
        const updatedList = supplierList.concat(newSupplier)
        data.overwriteBin(data.supplierBinId, updatedList)
        .then(navigate('/opciones'))
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
					placeholder=""
				></input>
			</div>

			<div className="form_two_col">
				<div className="form-item form_half_row">
					<label htmlFor="CIF" className="form-label">
						CIF
					</label>
					<input
						name="CIF"
						value={newSupplier.CIF}
						onChange={handleChange}
						type="text"
						className="form-control"
						id="CIF"
						placeholder=""
					></input>
				</div>

				<div className="form-item form_half_row">
					<label htmlFor="Contact" className="form-label">
						Contacto
					</label>
					<input
						name="contact"
						value={newSupplier.contact}
						onChange={handleChange}
						type="text"
						className="form-control"
						id="contact"
						placeholder=""
					></input>
				</div>
			</div>

			<div className="form-item">
				<label htmlFor="deliveries" className="form-label">
					Días y horarios de entrega
				</label>
				<input
					name="deliveries"
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
