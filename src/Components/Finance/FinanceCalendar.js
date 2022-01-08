import { isSameDay } from 'date-fns';
import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../../Styles/Calendar.css'
import { data } from '../../data';

export default function FinanceCalendar(props) {
    const {financialData} = props
    const [value, onChange] = useState(new Date());

    const openDays = financialData.days.map(day => day.timestamp)

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (openDays.find(dDate => isSameDay(dDate, date))) {
      return 'BIGASSCLASS____LOOKATME';
    }
  }
}


    return (
        <div className='finance_col_right'>
          {console.log(value)}
            <Calendar
                onChange={onChange}
                value={value}
                locale={'es-ES'}
                tileClassName={tileClassName}
            />
        </div>
    )
}
