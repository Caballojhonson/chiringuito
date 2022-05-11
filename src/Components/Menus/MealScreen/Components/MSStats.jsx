import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BalanceIcon from '@mui/icons-material/Balance';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PercentIcon from '@mui/icons-material/Percent';
import ScaleIcon from '@mui/icons-material/Scale';

import CostItem from '../../Components/CostItem';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { Paper, Box } from '@mui/material';

export default function MSStats(props) {
	const { margin, rationCost, kiloCost, profit } = props.stats;

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CostItem primary="PVP" secondary="1.67€" icon={<PointOfSaleIcon />} />

				<CostItem primary="margen" secondary="432%" icon={<PercentIcon />} />
			</Box>

			<Box sx={{ display: 'flex' }}>
				<CostItem primary="COSTE" secondary="1.67€" icon={<RestaurantIcon />} />

				<CostItem
					primary="beneficio"
					secondary="1.67€"
					icon={<MonetizationOnIcon />}
				/>
			</Box>
			<Box sx={{ display: 'flex' }}>
				<CostItem
					primary="€ / Kg"
					secondary="1.67€"
					icon={<BalanceIcon />}
				/>
				<CostItem primary="Kg" secondary="3.2Kg" icon={<ScaleIcon />} />
			</Box>
		</div>
	);
}
