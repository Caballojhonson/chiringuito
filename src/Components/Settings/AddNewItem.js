import React, { useState } from 'react';

export default function AddNewItem(props) {
    const [newProduct, setNewProduct] = useState({
		id: props.newItemId,
        name: '',
        price: 0,
        format: '',
        provider: '',
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewProduct({...newProduct, [name]: value} )
    }

    const handleSubmit = () => {
        props.addNewItem(newProduct) 
        props.closeForm()
    }

	return (
		<div className="checklist_container">
			<button
				type="button"
				className="btn-close"
				aria-label="Close"
				onClick={props.closeForm}
			></button>
			<div className="form-item">
				<label htmlFor="productName" className="form-label">
					Nombre
				</label>
				<input
					name="name"
                    value={newProduct.name}
                    onChange={handleChange}
					type="text"
					className="form-control"
					id="productName"
					placeholder=""
				></input>
			</div>
            <div className="form_price_format"></div>
            <label htmlFor="price" className="form-label">
					Precio
				</label>
			<div className="form-item input-group">
				<input
					name="price"
                    value={newProduct.price}
                    onChange={handleChange}
					type="number"
					className="form-control"
					id="price"
					placeholder=""
				></input>
                <span className="input-group-text">€</span>
			</div>
			<div className="dropdown-contianer">
				<div className="form-item">
					<select
						name="format"
                        value={newProduct.format}
                        onChange={handleChange}
						className="form-select form-select-sm"
						aria-label="Small select"
					>
						<option defaultValue="">Formato</option>
						<option value="Kg">Kg</option>
						<option value="Unidad">Unidad</option>
						<option value="Caja">Caja</option>
						<option value="Barril">Barril</option>
						<option value="Pack">Pack</option>
						<option value="Otro">Otro</option>
					</select>
				</div>

				<div className="form-item">
					<select
						name="provider"
                        value={newProduct.provider}
                        onChange={handleChange}
						className="form-select form-select-sm"
						aria-label="Small select"
					>
						<option defaultValue="">Proveedor</option>
						{props.suppliers.map(item => {
							return(
							<option value={item.name}>{item.name}</option>
							)
						})}
					</select>
				</div>
			</div>
			<div className="button_group">
				<button
					className="button_primary button_cancel"
					onClick={props.closeForm}
				>
					Cancelar
				</button>
				<button className="button_primary button_accept" onClick={handleSubmit}>Añadir</button>
			</div>
		</div>
	);
}
