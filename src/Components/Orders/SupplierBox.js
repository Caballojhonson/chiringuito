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
		if(status === 'Recibido' && order.paymentStatus === 'Pagado') {
			await axios
			.put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
			, {isArchived: true})
		}
		toggleModal('order')
		refreshOrders()
	}

	const submitPaymentStatus = async (status) => {
		await axios
		.put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
		, {paymentStatus: status})
		if(order.orderStatus === 'Recibido' && status === 'Pagado') {
			await axios
			.put(`https://chiringuito-api.herokuapp.com/api/orders/update/${order._id}`
			, {isArchived: true})
		}
		toggleModal('payment');
		refreshOrders()
	};

	async function submitDebt(amount) {
		const debt = {
			amount: amount,
			fromOrder: order._id,
			generatedBy: data.username,
			generatedOn: new Date(),
			isRecurrent: false,
			concept: order.supplier,
			dueBy: false,
		}

		await axios.post(`https://chiringuito-api.herokuapp.com/api/debts/new`
		, debt)
    }

	async function submitExpense(amount) {
		const expense = {
			amount: amount,
			fromOrder: order._id,
			payedOn: new Date(),
			payedBy: data.username,
			isRecurrent: false,
			concept: `order`
		}

		await axios
		.post(`https://chiringuito-api.herokuapp.com/api/expenses/new`
		, expense)
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
			console.log(b)
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
