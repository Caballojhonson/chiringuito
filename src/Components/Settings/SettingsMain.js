import React, { useState } from 'react';
import '../../Styles/Settings.css';
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';
import ConfirmationModal from './ConfirmationModal';

export default function SettingsMain() {
	let navigate = useNavigate();
	const [displayConfirmation, setDisplayConfirmation] = useState(false)
	const [currentBin, setCurrentBin] = useState('')

	const handleResets = (bin) => {
		setDisplayConfirmation(true)
		setCurrentBin(bin)
	}

	return (
		<div className="app settings_main">

			{displayConfirmation && <ConfirmationModal bin={currentBin} closeModal={() => setDisplayConfirmation(false)} />} 
			
			<h1 className="settings_title">Opciones</h1>
			<h5 className="settings_title">Añadir cosas</h5>

			<button
				className="button_primary add_new"
				onClick={() => navigate('/nueva-referencia')}
			>
				Nueva referencia
			</button>

			<button
				className="button_primary add_new"
				onClick={() => navigate('/nuevo-proveedor')}
			>
				Añadir proveedor
			</button>

			<h5 className="settings_title">Sección NO TOCAR!</h5>

			<button
				className="btn btn-danger add_new btn-danger"
				onClick={() => handleResets(data.stockBinId)}
			>
				Resetear referencias
			</button>
			<button
				className="btn btn-danger add_new btn-danger"
				onClick={() => handleResets(data.supplierBinId)}
			>
				Resetear proveedores
			</button>
			<button
				className="btn btn-danger add_new btn-danger"
				onClick={() => handleResets(data.orderBinId)}
			>
				Resetear pedidos
			</button>
		</div>
	);
}
