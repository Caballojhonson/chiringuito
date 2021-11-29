import React from 'react'
import georgieDann from '../../images/58198803.jpg'
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';


export default function HomeScreen() {
    const navigate = useNavigate()
    	
   // !data.username && navigate('/nuevo-usuario')

    return (
        <div className="app">
            {!data.username && navigate('/nuevo-usuario')}
            <img className="home_img" src={georgieDann} alt='georgieDann'></img>
        </div>
    )
}
