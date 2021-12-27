import React, { useState } from 'react';

export default function PaymentStatusModal(props) {
	const [paymentStatus, setPaymentStatus] = useState(null);
	const [debt, setDebt] = useState('');
    const [isValid, setIsValid] = useState(true)
	const [debtInputVisible, setDebtInputVisible] = useState(false);

	const setPaymentStateAs = (state, debtAmount) => {
		state && props.changeState(state, debtAmount);
	};

	const handleChange = (e) => {
		e.target.value > 0 ? 
        setDebt(parseFloat(e.target.value)) : 
        setDebt('');
	};

	const handleDebtInput = () => {
		setPaymentStatus('Deuda pendiente');
		setDebtInputVisible(true);
	};

	const handleSubmit = () => {
		if (paymentStatus === 'Deuda pendiente') {
            !debt && setIsValid(false)
			debt && setPaymentStateAs(paymentStatus, debt);
		} else {
			setPaymentStateAs(paymentStatus);
			setDebtInputVisible(false);
            setIsValid(true)
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
									className={`form-control ${isValid ? '' : 'is-invalid'}`}
									placeholder="Importe deuda"
									value={debt}
									onChange={handleChange}
									aria-describedby="inputGroupPrepend"
									required=""
									style={
										debtInputVisible
											? { display: 'block' }
											: { display: 'none' }
									}
								/>
								{!isValid && <div className="invalid-feedback">Introduce el importe</div>}
						

							<button
								onClick={() => setPaymentStatus('Pagado')}
								type="button"
								className="btn btn-success"
							>
								Pagado
							</button>
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
