import React from 'react';
import '../../Styles/Settings.css';
import { useNavigate } from 'react-router-dom';

export default function SettingsMain() {
	let navigate = useNavigate();

	return (
		<div className="app settings_main">
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
		</div>
	);
}
