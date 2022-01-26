import React, { useState } from 'react';
import { data } from '../../data';

export default function PaymentStatusModal(props) {
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [debt, setDebt] = useState('');
	const [realPayment, setRealPayment] = useState('')
    const [debtIsValid, setDebtIsValid] = useState(true);
	const [paymentIsValid, setPaymentIsValid] = useState(true)
	const [debtInputVisible, setDebtInputVisible] = useState(false);
	const [paymentInputVisible, setPaymentInputVisible] = useState(false)

	const setPaymentStatusAs = (status) => {
		status && props.submitStatus(status);
	};

	const handleDebtChange = (e) => {
		e.target.value > 0 ? 
        setDebt(parseFloat(e.target.value)) : 
        setDebt('');
	};

	const handlePaymentChange = (e) => {
		e.target.value > 0 ? 
        setRealPayment(parseFloat(e.target.value)) : 
        setRealPayment('');
	};

	const handleDebtInput = () => {
		setPaymentStatus('Deuda pendiente');
		setDebtInputVisible(true);
	};

	const handlePaymentInput = () => {
		setPaymentStatus('Pagado');
		setPaymentInputVisible(true);
	};

	const handleSubmit = () => {
		if (paymentStatus === 'Deuda pendiente') {
            !debt && setDebtIsValid(false)
			debt && setPaymentStatusAs(paymentStatus);
			debt && props.submitDebt(debt)
		} else if (paymentStatus === 'Pagado') {
			!realPayment && setPaymentIsValid(false)
			realPayment && setPaymentStatusAs(paymentStatus);
			realPayment && props.submitExpense(realPayment)
		} else {
			setPaymentStatusAs(paymentStatus);
			setDebtInputVisible(false);
            setDebtIsValid(true)
			setPaymentInputVisible(false)
			setPaymentIsValid(true)
		}
	};

	return (
		<div className="order_status_modal">
			<div className="modal" tabIndex="-1">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalSizeLabel">
								Estado del pago
							</h5>

							<button
								type="button"
								className="btn-close"
								aria-label="Close"
								onClick={props.toggleModal}
							></button>
						</div>
						<div className="modal-body">
							<button
								onClick={() => setPaymentStatus('Pendiente de pago')}
								type="button"
								className="btn btn-danger"
							>
								Pendiente de pago
							</button>

							<button
								onClick={handleDebtInput}
								type="button"
								className="btn btn-warning has-validation"
							>
								Deuda pendiente
							</button>

							
								<input
									type="number"
									className={`form-control ${debtIsValid ? '' : 'is-invalid'}`}
									placeholder="Importe deuda"
									value={debt}
									onChange={handleDebtChange}
									aria-describedby="inputGroupPrepend"
									required=""
									style={
										debtInputVisible
											? { display: 'block' }
											: { display: 'none' }
									}
								/>
								{!debtIsValid && <div className="invalid-feedback">Introduce el importe</div>}
						

							<button
								onClick={handlePaymentInput}
								type="button"
								className="btn btn-success"
							>
								Pagado
							</button>

							<input
									type="number"
									className={`form-control ${paymentIsValid ? '' : 'is-invalid'}`}
									placeholder="Importe real"
									value={realPayment}
									onChange={handlePaymentChange}
									aria-describedby="inputGroupPrepend"
									required=""
									style={
										paymentInputVisible
											? { display: 'block' }
											: { display: 'none' }
									}
								/>
								{!paymentIsValid && <div className="invalid-feedback">Introduce el importe final</div>}

						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								onClick={props.toggleModal}
							>
								Cancelar
							</button>

							<button
								onClick={handleSubmit}
								type="button"
								className="btn btn-primary"
							>
								Confirmar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
