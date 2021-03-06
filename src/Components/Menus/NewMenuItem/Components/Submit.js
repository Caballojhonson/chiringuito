import React, { useState } from 'react';
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { Box } from '@mui/material';

export default function Submit(props) {
	const { newMenuItem, stats } = props;

	const [sending, setSending] = useState(false);

	function sanitizeData() {
		const rawData = { ...newMenuItem, ...stats() };

		const ceil2Int = (num) => Math.ceil(num * 100) / 100;

		rawData.finalWeight = Number(rawData.finalWeight);
		rawData.prepTime = Number(rawData.prepTime);
		rawData.rationNumber = Number(rawData.rationNumber);

		if (!rawData.timeFormat) rawData.timeFormat = 'm';

		rawData.profitPerRation = ceil2Int(rawData.profitPerRation);

		rawData.pvp = ceil2Int(rawData.pvp);
		rawData.timestamp = new Date();
		rawData.ingredients = rawData.items.map((item) => item._id);
		rawData.quantities = rawData.items.map((item) => {
			return {
				ingredient: item._id,
				quantity: Number(item.quantity),
			};
		});

		if (rawData.supplements) {
			rawData.supplements = rawData.supplements.map((item) => {
				delete item.id;

				return {
					concept: item.concept,
					percentage: Number(item.percentage),
					quantity: Number(item.quantity),
				};
			});
		}

		delete rawData.items;

		return rawData;
	}

	async function submit() {
		setSending(true)
		await axios
			.post(
			`https://chiringuito-api.herokuapp.com/api/meals/new`
			, sanitizeData())
		setSending(false)
		setTimeout(() => window.location.href = '/carta', 1000)
	}

	return (
		<div>
			<Box sx={{ display: 'flex', justifyContent: 'center', mb: 7 }}>
				<LoadingButton
					loading={sending}
					loadingPosition="start"
					startIcon={<SaveIcon />}
					variant="outlined"
					onClick={submit}
				>
					Guardar
				</LoadingButton>
			</Box>
		</div>
	);
}
