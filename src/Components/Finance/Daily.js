import isSameDay from "date-fns/isSameDay";
import React, { useState } from "react";
import { data } from "../../data";
import NewOperationForm from "./NewOperationForm";
import Operation from "./Operation";


export default function Daily(props) {
    const {financialData} = props

    const [alreadyOpenWarn, setalreadyOpenWarn] = useState(false)
    const [showOpeningInput, setshowOpeningInput] = useState(false);
    const [showClosingInput, setshowClosingInput] = useState(false)
    const [showNewOperationModal, setshowNewOperationModal] = useState(false)
    const [openingAmount, setopeningAmount] = useState(0)
    const [closingAmount, setclosingAmount] = useState(0)

    const lastDay = financialData.days[financialData.days.length - 1]

    function todaysBalance() {
       return lastDay.operations.reduce(
           (prev, curr) => prev + curr.amount
           , 0) - lastDay.openingCash
    }

    const balanceColor = () => {
        const green = {color: 'green'}
        const red = {color: 'red'}
        return (todaysBalance() >= 0) ? green : red 
    }

    const weCanReopen = () => {
        const sameday = isSameDay(new Date(), new Date(lastDay.timestamp))
        const lastDayIsOpen = lastDay.isOpen
        if(!sameday && !lastDayIsOpen) {
            return true
        } else {
            setalreadyOpenWarn(true)
            return false
        }
    }

    const evalIfOpen = () => {
        if (lastDay) {
        return lastDay.isOpen
        }else{
            return false
        }
    } 

    const toggleOpeningInput = () => {
        weCanReopen() &&
        setshowOpeningInput(prev => !prev)
    }

    const toggleClosingInput = () => {
        setshowClosingInput(prev => !prev)
    }

    const toggleModal = () => {
        setshowNewOperationModal(prev => !prev)
    }

    const handleOpeningAmount = (e) => {
        setopeningAmount(e.target.value)
    }

    const handleClosingAmount = (e) => {
        setclosingAmount(e.target.value)
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
                        type: 'opening cash',
                        amount: Number(openingAmount),
                    }
                ],
                openingCash: Number(openingAmount),
                isOpen: true,
            }
            financialData.days.push(newDay)
            await data.overwriteBin(data.financeBinId, financialData)
            setshowOpeningInput(false)
        }
    }

    const closeDay = async () => {
        const totalBalance = todaysBalance()
        lastDay.isOpen = false
        lastDay.closingCash = Number(closingAmount)
        lastDay.totalBalance = (totalBalance + lastDay.closingCash - lastDay.openingCash)
        await data.overwriteBin(data.financeBinId, financialData)
        window.location.reload()
    }

    const reopenDay = async () => {
        lastDay.isOpen = true
        await data.overwriteBin(data.financeBinId, financialData)
        window.location.reload()
    }

    const openDayBtn = 
        !showOpeningInput && 
        !evalIfOpen() && 
        !alreadyOpenWarn && 
        (
            <button className="btn btn-success" onClick={toggleOpeningInput}>Abrir Caja</button>
        )

    const openingAmountInput = 
        showOpeningInput &&
        !alreadyOpenWarn &&
        (
            <div>
                <input onChange={handleOpeningAmount} className="form-control" type="number" placeholder="Importe apertura" />
                <div className="button_group">
                    <button onClick={toggleOpeningInput} className="btn button_cancel" type="button"> Cancelar </button>
                    <button onClick={handleOpen} className="btn button_primary" type="button"> Abrir Caja </button>
                </div>
            </div>
        );

    const closingAmountInput = 
    showClosingInput &&
    !alreadyOpenWarn &&
    (
        <div>
            <input onChange={handleClosingAmount} className="form-control" type="number" placeholder="Importe cierre" />
            <div className="button_group">
                <button onClick={toggleClosingInput} className="btn button_cancel" type="button"> Cancelar </button>
                <button onClick={closeDay} className="btn button_primary" type="button"> Cerrar Caja </button>
            </div>
        </div>
    );


    const openSign = 
        !showNewOperationModal &&
        evalIfOpen() && 
        (
                <button className="btn btn-success">CAJA ABIERTA</button>
        )

    const closeBtn = 
        !showNewOperationModal && 
        evalIfOpen() &&  
        (
                <button onClick={toggleClosingInput} className="btn btn-outline-danger close_btn">CERRAR CAJA</button>
        )

    const cantOpenWarn = alreadyOpenWarn && 
    (
        <div className="form_centered">
            <div className="alert alert-warning" role="alert">
                <strong>Oye!</strong> {`${data.username} ya ha cerrado caja hoy, ¿Qué haces?`}
            </div>
            ¿Quieres retomar la caja de hoy?
            <button onClick={reopenDay} type="button" className="btn btn-warning">Retomar</button>
        </div>
    )

    function todaysOperationsList() {
        if(!showNewOperationModal && evalIfOpen()) {
            const todaysOperations = lastDay.operations;
            return todaysOperations.map(item => <Operation key={data.getid()} operation={item} />)
        }
    }

    const addNewOperationBtn = 
        !showNewOperationModal && 
        evalIfOpen() &&  
        (
            <button 
            type="button" 
            className="btn btn-outline-dark btn-sm operation_addnew_btn"
            onClick={toggleModal}
            > + Añadir Movimiento</button>
        )

    const operationList = (
        <div className="operation_list_container">
            {todaysOperationsList()}
            {addNewOperationBtn}
        </div>
    )

    const newOperationForm = 
        showNewOperationModal && 
        (
            <NewOperationForm closeModal={toggleModal} financialData={financialData} />
        )

    const dailyBalance = 
    !showNewOperationModal && 
    evalIfOpen() &&  
    (
        <div className="dailybalance_container">
            <h1 style={balanceColor()} className="dailybalance">{`${todaysBalance()}€`}</h1>
            <p className="dailybalance dailybalance_tag">Balance diario</p>
        </div>
    )

    return ( 
    <div className="finance_col_right">
        {console.log(financialData)}
        <h3>Problema técnico</h3>
        <h3 className="text-center">SOLO APERTURA Y CIERRE</h3>
        <h3 className="text-center">NO introducir operaciones!!</h3>
        {cantOpenWarn}
        {newOperationForm}
        {openDayBtn}
        {openingAmountInput}
        {openSign}
        {operationList}
        {closeBtn}
        {dailyBalance}
        {closingAmountInput}
    </div>
    );
}
