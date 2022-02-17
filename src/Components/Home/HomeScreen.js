import React from 'react'
import coke from '../../images/signal-2022-02-17-203041.jpeg'
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';import axios from 'axios';



export default function HomeScreen() {
    const navigate = useNavigate()

    return (
        <div className="app" style={{backgroundColor: 'pink'}}>
            <img style={{width: '100%', position: 'absolute', opacity: '30%'}} src={coke}  />
            {!data.username && navigate('/nuevo-usuario')}
            <h5 className="screen_title">Change Log</h5>
            <br/>
            <h6 className='text-center'>General</h6>
            <p className='chlogp'>- Nuevo sistema de gastos programables</p>
            <p className='chlogp'>- Añadidos 3 tipos nuevos de movimientos:</p>
            <p className='chlogp'>-     Pistas Escuela (60/40)</p>
            <p className='chlogp'>-     Pistas Nuestras (100%)</p>
            <p className='chlogp'>-     Pistas Anuales (Alquileres anuales al 100%)</p>
            <p className='chlogp'>-Nueva sección de alquiler de pistas en contabilidad</p>
            <p className='chlogp'>-Alisson queda nominada a empleada del mes por minoría absoluta por lo de la cocacola</p>



            <div className="software_version_container">
				<p className="software_version">El Chiringuito BETA v1.0.11</p>
				<p className="copyright">©2022 - Caballojhonson</p>
			</div>

            {/* <img className="georgie" src={georgieDann} alt='georgieDann'></img> */}
        </div>
    )
}
