import axios from "axios";
import isSameDay from "date-fns/isSameDay";
import React, { useState, useEffect } from "react";
import { data } from "../../data";
import NewOperationForm from "./NewOperationForm";
import Operation from "./Operation";


export default function Daily(props) {
    const {days, refreshDays} = props

    const [alreadyOpenWarn, setalreadyOpenWarn] = useState(false)
    const [showOpeningInput, setshowOpeningInput] = useState(false);
    const [showClosingInput, setshowClosingInput] = useState(false)
    const [showNewOperationModal, setshowNewOperationModal] = useState(false)
    const [openingAmount, setopeningAmount] = useState(0)
    const [closingAmount, setclosingAmount] = useState(0)

    //NOT needed for now
    function sortDays() {
        days.forEach(day => {
            day.timestamp = new Date(day.timestamp)
        });
        days.sort((a, b) => a.timestamp - b.timestamp)
    }

    const lastDay = days[days.length - 1]
    const lastDayId = lastDay._id

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
                usr: data.username,
                timestamp: new Date(),
                operations: [
                    {
                        concept: 'Apertura',
                        timestamp: new Date(),
                        usr: data.username,
                        opType: 'opening cash',
                        amount: Number(openingAmount),
                    }
                ],
                openingCash: Number(openingAmount),
                isOpen: true,
            }

            await axios
            .post('https://chiringuito-api.herokuapp.com/api/days/new',
            newDay
            )
            setshowOpeningInput(false)
            await refreshDays()
        }
    }

    const closeDay = async () => {
        const lastDayId = lastDay._id
        const totalBalance = todaysBalance()

        lastDay.isOpen = false
        lastDay.closingCash = Number(closingAmount)
        lastDay.closingTime = new Date()
        lastDay.totalBalance = (totalBalance + lastDay.closingCash - lastDay.openingCash)

        await axios
        .put(`https://chiringuito-api.herokuapp.com/api/days/update/${lastDayId}`,
        lastDay
        )
        await refreshDays()
        toggleClosingInput()
    }

    const reopenDay = async () => {
        lastDay.isOpen = true

        await axios
        .put(`https://chiringuito-api.herokuapp.com/api/days/update/${lastDayId}`,
        lastDay
        )
        await refreshDays()
        setalreadyOpenWarn(false)
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
            <div className="form_spaced">
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
        <div className="form_spaced">
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
            <NewOperationForm closeModal={toggleModal} lastDay={lastDay} refreshDays={refreshDays} />
        )

    const dailyBalance = 
    !showNewOperationModal && 
    evalIfOpen() &&  
    (
        <div className="dailybalance_container">
            <h1 style={balanceColor()} className="dailybalance">{`${todaysBalance().toFixed(2)}€`}</h1>
            <p className="dailybalance dailybalance_tag">Balance diario</p>
        </div>
    )

    return ( 
    <div className="finance_col_right">
        <h3>Caja diaria</h3>
        {cantOpenWarn}
        {newOperationForm}
        {openDayBtn}
        {openingAmountInput}
        {openSign}
        {operationList}
        {closeBtn}
        {closingAmountInput}
        {dailyBalance}
    </div>
    );
}
