import React from 'react'
import georgieDann from '../../images/58198803.jpg'
import { useNavigate } from 'react-router-dom';
import { data } from '../../data';


export default function HomeScreen() {
    const navigate = useNavigate()

    return (
        <div className="app">
            {!data.username && navigate('/nuevo-usuario')}
            <img className="georgie" src={georgieDann} alt='georgieDann'></img>
        </div>
    )
}
