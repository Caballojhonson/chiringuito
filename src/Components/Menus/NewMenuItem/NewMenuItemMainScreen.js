import React, { useState } from 'react';
import TopNavbar from './Components/NewMenuItemNavbar';
import NewItemForm from './Components/NewItemForm';
import ItemListForm from './Components/ItemListForm';
import NewProductHeader from './Components/NewProductHeader';
import QuantityForm from './Components/QuantityForm';
import { ReactCalculator } from 'simple-react-calculator';
import { IconButton, Modal, Box } from '@mui/material';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';

export default function NewMenuItemMainScreen() {
	const [newMenuItem, setNewMenuItem] = useState({});
	const [screen, setScreen] = useState(1);
	const [validate, setValidate] = useState(false);
	const [showCalculator, setShowCalculator] = useState(false);

	function handleState(obj) {
		setNewMenuItem({ ...newMenuItem, ...obj });
	}

	function removeItem(id) {
		const newItemsArray = newMenuItem.items.filter((item) => item._id !== id);
		const oldMenuItem = newMenuItem;
		oldMenuItem.items = newItemsArray;
		setNewMenuItem(oldMenuItem);
	}

	function removeSupplement(id) {
		const newSupplementArray = newMenuItem.supplements.filter(
			(item) => item.id !== id
		);
		const oldMenuItem = newMenuItem;
		oldMenuItem.supplements = newSupplementArray;
		setNewMenuItem(oldMenuItem);
	}

	function removeFinalWeight() {
		delete newMenuItem.finalWeight;
	}

	function addQuantity(quantity, id) {
		const matchingItemIndex = newMenuItem.items.findIndex(
			(item) => item._id === id
		);
		const oldState = newMenuItem;
		const item = oldState.items[matchingItemIndex];
		item.quantity = quantity;
		newMenuItem.items[matchingItemIndex] = item;
		setNewMenuItem(oldState);
	}

	function nextScreen() {
		if (
			(newMenuItem.name &&
				newMenuItem.rationNumber &&
				newMenuItem.category &&
				newMenuItem.items &&
				newMenuItem.prepTime &&
				!newMenuItem.isIntermediate) ||
			(newMenuItem.name &&
				newMenuItem.rationNumber &&
				newMenuItem.category &&
				newMenuItem.items &&
				newMenuItem.prepTime &&
				newMenuItem.isIntermediate &&
				newMenuItem.finalWeight)
		) {
			setScreen(2);
			!newMenuItem.isIntermediate && removeFinalWeight();
			window.scrollTo(0, 0)
		} else setValidate(true);
	}

	function prevScreen() {
		screen > 1 && setScreen(1);
		screen === 1 &&  window.history.back()
	}

	function CalculatorModal() {
		return (
			<Box>
				<Modal open={showCalculator} onClose={() => setShowCalculator(false)}>
					<Box sx={{ backgroundColor: 'black' }}>
						<IconButton
							sx={{ position: 'fixed', left: '1rem', color: '#ffffff' }}
							onClick={() => setShowCalculator(false)}
							size="large"
							edge="start"
							color="inherit"
							aria-label="back"
						>
							<KeyboardBackspaceSharpIcon sx={{ fontSize: '2.7rem' }} />
						</IconButton>
						<ReactCalculator style={{ margin: '10rem' }} />
					</Box>
				</Modal>
			</Box>
		);
	}

	return (
		<Box>
			<TopNavbar
				prev={prevScreen}
				showCalculator={() => setShowCalculator(true)}
			/>

			<CalculatorModal />

			{screen === 1 && (
				<Box>
					<NewItemForm
						stateShare={handleState}
						validate={validate}
						newMenuItem={newMenuItem}
						removeFinalWeight={removeFinalWeight}
					/>
					<ItemListForm
						newMenuItem={newMenuItem}
						stateShare={handleState}
						removeItem={removeItem}
						next={nextScreen}
						validate={validate}
					/>
				</Box>
			)}

			{screen === 2 && (
				<Box>
					<NewProductHeader newMenuItem={newMenuItem} prev={prevScreen} />
					<QuantityForm
						newMenuItem={newMenuItem}
						addQuantity={addQuantity}
						shareState={handleState}
						removeSupplement={removeSupplement}
					/>
				</Box>
			)}
		</Box>
	);
}
