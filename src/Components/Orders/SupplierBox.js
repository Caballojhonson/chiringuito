import React, { useState } from 'react';
import { data } from '../../data';
import OrderItem from './OrderItem';
import OrderStatusModal from './OrderStatusModal';
import PaymentStatusModal from './PaymentStatusModal';

export default function SupplierBox(props) {
	const { name, order, id } = props;
	const [orderStatus, setOrderStatus] = useState(order[0].orderStatus);
	const [paymentStatus, setPaymentStatus] = useState(order[0].paymentStatus);
	const [orderModalVisible, setOrderModalVisible] = useState(false);
	const [paymentModalVisible, setPaymentModalVisible] = useState(false);

	const affectedItemIds = order.map((item) => item.id); // Generate array of affected items

	const submitOrderStatus = async (str) => {
		toggleModal('order');
		setOrderStatus(str);
		let originalOrders = await data.getData(data.orderBinId);
		const affectedOrderIndex = originalOrders.findIndex(
			(item) => item.id === id
		);

		originalOrders[affectedOrderIndex].order.forEach((item) => {
			if (affectedItemIds.some((id) => id === item.id)) {
				item.orderStatus = str;
			}
		});
		data.overwriteBin(data.orderBinId, originalOrders);
	};

	const submitDebt = async (debt) => {
        let originalFinance = await data.getData(data.financeBinId);
        originalFinance.suppliers.debts.push({
			supplier: name,
			generationDate: new Date(),
			amount: debt,
			orderId: id,
			debtId: data.getid()
		})
		data.overwriteBin(data.financeBinId, originalFinance)
    }


	const submitPaymentStatus = async (str, debtAmount) => {
		toggleModal('payment');
		setPaymentStatus(str);
		let originalOrders = await data.getData(data.orderBinId);
		const affectedOrderIndex = originalOrders.findIndex(
			(item) => item.id === id
		);

		originalOrders[affectedOrderIndex].order.forEach((item) => {
			if (affectedItemIds.some((id) => id === item.id)) {
				item.paymentStatus = str;
			}
		});
		data.overwriteBin(data.orderBinId, originalOrders);
		debtAmount && submitDebt(debtAmount);
	};

	const toggleModal = (str) => {
		if (str === 'order') setOrderModalVisible((prev) => !prev);
		if (str === 'payment') setPaymentModalVisible((prev) => !prev);
	};

	const evaluateOrderColor = () => {
		if (orderStatus === 'Pendiente') return 'bg-warning';
		if (orderStatus === 'Pedido') return 'bg-primary';
		if (orderStatus === 'Recibido') return 'bg-success';
	};

	const evaluatePaymentColor = () => {
		if (paymentStatus === 'Pendiente de pago') return 'bg-danger';
		if (paymentStatus === 'Deuda pendiente') return 'bg-warning';
		if (paymentStatus === 'Pagado') return 'bg-success';
	};

	const supplierTotal = () => {
		const sum = order.reduce((a, b) => {
			return parseFloat(a) + parseFloat(b.price) * parseFloat(b.quantity);
		}, 0);
		return sum.toFixed(2) + '€';
	};

	return (
		<div className="supplier_box">
			{orderModalVisible && (
				<OrderStatusModal
					toggleModal={() => toggleModal('order')}
					changeState={submitOrderStatus}
				/>
			)}
			{paymentModalVisible && (
				<PaymentStatusModal
					toggleModal={() => toggleModal('payment')}
					changeState={submitPaymentStatus}
				/>
			)}
			<div className="supplier_nameandstate">
				<h4 className="supplier_name">{name}</h4>
				<span
					onClick={() => toggleModal('order')}
					className={`badge supplier_state_badge ${evaluateOrderColor()}`}
				>
					{orderStatus}
				</span>
			</div>
			<div className="order_item_container">
				{order.map((item) => {
					return <OrderItem item={item} key={data.getid()} />;
				})}
			</div>
			<div className="supplier_footer">
				<span
					onClick={() => toggleModal('payment')}
					className={`badge supplier_state_badge ${evaluatePaymentColor()}`}
				>
					{paymentStatus}
				</span>

				<h6 className="order_supplier_total">{supplierTotal()}</h6>
			</div>
		</div>
	);
}
