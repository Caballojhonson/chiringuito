import { Typography, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function MSRationInput(props) {
	const { rations, setRations, meal } = props;

	function handleChange(e) {
		setRations(e.target.value);
	}

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<TextField
				sx={{
					maxWidth: '30%',
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
			<Button
				variant="contained"
				size="small"
				sx={{
					m: 2,
					mt: 5,
				}}
				onClick={() => setRations(meal.rationNumber)}
			>
				{meal.rationNumber} raciones
			</Button>
		</div>
	);
}
