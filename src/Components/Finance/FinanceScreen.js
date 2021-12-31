import React, {useState} from 'react'
import '../../Styles/Finance.css'
import Daily from './Daily'

export default function FinanceScreen() {
    const [dayIsOpen, setdayIsOpen] = useState(false)

    return (
        <div className='app finance_main'>
            <div className='finance_col_left'>
                <button>+ Movimiento</button>
                <div className='finance_btns_wrapper'>

                </div>
            </div>
            <div className='finance_col_right'>
                <Daily  />
            </div>
        </div>
    )
}
