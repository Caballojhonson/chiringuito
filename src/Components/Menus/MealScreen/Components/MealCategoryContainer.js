import { Typography } from '@mui/material';
import React from 'react';
import MealListItem from './MealListItem';

export default function MealCategoryContainer(props) {
	const { categoryItems, title } = props;

	return (
		<div>
			<Typography variant="h5" sx={{mb:1, mt:2}}>{title}</Typography>
			{console.log(categoryItems)}
			{categoryItems().map((item) => (
				<MealListItem name={item.name} pvp={item.pvp} margin={item.margin} />
			))}
		</div>
	);
}
