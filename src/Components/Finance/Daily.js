import isSameDay from "date-fns/isSameDay";
import React, { useState } from "react";
import { data } from "../../data";
import NewOperationForm from "./NewOperationForm";
import Operation from "./Operation";


export default function Daily(props) {
    const {financialData} = props
    const [alreadyOpenWarn, setalreadyOpenWarn] = useState(false)
    const [showOpeningInput, setshowOpeningInput] = useState(false);
    const [showNewOperationModal, setshowNewOperationModal] = useState(false)
    const [openingAmount, setopeningAmount] = useState(0)
    const [closingAmount, setclosingAmount] = useState(0)



    const weCanReopen = () => {
        const {days} = financialData
        const sameday = isSameDay(new Date(), new Date(days[days.length - 1].timestamp))
        const lastDayIsOpen = days[days.length - 1].isOpen
        if(!sameday && !lastDayIsOpen) {
            return true
        } else {
            setalreadyOpenWarn(true)
            return false
        }
    }

    const evalIfOpen = () => {
        const {days} = financialData
        if (days[days.length - 1]) {
        return days[days.length - 1].isOpen
        }else{
            return false
        }
    } 

    const toggleOpeningInput = () => {
        weCanReopen() &&
        setshowOpeningInput(prev => !prev)
    }

    const toggleModal = () => {
        setshowNewOperationModal(prev => !prev)
    }

    const handleChange = (e) => {
        setopeningAmount(e.target.value)
    }

     const handleOpen = async () => {

         if(openingAmount && weCanReopen()) {
            const newDay = {
                id: data.getid(),
                by: data.username,
                timestamp: new Date(),
                operations: [
                    {
                        concept: 'Apertura',
                        timestamp: new Date(),
                        by: data.username,
                        type: 'cash addition',
                        amount: openingAmount,
                    }
                ],
                openingCash: openingAmount,
                isOpen: true,
            }
            financialData.days.push(newDay)
            await data.overwriteBin(data.financeBinId, financialData)
             setshowOpeningInput(false)
             console.log(financialData)
         }
     }

     const closeDay = async () => {
        const {days} = financialData
        days[days.length - 1].isOpen = false
        await data.overwriteBin(data.financeBinId, financialData)
        console.log('Day Closed! ')
        console.log(financialData)
        window.location.reload()
     }

     const reopenDay = async () => {
        const {days} = financialData
        days[days.length - 1].isOpen = true
        await data.overwriteBin(data.financeBinId, financialData)
        window.location.reload()
        console.log(financialData)
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

    const openSign = (
            <button className="btn btn-success">CAJA ABIERTA</button>
    )

    const closeBtn = (
            <button onClick={closeDay} className="btn btn-outline-danger close_btn">CERRAR CAJA</button>
    )

    const cantOpenWarn = (
        <div className="form_centered">
            <div className="alert alert-warning" role="alert">
                <strong>Oye!</strong> {`${data.username} ya ha cerrado caja hoy, ¿Qué haces?`}
            </div>
            ¿Quieres retomar la caja de hoy?
            <button onClick={reopenDay} type="button" className="btn btn-warning">Retomar</button>
        </div>
    )

    function todaysOperationsList() {
        const {days} = financialData
        const todaysOperations = days[days.length - 1].operations;
        return todaysOperations.map(item => <Operation key={data.getid()} operation={item} />)
    }

    const addNewOperationBtn = (
        <button 
        type="button" 
        className="btn btn-outline-dark btn-sm"
        onClick={toggleModal}
        > + Añadir Movimiento</button>
    )

    return (
    <div className="finance_col_right">
        {alreadyOpenWarn && cantOpenWarn}
        {showNewOperationModal && <NewOperationForm closeModal={toggleModal} financialData={financialData} />}
        {!showOpeningInput && !evalIfOpen() && !alreadyOpenWarn && <button className="btn btn-success" onClick={toggleOpeningInput}>Abrir Caja</button>}
        {showOpeningInput && !alreadyOpenWarn && openingAmountInput}
        {!showNewOperationModal && evalIfOpen() && openSign}
        {!showNewOperationModal && evalIfOpen() && todaysOperationsList()}
        {!showNewOperationModal && evalIfOpen() && addNewOperationBtn}
        {!showNewOperationModal && evalIfOpen() && closeBtn}
    </div>
    );
}
