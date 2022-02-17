import axios from 'axios'
import React, {useState} from 'react'
import { data } from '../../data'

export default function DebtsOut(props) {
    const {orders, salaries, debts} = props

    async function payDebt(debt) {
        const expenseFromDebt = () => {
            if(!debt.isRecurrent) {
                return {
                    amount: debt.amount,
                    fromOrder: debt.fromOrder,
                    payedBy: data.username,
                    payedOn: new Date(),
                    concept: 'order'
                    }
            }

            if(debt.isRecurrent) {
                return {
                    amount: debt.amount,
                    payedBy: data.username,
                    debtGeneratedOn: debt.generatedOn,
                    payedOn: new Date(),
                    isRecurrent: true,
                    concept: debt.concept
                }
            }
        }

        await axios
        .post(`https://chiringuito-api.herokuapp.com/api/expenses/new`,
            expenseFromDebt()
        )

        await axios
        .delete(`https://chiringuito-api.herokuapp.com/api/debts/delete/${debt._id}`)

        props.refreshDebts()
    }

    const supplierTotalDebt = () => {
        const unpayedOrders = orders.filter(order => order.paymentStatus === 'Pendiente de pago' && order.isArchived === false)
        const total = unpayedOrders.reduce((a, b) => {
            return a + b.items.reduce((acc, curr) => {
                return acc + (curr.quantity * curr.item.price)
            }, 0)
        }, 0)
        return <p style={{color: 'darkred', fontSize: '1.1rem'}}>{total.toFixed(2)}€</p>
    }

    function Debt(props) {
        const {debt} = props
        return(
            <div className='expense_item_container'>            
                <p>{debt.concept}</p>
                <p>{`${debt.amount.toFixed(2)}€`}</p>
                <button onClick={() => payDebt(debt)} className='btn btn-sm btn-info'>Pagar</button>
            </div>
        )
    }

    const renderDebts = debts && debts.map(debt => {
        return(
            !debt.isRecurrent && <Debt key={data.getid()} debt = {debt} />
        )
    })

    const renderFixedDebt = debts && debts.map(debt => {
        return(
            debt.isRecurrent && <Debt key={data.getid()} debt= {debt} />
        )
    })

    const nonPayedSalaries = salaries.filter(salary => !salary.isPayed)

    const salariesTotalDebt = nonPayedSalaries
    .reduce((a, b) =>  (a + Number(b.amount)), 0)


    return (
        <div className="finance_col_right">
            <h3>Acreedores</h3>
            <div style={{padding: '1rem', textAlign: 'center', width:'100%'}}>
                <h6>Proveedores</h6>
                <h6>Pedidos pendientes de pago:</h6>
                {orders && supplierTotalDebt()}
                { <h6>Deudas pendientes con proveedores:</h6>}
                {renderDebts}
            </div>
            <h6>Salarios</h6>
            {`-${salariesTotalDebt}€`}
            <div style={{padding: '1rem', textAlign: 'center', width:'100%'}}>
                <h6>Gastos fijos pendientes</h6>
                {renderFixedDebt}
            </div>
        </div>
    )
}
