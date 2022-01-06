import React, { useState } from 'react';
import { data } from '../../data';
import { useNavigate } from 'react-router-dom';

export default function AddNewItem(props) {
	const {stockItem, closeFn} = props
	let navigate = useNavigate();

	const [suppliers, setSuppliers] = useState(null);
	const [stockItems, setStockItems] = useState(null);

	!suppliers &&
		data.getData(data.supplierBinId).then((val) => setSuppliers(val));
	!stockItems &&
		data.getData(data.stockBinId).then((val) => setStockItems(val));

	const [newProduct, setNewProduct] = useState(
		stockItem ? 
		{...stockItem, price: stockItem.price / stockItem.iva} :
			{
			id: data.getid(),
			name: '',
			price: 0,
			iva: 0,
			format: '',
			supplier: '',
			category: '',
			packQuantity: 0,
			} 
	);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewProduct({ ...newProduct, [name]: value });
	};

	const submitNewItem = () => {
		if (stockItems) {
			const priceWithIVA = () => (newProduct.price * newProduct.iva).toFixed(2)
			const finalProduct = ({ ...newProduct, price: priceWithIVA() })
			const updatedStock = stockItems.concat(finalProduct);
			const sortedStock = updatedStock.sort((a, b) => {
				if(a.name < b.name) { return -1; }
				if(a.name > b.name) { return 1; }
				return 0;
			})
			data.overwriteBin(data.stockBinId, sortedStock)
				.then(() => navigate('/checklist'));
		}
	};

	const updateEditedItem = async () => {
		const priceWithIVA = () => (newProduct.price * newProduct.iva).toFixed(2)
		const finalProduct = ({ ...newProduct, price: priceWithIVA() })
		const filteredStock = stockItems.filter(item => item.id !== finalProduct.id)
		const updatedStock = filteredStock.concat(finalProduct)
		await data.overwriteBin(data.stockBinId, updatedStock)
		closeFn()
	}

	return (
		stockItems &&
		suppliers && (
			<div className="form_container">
				<button
					type="button"
					className="btn-close"
					aria-label="Close"
					onClick={stockItems ? closeFn : () => navigate('/opciones')}
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
						Precio (Sin IVA)
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
							<option value="1.21">21%</option>
							<option value="1.10">10%</option>
							<option value="1.04">4%</option>
							<option value="1">Sin IVA</option>
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
							<option value="Comida">Comida</option>
							<option value="Bebida">Bebida</option>
							<option value="Menaje">Menaje</option>
							<option value="Limpieza">Limpieza</option>
							<option value="Varios">Varios</option>
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

				{(newProduct.format === 'Pack' || newProduct.format === 'Caja') ? 

					<div className="form-item">
					<label htmlFor="packQuantity" className="form-label">
						Unidades por pack
					</label>
					<div className="input-group">
						<input
							name="packQuantity"
							value={newProduct.packQuantity}
							onChange={handleChange}
							type="number"
							className="form-control"
							id="packQuantity"
							autoComplete="off"
						></input>
					</div>
				</div>
				: null
				}

				<div className="button_group">
					<button
						className="button_primary button_cancel"
						onClick={stockItem ? closeFn : () => navigate('/opciones')}
					>
						Cancelar
					</button>
					<button
						className="button_primary button_accept"
						onClick={stockItem ? updateEditedItem : submitNewItem}
					>
						Añadir
					</button>
				</div>
			</div>
		)
	);
}
