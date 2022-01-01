import React from "react";
import { data } from "../../data";

export default function ConfirmationModal(props) {
  const { bin, closeModal } = props;

  const resetBin = () => {
    if (bin === data.financeBinId) {
      data.overwriteBin(
        bin,
         {
          days: [{}],
          debts: {
            in: [],
            out: [],
          },
          salaries: [],
        })
      closeModal()
    } else {
      data.overwriteBin(bin, []);
      closeModal();
    }
  };

  return (
    <div className="modal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header ">
            <h5 className="modal-title " id="modalBasicLabel">
              ¿Seguro?
            </h5>
            <button
              onClick={closeModal}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="text-center">No la líes!</h5>
            Estás a punto de borrar la base de datos para esta categoría. Si no
            lo tienes claro pulsa cancelar o sal de esta pantalla.
          </div>
          <div className="modal-footer">
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-secondary"
            >
              Cancelar
            </button>
            <button onClick={resetBin} type="button" className="btn btn-danger">
              Estoy seguro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
