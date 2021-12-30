import React, { useState } from 'react';
import { data } from '../../data';
import { useNavigate } from 'react-router-dom';

export default function AddNewItem() {
	let navigate = useNavigate();

	const [suppliers, setSuppliers] = useState(null);
	const [stockItems, setStockItems] = useState(null);

	!suppliers &&
		data.getData(data.supplierBinId).then((val) => setSuppliers(val));
	!stockItems &&
		data.getData(data.stockBinId).then((val) => setStockItems(val));

	const [newProduct, setNewProduct] = useState({
		id: data.getid(),
		name: '',
		price: 0,
		iva: 0,
		format: '',
		supplier: '',
		category: '',
	});

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const submitNewItem = () => {
		if (stockItems) {
			const updatedStock = stockItems.concat(newProduct);
			data
				.overwriteBin(data.stockBinId, updatedStock)
				.then(() => navigate('/checklist'));
		}
	};
	return (
		stockItems &&
		suppliers && (
			<div className="form_container">
				<button
					type="button"
					className="btn-close"
					aria-label="Close"
					onClick={() => navigate('/opciones')}
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
						autoComplete="off"
					></input>
				</div>
				<div className="form-item">
					<label htmlFor="price" className="form-label">
						Precio (IVA incluido)
					</label>
					<div className="input-group">
						<input
							name="price"
							value={newProduct.price}
							onChange={handleChange}
							type="number"
							className="form-control"
							id="price"
							autoComplete="off"
						></input>
						<span className="input-group-text">€</span>
					</div>
				</div>


				<div className="dropdown-contianer">
					<div className="form-item">
						<select
							name="iva"
							value={newProduct.iva}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">IVA</option>
							<option value="21">21%</option>
							<option value="10">10%</option>
							<option value="4">4%</option>
						</select>
					</div>

					<div className="form-item">
						<select
							name="category"
							value={newProduct.category}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">Categoría</option>
							<option value="comida">Comida</option>
							<option value="bebida">Bebida</option>
							<option value="menaje">Menaje</option>
							<option value="varios">Varios</option>
						</select>
					</div>
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
							name="supplier"
							value={newProduct.supplier}
							onChange={handleChange}
							className="form-select form-select-sm"
							aria-label="Small select"
						>
							<option defaultValue="">Proveedor</option>
							{suppliers &&
								suppliers.map((item) => {
									return <option value={item.name}>{item.name}</option>;
								})}
						</select>
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
						onClick={submitNewItem}
					>
						Añadir
					</button>
				</div>
			</div>
		)
	);
}
