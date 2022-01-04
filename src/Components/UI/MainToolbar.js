import React from 'react';
import homeIcon from '../../images/financial-statement.png';
import ordersIcon from '../../images/orders.png';
import settingsIcon from '../../images/setting-line.png';
import calendarIcon from '../../images/work-schedule.png';
import financeIcon from '../../images/finance.png';

import '../../Styles/UI.css';

export default function MainToolbar() {
	return (
		<div className="toolbar_main">
			<a href="/">
				<img className="toolbar_icon" src={homeIcon} alt="Menu Icon" />
			</a>
			<a href="/finanzas">
				<img className="toolbar_icon" src={financeIcon} alt="Menu Icon" />
			</a>
			<a href="/pedidos">
				<img className="toolbar_icon" src={ordersIcon} alt="Menu Icon" />
			</a>
			<a href="/eventos">
				<img className="toolbar_icon" src={calendarIcon} alt="Menu Icon" />
			</a>
			<a href="/opciones">
				<img className="toolbar_icon" src={settingsIcon} alt="Menu Icon" />
			</a>
		</div>
	);
}
