import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import '../../Styles/Calendar.css'

export default function FinanceCalendar(props) {

    const [value, onChange] = useState(new Date());

    return (
        <div className='finance_col_right'>
          
            <Calendar
                onChange={onChange}
                value={value}
                locale={'es-ES'}
                
            />
        </div>
       
    )
}
