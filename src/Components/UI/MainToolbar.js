import React from 'react'
import homeIcon from '../../images/homepage.png'
import checklistIcon from '../../images/checklist.png'
import ordersIcon from '../../images/orders.png'
import settingsIcon from '../../images/setting-line.png'
import calendarIcon from '../../images/work-schedule.png'
import '../../Styles/UI.css'

export default function MainToolbar() {
    return (
        <div className="toolbar_main">
            <img className="toolbar_icon" src={homeIcon} />
            <img className="toolbar_icon" src={checklistIcon} />
            <img className="toolbar_icon" src={ordersIcon} />
            <img className="toolbar_icon" src={calendarIcon} />
            <img className="toolbar_icon" src={settingsIcon} />
        </div>
    )
}
