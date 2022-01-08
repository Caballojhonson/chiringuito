import { isSameDay } from 'date-fns';
import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { data } from '../../data';
import '../../Styles/Calendar.css'

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

function resetSalaries() {
  financialData.salaries = forceSalaries
  data.overwriteBin(data.financeBinId, financialData)
  console.log(financialData)

}

const forceSalaries =  [
  {
    "date": "2021-12-31T23:00:00.000Z",
    "amount": "100",
    "isPayed": false,
    "user": "Caballo",
    "id": 1
  },
  {
    "date": "2022-01-01T23:00:00.000Z",
    "amount": "50",
    "isPayed": false,
    "user": "Caballo",
    "id": 2
  },
  {
    "date": "2022-01-02T23:00:00.000Z",
    "amount": "40",
    "isPayed": false,
    "user": "Caballo",
    "id": 3
  },
  {
    "date": "2022-01-03T23:00:00.000Z",
    "amount": "60",
    "isPayed": false,
    "user": "Caballo",
    "id": 4
  }
]


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
