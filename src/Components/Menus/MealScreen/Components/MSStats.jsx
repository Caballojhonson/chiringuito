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
	const { meal, rations } = props;

	function timesRations(num) {
		return (num * rations).toFixed(2);
	}

	function getTotalWeight() {
		if(meal.isIntermediate) {
			return (meal.finalWeight / meal.rationNumber) * rations
		}
	}

	return (
		<div>
			<Box sx={{ display: 'flex' }}>
				<CostItem
					primary="PVP"
					secondary={`${timesRations(meal.pvp)}€`}
					icon={<PointOfSaleIcon />}
				/>
				<CostItem
					primary="margen"
					secondary={`${meal.margin}%`}
					icon={<PercentIcon />}
				/>
			</Box>

			<Box sx={{ display: 'flex' }}>
				<CostItem
					primary="COSTE"
					secondary={`${timesRations(meal.costPerRation)}€`}
					icon={<RestaurantIcon />}
				/>
				<CostItem
					primary="beneficio"
					secondary={`${timesRations(meal.profitPerRation)}€`}
					icon={<MonetizationOnIcon />}
				/>
			</Box>

			{meal.isIntermediate && 
			<Box sx={{ display: 'flex' }}>
				<CostItem primary="€ / Kg" secondary={`${meal.costPerKilo}€`} icon={<BalanceIcon />} />
				<CostItem primary="Kg" secondary={`${getTotalWeight()}`} icon={<ScaleIcon />} />
			</Box>
			}
		</div>
	);
}
