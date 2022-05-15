import { useDb } from '../../../../DbContext';

import React, {useEffect} from 'react';

export default function OrderStatsCalculations(props) {
	const { setState, stats } = props;
	const db = useDb();

    useEffect(() => {
        db && setState(...stats, {
            itemTotalsSorted: db && orderedItemsSum(db.orders).map((item) => {
                return {
                    name: getItemNameFromId(item._id),
                    quantity: item.quantity,
                };
            }).sort((a, b) =>  b.quantity - a.quantity)
        })
    }, [])
    

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

	// Sum all items ordered in order sample, groups as {_id, quantity} array

	function orderedItemsSum(sample) {
		const allOrders = sample.map((order) => {
			return order.items.map((item) => {
				return {
					pack: item.item.packQuantity || 1,
					quantity: item.quantity,
					_id: item.item._id,
				};
			});
		});

		console.log(allOrders);

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
				quantity: sum * group[0].pack,
			};
		});

		return summed;
	}

	const namedAndSortedItemTotals = 

	//function

	console.log(db && orderedItemsSum(db.orders));
	console.log(namedAndSortedItemTotals);

    

	return <div>Estadísticas</div>;
}
