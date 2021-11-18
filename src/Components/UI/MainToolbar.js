import React from 'react'
import homeIcon from '../../images/homepage.png'
import checklistIcon from '../../images/checklist.png'
import ordersIcon from '../../images/orders.png'
import settingsIcon from '../../images/setting-line.png'
import calendarIcon from '../../images/work-schedule.png'
import '../../Styles/UI.css'

export default function MainToolbar(props) {
    return (
        <div className="toolbar_main">
            <img className="toolbar_icon" src={homeIcon} alt='Menu Icon' />
            <img className="toolbar_icon" src={checklistIcon} alt='Menu Icon' />
            <img className="toolbar_icon" src={ordersIcon} alt='Menu Icon' />
            <img className="toolbar_icon" src={calendarIcon} alt='Menu Icon' />
            <img onClick={props.toggleSettings} className="toolbar_icon" src={settingsIcon} alt='Menu Icon' />
        </div>
    )
}
