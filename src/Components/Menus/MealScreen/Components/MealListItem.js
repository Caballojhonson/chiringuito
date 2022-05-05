import { Typography, Grid, Paper, IconButton } from '@mui/material';
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MealListItem(props) {
	const { name, pvp, margin } = props;

	return (
		<Paper elevation="1">
			<Grid container spacing={0} sx={{ alignItems: 'center' }}>
				<Grid item xs={6} >
					<Typography variant="body1">{`${name}`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<Typography variant="body1">{`${pvp}€`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<Typography variant="body1">{`${margin}%`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<IconButton>
						<VisibilityIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
	);
}
