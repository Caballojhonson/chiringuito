import React, { useState } from "react";
import { data } from "../../data";

export default function Daily() {
    const [dayIsOpen, setdayIsOpen] = useState(false);
    const [showOpeningInput, setshowOpeningInput] = useState(false);
    const [openingAmount, setopeningAmount] = useState(0)

    const toggleOpeningInput = () => {
        setshowOpeningInput(prev => !prev)
    }

    const handleChange = (e) => {
        setopeningAmount(e.target.value)
    }

    const handleOpen = async () => {
        if(openingAmount) {
            setdayIsOpen(true)
            setshowOpeningInput(false)
            const financialData = await data.getData(data.financeBinId)
            
        }
    }

    const openingAmountInput = (
        <div>
            <input onChange={handleChange} className="form-control" type="number" placeholder="Importe apertura" />
            <div className="button_group">
                <button onClick={toggleOpeningInput} className="btn button_cancel" type="button"> Cancelar </button>
                <button onClick={handleOpen} className="btn button_primary" type="button"> Abrir Caja </button>
            </div>
        </div>
    );

    const openBtn = (
        <div>
            <button className="btn btn-success">CAJA ABIERTA</button>
        </div>
    )

    return (
    <div className="">
        {!showOpeningInput && !dayIsOpen && <button className="btn btn-success" onClick={toggleOpeningInput}>Abrir Caja</button>}
        {showOpeningInput && openingAmountInput}
        {dayIsOpen && openBtn}
    </div>
    );
}
