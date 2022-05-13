import { TextField, Button } from '@mui/material';
import React from 'react';

export default function MSRationInput(props) {
	const { rations, setRations, meal } = props;

	function handleChange(e) {
		setRations(e.target.value);
	}

	return (
		// <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
			<TextField
				sx={{
					textAlign: 'center',
					m: 2,
					mt: 5,
					input: { textAlign: 'center' },
				}}
				variant="outlined"
				value={rations}
				onChange={handleChange}
				size="small"
				label="Nº Raciones"
			/>
			{/* <Button
				variant="outlined"
				size="small"
				sx={{
					m: 2,
					mt: 5,
				}}
				onClick={() => setRations(meal.rationNumber)}
			>
				{meal.rationNumber} raciones
			</Button> */}
		</div>
	);
}
