import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function TotalItemsBoughtList(props) {
	const { items } = props;

	return (
		<div>
			
			<Typography variant="h5">Compras totales</Typography>
			<List dense>
				{items &&
					items.map((item) => {
						return (
							<ListItem disablePadding key={item.name}>
								<ListItemButton>
									<ListItemText primary={item.name} />
									<ListItemText primary={item.quantity} />
								</ListItemButton>
							</ListItem>
						);
					})}
			</List>
		</div>
	);
}
