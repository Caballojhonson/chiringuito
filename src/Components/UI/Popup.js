import React from 'react'

export default function Popup(props) {
    const {title, textTitle, text, closeModal, onConfirm} = props

    return (
        <div>
            <div className="modal" tabIndex="-1">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header ">
						<h5 className="modal-title " id="modalBasicLabel">
							{title}
						</h5>
						<button onClick={closeModal}
							type="button"
							className="btn-close"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<h5 className="text-center">{textTitle}</h5>
						{text}
					</div>
					
					<div className="modal-footer">
						<button onClick={closeModal} type="button" className="btn btn-secondary">
							Cancelar
						</button>
						<button onClick={onConfirm} type="button" className="btn btn-danger">
							Estoy seguro
						</button>
					</div>
				</div>
			</div>
		</div>
        </div>
    )
}
