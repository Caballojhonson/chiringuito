import React, {useState, useEffect} from 'react'
import { data } from '../../data'

export default function DebtsOut(props) {
    const {financialData} = props
    const [orders, setOrders] = useState('')

    useEffect(() => {
        data.getData(data.orderBinId).then(res => setOrders(res))
        return () => {
            setOrders('')
        }
    }, [])

    const supplierTotalDebt = () => {
        const orderedOrRecieved = []
        orders.map(order => {
            order.orders.map(item => {
                if(item.orderStatus !== 'Pendiente' && item.isArchived === false) {
                    orderedOrRecieved.push(item)
                }
            })
        })
        const totalDebt = orderedOrRecieved.reduce((a, b) => a + b.totalPrice , 0)
        return `-${totalDebt}€`
    }

    const nonPayedSalaries = financialData.salaries.filter(salary => !salary.isPayed)

    const salariesTotalDebt = nonPayedSalaries
    .reduce((a, b) =>  (a + Number(b.amount)), 0)


    return (
        <div className="finance_col_right">
            <h3>Acreedores</h3>
            <h6>Proveedores</h6>
            {orders && supplierTotalDebt()}
            <h6>Salarios</h6>
            {`-${salariesTotalDebt}€`}
        </div>
    )
}
