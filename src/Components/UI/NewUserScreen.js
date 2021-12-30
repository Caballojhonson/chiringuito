import React, { useState } from 'react';
import { data } from '../../data';

export default function NewUserScreen() {
    const [user, setUser] = useState({
        name: '',
        password: ''
    })
	const [pageNum, setPageNum] = useState(1);

	const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async () => {
		localStorage.setItem('name', user.name);
        setPageNum(prev => prev + 1)
        if(pageNum === 3) {
			localStorage.setItem('authorized', true);
			const userDatabase = await data.getData(data.usersBinId)
			const newUserInfo = {
				name: user.name,
				signedUp: new Date(),
				isAuthed: data.isAuthorized,
			}
			userDatabase.push(newUserInfo)
			await data.overwriteBin(data.usersBinId, userDatabase)
			window.location.href = '/';
		} 
	};

	const pageOne = (
		<div className="new_user_container">
			<h1 className="whoareyou_title">
				Pareces nuevo, <br /> ¿Cómo te llamas?
			</h1>
			<div className="form-item">
				<input
					name="name"
					value={user.name}
					onChange={handleChange}
					type="text"
					className="form-control new_username_input"
					id="supplierName"
					placeholder=""
                    autoComplete="off"
				></input>
			</div>
			<button onClick={user.name && handleSubmit} className="login_button button_primary btn-primary">
				Identifico-me
			</button>
		</div>
	);

    const pageTwo = (
		<div className="new_user_container">
			<h1 className="whoareyou_title">
				Vale {localStorage.getItem('name')}, <br/> ¿Qué quieres?
			</h1>
			<div className="form-item">
				<input
					name="password"
					value={user.password}
					onChange={handleChange}
					type="text"
					className="form-control new_username_input"
					id="supplierName"
					placeholder=""
                    autoComplete="off"
				></input>
			</div>
			<button onClick={user.password === 'una vida digna' && handleSubmit} className="login_button button_primary btn-primary">
				Cumplir deseo
			</button>
		</div>
	);

    const pageThree = (
		<div className="new_user_container">
			<h1 className="whoareyou_title">
				Bienvenido... <br/> El trabajo te hará libre
			</h1>
			
			<button onClick={handleSubmit} className="login_button button_primary btn-primary">
				Déjame en paz...
			</button>
		</div>
	);


	return (
		<div >
			{pageNum === 1 && pageOne}
            {pageNum === 2 && pageTwo}
            {pageNum === 3 && pageThree}
			<div className="software_version_container">
				<p className="software_version">El Chiringuito v1.0.2</p>
				<p className="copyright">©2021 - Caballojhonson</p>
			</div>
		</div>
	);
}
