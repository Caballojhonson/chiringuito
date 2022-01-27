import React from 'react'
import georgieDann from '../../images/58198803.jpg'
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';import axios from 'axios';



export default function HomeScreen() {
    const navigate = useNavigate()

    return (
        <div className="app" style={{backgroundColor: 'pink'}}>
            {!data.username && navigate('/nuevo-usuario')}
            <h5 className="screen_title">Change Log</h5>
            <br/>
            <h6 className='text-center'>Pedidos</h6>
            <p className='chlogp'>-Georgie Dann ha pasado a mejor vida</p>
            <p className='chlogp'>-Mudanza de pedidos a Frankfurt</p>
            <p className='chlogp'>-Los pedidos pasan a ser individuales por proveedor</p>
            <p className='chlogp'>-Cada pedido vuelve a ser editable (Cantidades)</p>
            <p className='chlogp'>-Las referencias individuales se borran editando el producto con cantidad 0</p>
            <p className='chlogp'>-Pedidos archivados automáticamente al marcar pagado y recibido</p>
            <p className='chlogp'>-Nueva sección de pedidos vigentes y archivados</p>
            <p className='chlogp'>-Los pedidos vigentes del mismo proveedor, de la misma semana,
                NO pedidos y NO pagados se fusionan automáticamente.
            </p>
            <p className='chlogp'>-Toni pasa a ser el primer empleado del mes de la app 
            por recoger una croqueta del suelo y devolverla a su bandeja</p>

            <h6 className='text-center'>Gastos</h6>
            <p className='chlogp'>-Creada base de datos de gastos, modelo y router</p>
            <p className='chlogp'>-Añadida tipología de gasto recurrente</p>
            <p className='chlogp'>-Gastos antiguos volcados a la base de datos</p>
            <p className='chlogp'>-Interpretación y saneado de gastos antiguos</p>
            <p className='chlogp'>-Nuevas estadísticas</p>


            <div className="software_version_container">
				<p className="software_version">El Chiringuito BETA v1.0.9</p>
				<p className="copyright">©2022 - Caballojhonson</p>
			</div>

            {/* <img className="georgie" src={georgieDann} alt='georgieDann'></img> */}
        </div>
    )
}
