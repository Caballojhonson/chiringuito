import React, {useState} from 'react';

export default function PaymentStatusModal(props) {
	const [paymentStatus, setPaymentStatus] = useState(null)
    const [debt, setDebt] = useState(null)
    const [debtInputVisible, setDebtInputVisible] = useState(false)

	const setPaymentStateAs = (state) => {
		state && props.changeState(state);
	};

    const handleChange = (e) => {
        setDebt(e.target.value)
    }

    const handleDebts = (amount) => {
        setPaymentStatus('Pendiente de pago')
        setDebtInputVisible(true)
    }

	return (
		<div className="order_status_modal">
			<div className="modal" tabindex="-1">
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
								onClick={() => setPaymentStatus('Deuda pendiente')}
								type="button"
								className="btn btn-danger"
							>
								Pendiente de pago
							</button>
							<button
								onClick={handleDebts}
								type="button"
								className="btn btn-warning"
							>
								Deuda pendiente
							</button>

                            <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Importe deuda"
                            value={debt}
                            onChange={handleChange}
                            style={debtInputVisible ? {display: 'block'} : {display: 'none'}}
                            />

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
							<button onClick={() => setPaymentStateAs(paymentStatus)} 
							type="button" 
							className="btn btn-primary">
								Confirmar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
