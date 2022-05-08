import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MSIngredient from './MSIngredient';

export default function MSIngredientSupplierContainer(props) {
	const { ingredients, supplier } = props;
	return (
		<Box sx={{mb:3}}>
			<Divider textAlign="left">
				<Box
					sx={{
						border: '1px solid lightgrey',
						borderRadius: '0.2rem',
						pl: '0.2rem',
						pr: '0.2rem',
					}}
				>
					{supplier} 
				</Box>
			</Divider>
			{ingredients.map((item) => (
				<MSIngredient ingredient={item.ingredient} quantity={item.quantity} />
			))}
		</Box>
	);
}
