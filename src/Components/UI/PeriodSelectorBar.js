import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

export default function PeriodSelectorBar(props) {
  const [period, setPeriod] = useState('month')


  const periodDropdown = (
    <Dropdown>
      <Dropdown.Toggle 
      id="dropdown-basic"
      size='sm'
      variant="secondary"
      >
        Este mes
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="day">Día</Dropdown.Item>
        <Dropdown.Item eventKey="weekend">Finde</Dropdown.Item>
        <Dropdown.Item eventKey="week">Semana</Dropdown.Item>
        <Dropdown.Item eventKey="month">Mes</Dropdown.Item>
        <Dropdown.Item eventKey="year">Año</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const periodStart = (
    <Form.Group className="mb-3">
    <Form.Control size='sm' placeholder="01/02/2022" disabled />
  </Form.Group>
  )

  const periodEnd = (
    <Form.Group className="mb-3">
    <Form.Control size='sm' placeholder="23/02/2022" disabled />
  </Form.Group>
  )

  return (
    <div className="period_selector_container">
      {periodDropdown}
      {periodStart}
      {periodEnd}
    </div>
  );
}
