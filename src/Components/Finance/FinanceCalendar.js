import { isSameDay } from 'date-fns';
import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../../Styles/Calendar.css'
import { data } from '../../data';

export default function FinanceCalendar() {
    const [value, onChange] = useState(new Date());
    const [financeData, setFinanceData] = useState('')

    useEffect(() => {
        data.getData(data.financeBinId).then(val => setFinanceData(val))
       
    }, [])

    const openDays = financeData && financeData.days.map(day => day.timestamp)
console.log(openDays)

function tileClassName({ date, view }) {
  // Add class to tiles in month view only
  if (view === 'month') {
    // Check if a date React-Calendar wants to check is on the list of dates to add class to
    if (financeData && openDays.find(dDate => isSameDay(dDate, date))) {
      return 'BIGASSCLASS____LOOKATME';
    }
  }
}


    return (
        <div className='finance_col_right'>
            <Calendar
                onChange={onChange}
                value={value}
                locale={'es-ES'}
                tileClassName={tileClassName}
            />
        </div>
    )
}
