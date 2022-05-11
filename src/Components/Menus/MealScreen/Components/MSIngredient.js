import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

export default function MSIngredient(props) {
	const { ingredient, quantity, rations, meal } = props;

	const containerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0.5rem 1rem 0.5rem 1rem',
	};

	function divideByRations(num) {
		console.log(rations)
		return ((num / meal.rationNumber) * rations).toFixed(2)
	}

	const calcPrice = () => {
		if (ingredient.packQuantity) {
			return (ingredient.price / ingredient.packQuantity) * quantity;
		} else return ingredient.price * quantity;
	};

	const formatUnits = (format) => {
		if (format === 'Unidad' || format === 'Pack' || format === 'Caja') {
			return 'Uni';
		} else return format;
	};

	return (
		<div style={containerStyle}>
			<Grid container>
				<Grid item xs={3}>
					<Box>
						<Typography variant="subtitle2">{`${divideByRations(quantity)} ${formatUnits(
							ingredient.format
						)}`}</Typography>
					</Box>
				</Grid>
				<Grid item xs={7}>
					<Typography variant="body2">{ingredient.name}</Typography>
				</Grid>

				<Grid item xs={2}>
					<Box>
						<Typography variant="subtitle2">{`${divideByRations(calcPrice())}€`}</Typography>
					</Box>
				</Grid>
			</Grid>
		</div>
	);
}
