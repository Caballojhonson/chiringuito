import React, { useState } from 'react';

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

	const handleSubmit = () => {
		localStorage.setItem('name', user.name);
        setPageNum(prev => prev + 1)
        if(pageNum === 3) {
			localStorage.setItem('authorized', true);
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
			<button onClick={user.name && handleSubmit} className="button_primary btn-primary">
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
			<button onClick={user.password === 'una vida digna' && handleSubmit} className="button_primary btn-primary">
				Cumplir deseo
			</button>
		</div>
	);

    const pageThree = (
		<div className="new_user_container">
			<h1 className="whoareyou_title">
				Bienvenido... <br/> El trabajo te hará libre
			</h1>
			
			<button onClick={handleSubmit} className="button_primary btn-primary">
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
				<p className="software_version">El Chiringuito v1.0.1</p>
				<p className="copyright">©2021 - Caballojhonson</p>
			</div>
		</div>
	);
}
