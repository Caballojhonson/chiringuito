import React, {useState, useEffect} from 'react'
import { data } from '../../data'
import '../../Styles/Finance.css'
import Daily from './Daily'
import DebtsOut from './DebtsOut'
import FinancialStats from './FinancialStats'

export default function FinanceScreen() {
    const [financialData, setfinancialData] = useState(null)
    const [view, setview] = useState({
        daily: true,
        stats: false,
    })

    useEffect(() => {
        console.log('Fetching Finance!')
        data.getData(data.financeBinId)
        .then(val => setfinancialData(val))
    }, [])

    function setView(viewKey) {
        const clearedViews = Object.keys(view).forEach(key => view[key] = false)
        setview(clearedViews) //Set all to false
        setview({ ...view, [viewKey]: true}) //Set param to true
    }


    return (
        <div className='app finance_main'>
            <div className='finance_col_left'>
                <div className='finance_btns_wrapper'>
                    <h6 className='finance_menu_btn' onClick={() => setView('daily')}>Caja</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('stats')}>Estadísticas</h6>
                    <h6 className='finance_menu_btn' onClick={() => setView('debtOut')}>Acreedores</h6>
                </div>
            </div>
            <div>
            {financialData && view.daily && <Daily financialData={financialData} />}
            {financialData && view.stats && <FinancialStats financialData={financialData} />}
            {financialData && view.debtOut && <DebtsOut financialData={financialData} />}
            </div>
        </div>
    )
}
