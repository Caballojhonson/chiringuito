import React, { useState } from 'react';
import { data } from '../../data';
import OrderItem from './OrderItem';
import OrderStatusModal from './OrderStatusModal';
import PaymentStatusModal from './PaymentStatusModal';

export default function SupplierBox(props) {
	const { name, order, id } = props;
	const [orderStatus, setOrderStatus] = useState(order.orderStatus);
	const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
	const [orderModalVisible, setOrderModalVisible] = useState(false);
	const [paymentModalVisible, setPaymentModalVisible] = useState(false);

	const submitOrderStatus = async (status) => {
		toggleModal('order');
		setOrderStatus(status);
		const orders = await data.getData(data.orderBinId);
		const thisOrder = orders.find(order => order.id === id)
		const thisSupplier = thisOrder.orders.find(order => order.supplier === name)
		thisSupplier.orderStatus = status
		data.overwriteBin(data.orderBinId, orders)
	}

	const submitDebt = async (debt) => {
        let originalFinance = await data.getData(data.financeBinId);
        originalFinance.debts.out.push({
			supplier: name,
			generationDate: new Date(),
			amount: debt,
			orderId: id,
			debtId: data.getid()
		})
		data.overwriteBin(data.financeBinId, originalFinance)
    }

	async function submitExpense(status, amount) {
		toggleModal('payment');
		setPaymentStatus(status);
		const orders = await data.getData(data.orderBinId);
		const thisOrder = orders.find(order => order.id === id)
		const thisSupplier = thisOrder.orders.find(order => order.supplier === name)
		thisSupplier.paymentStatus = status
		data.overwriteBin(data.orderBinId, orders);
		const financeData = await data.getData(data.financeBinId)
		financeData.expenses.push({
			amount: amount,
			order: order,
			fromOrder: id,
			payedOn: new Date(),
			payedBy: data.username,
			id: data.getid()
		})
		data.overwriteBin(data.financeBinId, financeData)
	}


	const submitPaymentStatus = async (status, debtAmount) => {
		toggleModal('payment');
		setPaymentStatus(status);
		const orders = await data.getData(data.orderBinId);
		const thisOrder = orders.find(order => order.id === id)
		const thisSupplier = thisOrder.orders.find(order => order.supplier === name)
		thisSupplier.paymentStatus = status
		data.overwriteBin(data.orderBinId, orders);
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
		const sum = order.items.reduce((a, b) => {
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
					submitExpense={submitExpense}
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
				{order.items.map((item) => {
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
