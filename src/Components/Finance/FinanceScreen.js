import React, {useState, useEffect} from 'react'
import { data } from '../../data'
import '../../Styles/Finance.css'
import Daily from './Daily'

export default function FinanceScreen() {
    const [financialData, setfinancialData] = useState(null)

    useEffect(() => {
        console.log('Fetching Finance!')
        data.getData(data.financeBinId)
        .then(val => setfinancialData(val))
    }, [])

    return (
        <div className='app finance_main'>
            <div className='finance_col_left'>
                <button>+ Movimiento</button>
                <div className='finance_btns_wrapper'>

                </div>
            </div>
            <div className='finance_col_right'>
            {financialData && <Daily financialData={financialData} />}
            </div>
        </div>
    )
}
