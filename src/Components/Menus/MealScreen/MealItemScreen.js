import { Backdrop, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopNavbar from '../../UI/TopNavbar';
import MSIngredientSupplierContainer from './Components/MSIngredientSupplierContainer';
import EditIcon from '@mui/icons-material/Edit';
import MSAccordion from './Components/MSAccordion';
import MSSupplement from './Components/MSSupplement';
import MSStats from './Components/MSStats';
import MSRationInput from './Components/MSRationInput';

export default function MealItemScreen() {
	const { id } = useParams();
	const [meal, setMeal] = useState('');
	const [loading, setLoading] = useState(true);
	const [supplierSet, setSupplierSet] = useState('');
	const [rations, setRations] = useState(1)

	useEffect(() => {
		getMeal();
	}, []);

	const getMeal = async () => {
		const response = await axios.get(
			`https://chiringuito-api.herokuapp.com/api/meals/${id}`
		);

		setMeal(response.data.data[0]);
		setSupplierSet([
			...new Set(
				response.data.data[0].ingredients.map((item) => item.supplier)
			),
		]);
		setLoading(false);
		console.log(supplierSet);
	};

	const backdrop = (
		<Backdrop
			sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={loading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);

	const supplierContainers =
		!loading &&
		supplierSet.map((supplier) => (
			<MSIngredientSupplierContainer
				ingredients={meal.quantities.filter(
					(ingredient) => ingredient.ingredient.supplier === supplier
				)}
				supplier={supplier}
				rations={rations}
				meal={meal}
			/>
		));

	const supplements =
		!loading &&
		meal.supplements.map((supplement) => (
			<MSSupplement
				concept={supplement.concept}
				percentage={supplement.percentage}
				quantity={supplement.quantity}
			/>
		));

	return (

		<div>
			{loading && backdrop}
			<TopNavbar title={meal.name} icon={<EditIcon />} />
			<MSRationInput rations={rations} setRations={setRations} meal={meal} />
			<MSAccordion
				title="Estadísticas"
				content={<MSStats meal={meal} rations={rations} />}
			/>
				

			<MSAccordion
				title="Ingredientes"
				content={!loading && supplierContainers}
			/>
			{supplements.length > 0 && (
				<MSAccordion title="Suplementos" content={!loading && supplements} />
			)}
		</div>

	);
}
