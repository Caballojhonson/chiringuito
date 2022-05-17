import { getMonth } from 'date-fns';
import React, { useEffect } from 'react';

export default function OrderStatsCalculations(props) {
	const { setState, stats, db } = props;

	useEffect(() => {
		db && setState({ ...stats, itemTotalsSorted: orderedItemsSum(db.orders) });
	}, [db]);

	function flatten(arr) {
		return arr.reduce(function (flat, toFlatten) {
			return flat.concat(
				Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
			);
		}, []);
	}

	function getItemNameFromId(id) {
		const item = db.items.find((item) => item._id === id);
		return item.name;
	}

	// Sum all items ordered in order sample, returns groups as
	// {_id, name, packQuantity, quantity} array

	function orderedItemsSum(sample) {
		const allOrders = sample.map((order) => {
			return order.items.map((item) => {
				return {
					name: item.item.name,
					pack: item.item.packQuantity || 1,
					quantity: item.quantity,
					_id: item.item._id,
				};
			});
		});

		const flatOrders = flatten(allOrders);
		const itemIDSet = [...new Set(flatOrders.map((item) => item._id))];

		const groupedItems = itemIDSet.map((id) => {
			return flatOrders.filter((order) => order._id === id);
		});

		const summed = groupedItems.map((group) => {
			const sum = group.reduce((acc, curr) => {
				return acc + curr.quantity;
			}, 0);
			return {
				_id: group[0]._id,
				name: group[0].name,
				quantity: sum * group[0].pack,
			};
		});

		const sorted = summed.sort((a, b) => b.quantity - a.quantity);

		return sorted;
	}

	function getAllOrdersForItemsWithId(id) {
		return (
			db &&
			db.orders.filter((order) =>
				order.items.some((item) => item.item._id === id)
			)
		);
	}

	console.log(db && getAllOrdersForItemsWithId('61e98f976466e642ebc49af1'));
	console.log(db && getTotalMonthlyOrdersForId('61e98f976466e642ebc49af1'));
	

	function getTotalMonthlyOrdersForId(id) {
		const allOrders = getAllOrdersForItemsWithId(id);
		const sortedByMonth = {};

		// Sort by month
		allOrders.forEach((order) => {
			const month = getMonth(new Date(order.submittedAt));
			if (sortedByMonth[month]) {
				sortedByMonth[month].push(order);
			} else {
				sortedByMonth[month] = [order];
			}
		});

		// Strip item from order
		Object.keys(sortedByMonth).forEach((month) => {
			sortedByMonth[month] = sortedByMonth[month].map((order) => {
				return order.items.find((item) => item.item._id === id);
			});
		});

		return sortedByMonth;
	}

	return <div>Estadísticas</div>;
}
