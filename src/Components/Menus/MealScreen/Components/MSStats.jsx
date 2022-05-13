import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BalanceIcon from '@mui/icons-material/Balance';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PercentIcon from '@mui/icons-material/Percent';
import ScaleIcon from '@mui/icons-material/Scale';

import CostItem from '../../Components/CostItem';
import React, { useState } from 'react';
import { Box, Chip } from '@mui/material';

export default function MSStats(props) {
	const { meal, rations } = props;

	const [rationSelect, setrationSelect] = useState(1);

	function timesRations(num) {
		return (num * rationSelect).toFixed(2);
	}

	function getTotalWeight() {
		if (meal.isIntermediate) {
			return (meal.finalWeight / meal.rationNumber) * rations;
		}
	}

	const rationBtns = (
		<div style={{ display: 'flex' }}>
			<Chip
				sx={{ ml: 1, mr: 1 }}
				label="Por ración"
				size="small"
				color={rationSelect === 1 ? 'success' : "default"}
				onClick={() => setrationSelect(1)}
			/>
			<Chip
				sx={{ ml: 1, mr: 1 }}
				label="Cantidad manual"
				size="small"
				color={rationSelect === 1 ? 'default' : "success"}
				onClick={() => setrationSelect(rations)}
			/>
		</div>
	);

	return (
		<div>
			{rationBtns}
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

			{meal.isIntermediate && (
				<Box sx={{ display: 'flex' }}>
					<CostItem
						primary="€ / Kg"
						secondary={`${meal.costPerKilo}€`}
						icon={<BalanceIcon />}
					/>
					<CostItem
						primary="Kg"
						secondary={`${getTotalWeight()}`}
						icon={<ScaleIcon />}
					/>
				</Box>
			)}
		</div>
	);
}
