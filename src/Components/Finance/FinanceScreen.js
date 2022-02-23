import axios from 'axios'
import React, {useState, useEffect} from 'react'
import handleFixedExpenses from '../../runOnStartup'
import '../../Styles/Finance.css'
import Loading from '../UI/Loading'
import Courses from './Courses'
import Daily from './Daily'
import DebtsOut from './DebtsOut'
import Expenses from './Expenses'
import FinanceCalendar from './FinanceCalendar'
import FinancialStats from './FinancialStats'
import GetPayed from './GetPayed'
import MySalary from './MySalary'

export default function FinanceScreen() {
    const [view, setview] = useState({ daily: true })
    const [loaded, setLoaded] = useState(false)
    const [salaries, setSalaries] = useState('')
    const [days, setDays] = useState('')
    const [expenses, setExpenses] = useState('')
    const [orders, setOrders] = useState('')
    const [debts, setDebts] = useState('');
    const [data, setData] = useState('')

    useEffect(() => {
        loadData()
        handleFixedExpenses()
    }, [])

    async function loadData() {
        await getSalaries()
        await getDays()
        await getExpenses()
        await getOrders()
        await getDebts()
        
        setData({
            salaries: salaries,
            days: days,
            expenses: expenses,
            orders: orders,
            debts: debts,
            refresh: {
                salaries: getSalaries(),
                days: getDays(),
                expenses: getExpenses(),
                orders: getOrders(),
                debts: getDebts(),
            }
        })

        setLoaded(true)
    }

    async function getSalaries() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/salaries')
        .then(res => setSalaries(res.data.data))
        .catch(err => console.log(err))
    }

    async function getDays() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/days')
        .then(res => setDays(res.data.data))
        .catch(err => console.log(err))
    }

    async function getExpenses() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/expenses')
        .then(res => setExpenses(res.data.data))
        .catch(err => console.log(err))
    }

    async function getOrders() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/orders')
        .then(res => setOrders(res.data.data))
        .catch(err => console.log(err))
    }

    async function getDebts() {
        await axios
        .get('https://chiringuito-api.herokuapp.com/api/debts')
        .then(res => setDebts(res.data.data))
        .catch(err => console.log(err))
    }

    function setView(viewKey) {
        const clearedViews = Object.keys(view).forEach(key => view[key] = false)
        setview(clearedViews) //Set all to false
        setview({ ...view, [viewKey]: true}) //Set param to true
    }

    const leftMenu = (
        <div className='finance_col_left'>
                <div className='finance_btns_wrapper'>
                    <h6 className='finance_menu_btn' onClick={() => setView('daily')}>Caja</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('calendar')}>Calendario</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('stats')}>Estadísticas</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('debtOut')}>Acreedores</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('expenses')}>Gastos</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('mySalary')}>Mi sueldo</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('courses')}>Pistas</h6>
                </div>
                <button 
                className='btn button_primary get_payed_btn'
                onClick={() => setView('getPayed')}
                    >
                        Cobrar dinero
                    </button>
            </div>
    )


    return (
        <div className='app finance_main'>
            {!loaded && <Loading  />}
            {leftMenu}
            <div>
            {days && view.daily && <Daily days={days} refreshDays={getDays} />}
            {loaded && view.stats && <FinancialStats days={days} salaries={salaries} expenses={expenses} />}
            {loaded && view.debtOut && <DebtsOut orders={orders} salaries={salaries} debts={debts} data={data} refreshDebts={getDebts} />}
            {view.calendar && <FinanceCalendar />}
            {loaded && view.expenses && <Expenses salaries={salaries} expenses={expenses} />}
            {loaded && view.getPayed && <GetPayed salaries={salaries} refreshSalaries={getSalaries} />}
            {loaded && view.mySalary && <MySalary salaries={salaries} refreshSalaries={getSalaries}/>}
            {loaded && view.courses && <Courses days={days} />}
            </div>
        </div>
    )
}
