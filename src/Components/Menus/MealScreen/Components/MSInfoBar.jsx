import {
	Typography,
	ListItemIcon,
	ListItemText,
	List,
	ListSubheader,
	ListItem,
	Chip,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import StorageIcon from '@mui/icons-material/Storage';

export default function MSInfoBar(props) {
	const { meal } = props;

	const getTimeFormat = () => (meal.timeFormat === 'm' ? 'Minutos' : 'Horas');

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				m: 2,
				mt: 5,
				width: '60%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{meal.isIntermediate && (
				<div>
					<Chip label="Preelaboración" color="primary" variant="filled" />
				</div>
			)}

			<Typography variant='subtitle2'>{meal.category}</Typography>

			<Typography variant='subtitle2'>{`${meal.prepTime} ${getTimeFormat()}`}</Typography>
		</Box>
	);
}
