import { Backdrop, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TopNavbar from '../../UI/TopNavbar';
import MealCategoryContainer from './Components/MealCategoryContainer'; 
import BallotIcon from '@mui/icons-material/Ballot';

export default function MealListMainScreen() {
	const [meals, setMeals] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getMeals();
	}, []);

	async function getMeals() {
		setLoading(true);

		const response = await axios.get(
			'https://chiringuito-api.herokuapp.com/api/meals'
		);

		setMeals(response.data.data);
		setLoading(false);
	}

	const categories = () => [...new Set(meals.map((item) => item.category))];

	const itemsInCategory = (category) =>
		meals.filter((item) => item.category === category);

  const loadBackdrop = (
    <Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
  )
    // Please reconsider stupid backgroundColor 
	return (
		<div>
			<TopNavbar title='Carta' icon={<BallotIcon fontSize='large' />} iconText='Escandallar' onClick={() => window.location.href = '/escandallar'} />
		<Box sx={{p: 2, minHeight: '93vh', backgroundColor: '#ffe1f0'}}>  
			{loadBackdrop}
			{meals &&
				categories().map((cat) => (
					<MealCategoryContainer
						categoryItems={() => itemsInCategory(cat)}
						title={`${cat}s`}
					/>
				))}
		</Box>
		</div>
	);
}
