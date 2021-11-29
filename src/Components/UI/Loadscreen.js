import React from 'react';
import { data } from '../../data';
import refranero from '../../refranero';

export default function Loadscreen() {
	return (
		<div className="app loadscreen_container">
			<h1 className="text-center welcome_text">¡Hola {data.username}!</h1>
			<div className="refran_container">
				<h3 className="text-center welcome_text">Recuerda,</h3>
				<h5 className="text-center welcome_text">
					"{refranero[Math.floor(Math.random() * refranero.length)]}"
				</h5>
			</div>
			<button onClick={() => window.location.href='/'} className="button_primary welcome_button">Vale gracias</button>
		</div>
	);
}
