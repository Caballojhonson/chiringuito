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

	async function exportAsTxt(bin, filename) {

		const database = await data.getData(bin)
		const a = document.createElement("a");
		a.href = URL.createObjectURL(new Blob([JSON.stringify(database, null, 2)], {
		  type: "text/plain"
		}));
		a.setAttribute("download", `${filename}.txt`);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	  }

	return (
		<div className="app settings_main">

			{displayConfirmation && <ConfirmationModal bin={currentBin} closeModal={() => setDisplayConfirmation(false)} />} 
			
			<h1 className="screen_title">Opciones</h1>
			<h5 className="screen_title">Añadir cosas</h5>

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

			<h5 className="screen_title">Editar</h5>

			<button
				className="button_primary add_new"
				onClick={() => navigate('/editar-referencias')}
			>
				Editar referencias
			</button>

			<h5 className="screen_title">Sección NO TOCAR!</h5>

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
			<button
				className="btn btn-danger add_new btn-danger"
				onClick={() => handleResets(data.financeBinId)}
			>
				Resetear finanzas
			</button>

			<h5 className="screen_title">Bases de datos</h5>


			<div className='text_button_pair'>
				<h6 className='settings_subtitle'>Referencias</h6>
				<button
					className="button_primary add_new"
					onClick={() => exportAsTxt(data.stockBinId, 'stockItems')}
				>
					Descargar
				</button>
			</div>

			<div className='text_button_pair'>
				<h6 className='settings_subtitle'>Pedidos</h6>
				<button
					className="button_primary add_new"
					onClick={() => exportAsTxt(data.orderBinId, 'orders')}
				>
					Descargar
				</button>
			</div>
		
			<div className='text_button_pair'>
				<h6 className='settings_subtitle'>Proveedores</h6>
				<button
					className="button_primary add_new"
					onClick={() => exportAsTxt(data.supplierBinId, 'suppliers')}
				>
					Descargar
				</button>
			</div>

			<div className='text_button_pair'>
				<h6 className='settings_subtitle'>Finanzas</h6>
				<button
					className="button_primary add_new"
					onClick={() => exportAsTxt(data.financeBinId, 'finance')}
				>
					Descargar
				</button>
			</div>

			<div className='text_button_pair'>
				<h6 className='settings_subtitle'>Usuarios</h6>
				<button
					className="button_primary add_new"
					onClick={() => exportAsTxt(data.usersBinId, 'users')}
				>
					Descargar
				</button>
			</div>
		</div>
	);
}
