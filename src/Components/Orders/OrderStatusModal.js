import React, {useState} from 'react';

export default function OrderStatusModal(props) {
	const [orderStatus, setOrderStatus] = useState(null)

	const setOrderStateAs = (state) => {
		state && props.changeState(state);
	};
	return (
		<div className="order_status_modal">
			<div className="modal" tabindex="-1">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="modalSizeLabel">
								Estado del pedido
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
								onClick={() => setOrderStatus('Pendiente')}
								type="button"
								className="btn btn-warning"
							>
								Pendiente
							</button>
							<button
								onClick={() => setOrderStatus('Pedido')}
								type="button"
								className="btn btn-primary"
							>
								Pedido
							</button>
							<button
								onClick={() => setOrderStatus('Recibido')}
								type="button"
								className="btn btn-success"
							>
								Recibido
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
							<button onClick={() => setOrderStateAs(orderStatus)} 
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
