import React from 'react'
import georgieDann from '../../images/58198803.jpg'
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';


export default function HomeScreen() {
    const navigate = useNavigate()

    return (
        <div className="app" style={{backgroundColor: 'pink'}}>
            {!data.username && navigate('/nuevo-usuario')}
            <h5 className="screen_title">Change Log</h5>
            <br/><br/>
            <p className='chlogp'>-Mudanza de pedidos a Frankfurt</p>
            <p className='chlogp'>-Los pedidos pasan a ser individuales por proveedor</p>
            <p className='chlogp'>-Cada pedido vuelve a ser editable (Cantidades)</p>
            <p className='chlogp'>-Las referencias individuales se borran editando el producto con cantidad 0</p>
            <p className='chlogp'>-Los pedidos son archivables. Sólo archivado manual</p>
            <p className='chlogp'>-Nueva sección de pedidos vigentes y archivados</p>
            <p className='chlogp'>-Los pedidos vigentes del mismo proveedor, de la misma semana,
                NO pedidos y NO pagados se fusionan automáticamente.
            </p>
            <p className='chlogp'>-Toni pasa a ser el primer empleado del mes de la app 
            por recoger una croqueta del suelo y devolverla a su bandeja</p>


            <div className="software_version_container">
				<p className="software_version">El Chiringuito BETA v1.0.8</p>
				<p className="copyright">©2022 - Caballojhonson</p>
			</div>

            {/* <img className="georgie" src={georgieDann} alt='georgieDann'></img> */}
        </div>
    )
}
