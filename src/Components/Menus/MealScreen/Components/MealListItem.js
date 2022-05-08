import { Typography, Grid, Paper, IconButton } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

export default function MealListItem(props) {
	const { name, pvp, margin, id } = props;

	return (
		<div onClick={() => window.location = `/carta/${id}`} >
		<Paper elevation="1">
			<Grid container sx={{ alignItems: 'center', mt:1, mb:1,  }}>
				<Grid item xs={6} sx={{pl:1}} >
					<Typography variant="body1">{`${name}`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<Typography variant="body1">{`${pvp.toFixed(2)}€`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<Typography variant="body1">{`${margin}%`}</Typography>
				</Grid>
				<Grid item xs={2} >
					<IconButton>
						<EditIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Paper>
		</div>
	);
}
