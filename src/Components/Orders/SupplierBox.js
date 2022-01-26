import axios from 'axios';
import React, { useState } from 'react';
import { data } from '../../data';
import OrderItem from './OrderItem';
import OrderStatusModal from './OrderStatusModal';
import PaymentStatusModal from './PaymentStatusModal';

export default function SupplierBox(props) {
	const { name, order, id, refreshOrders } = props;
	//const [orderStatus, setOrderStatus] = useState(order.orderStatus);
	//const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
	const [orderModalVisible, setOrderModalVisible] = useState(false);
	const [paymentModalVisible, setPaymentModalVisible] = useState(false);

	const submitOrderStatus = async (status) => {
		await axios
		.put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
		, {orderStatus: status})
		toggleModal('order')
		refreshOrders()
	}

	const submitPaymentStatus = async (status) => {
		await axios
		.put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
		, {paymentStatus: status})
		toggleModal('payment');
		refreshOrders()
	};

	async function submitDebt(debt) {
        let originalFinance = await data.getData(data.financeBinId);
        originalFinance.debts.out.push({
			supplier: name,
			generationDate: new Date(),
			amount: debt,
			orderId: order._id,
		})
		data.overwriteBin(data.financeBinId, originalFinance)
    }

	async function submitExpense(amount) {
		const orders = await data.getData(data.orderBinId);
		data.overwriteBin(data.orderBinId, orders);
		const financeData = await data.getData(data.financeBinId)
		financeData.expenses.push({
			amount: amount,
			order: order,
			fromOrder: order._id,
			payedOn: new Date(),
			payedBy: data.username,

		})
		data.overwriteBin(data.financeBinId, financeData)
	}

	const toggleModal = (str) => {
		if (str === 'order') setOrderModalVisible((prev) => !prev);
		if (str === 'payment') setPaymentModalVisible((prev) => !prev);
	};

	const evaluateOrderColor = () => {
		if (order.orderStatus === 'Pendiente') return 'bg-warning';
		if (order.orderStatus === 'Pedido') return 'bg-primary';
		if (order.orderStatus === 'Recibido') return 'bg-success';
	};

	const evaluatePaymentColor = () => {
		if (order.paymentStatus === 'Pendiente de pago') return 'bg-danger';
		if (order.paymentStatus === 'Deuda pendiente') return 'bg-warning';
		if (order.paymentStatus === 'Pagado') return 'bg-success';
	};

	const supplierTotal = () => {
		const sum = order.items.reduce((a, b) => {
			return parseFloat(a) + parseFloat(b.item.price) * parseFloat(b.quantity);
		}, 0);
		return sum.toFixed(2) + '€';
	};

	return (
		<div className="supplier_box">
			{orderModalVisible && (
				<OrderStatusModal
					toggleModal={() => toggleModal('order')}
					submitStatus={submitOrderStatus}
				/>
			)}
			{paymentModalVisible && (
				<PaymentStatusModal
					toggleModal={() => toggleModal('payment')}
					submitStatus={submitPaymentStatus}
					submitExpense={submitExpense}
					submitDebt={submitDebt}
				/>
			)}
			<div className="supplier_nameandstate">
				<h4 className="supplier_name">{name}</h4>
				<span
					onClick={() => toggleModal('order')}
					className={`badge supplier_state_badge ${evaluateOrderColor()}`}
				>
					{order.orderStatus}
				</span>
			</div>
			<div className="order_item_container">
				{order.items.map((item) => {
					return <OrderItem item={item} key={data.getid()} />;
				})}
			</div>
			<div className="supplier_footer">
				<span
					onClick={() => toggleModal('payment')}
					className={`badge supplier_state_badge ${evaluatePaymentColor()}`}
				>
					{order.paymentStatus}
				</span>

				<h6 className="order_supplier_total">{supplierTotal()}</h6>
			</div>
		</div>
	);
}
