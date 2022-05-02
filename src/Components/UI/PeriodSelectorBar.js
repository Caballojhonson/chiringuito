import { add, endOfMonth, endOfWeek, endOfYear, format, startOfMonth, startOfWeek, startOfYear, sub } from "date-fns";
import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import leftIcon from '../../images/triangle-left-arrow.png'
import rightIcon from '../../images/triangle-right-arrow.png'
import Calendar from 'react-calendar'


export default function PeriodSelectorBar(props) {
  const {handler} = props

  const [period, setPeriod] = useState('Este mes')
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [start, setStart] = useState(startOfMonth(new Date()))
  const [end, setEnd] = useState(new Date())

  useEffect(() => {
    handler(start, end)
  }, [start, end])
  

  const handlePeriodTags = (e) => {
    setPeriod(e)

    if(e === 'Semana') {
      setStart(new Date(startOfWeek(new Date(), { weekStartsOn: 1 })))
      setEnd(new Date(endOfWeek(new Date(), { weekStartsOn: 1 })))
    }

    if(e === 'Mes' ) {
      setStart(new Date(startOfMonth(new Date())))
      setEnd(new Date(endOfMonth(new Date())))
    }

    if(e === 'Año' ) {
      setStart(new Date(startOfYear(new Date())))
      setEnd(new Date(endOfYear(new Date())))
    }
  }

  function addStep() {
    if(period === 'Este mes') {
      setPeriod('Mes')
    }
    if (period === 'Semana') {
      setStart(
        add(start, {weeks: 1})
      )
      setEnd(
        add(end, {weeks: 1})
      )
    }

    if(period === 'Mes' || period === 'Este mes') {
      setStart(
        add(start, {months: 1})
      )
      setEnd(
        endOfMonth(add(start, {months: 1}))
      )
    }

    if(period === 'Año') {
      setStart(
        add(start, {years: 1})
      )
      setEnd(
        endOfMonth(add(end, {years: 1}))
      )
    }

  }

  function subStep() {
    if(period === 'Este mes') {
      setPeriod('Mes')
    }
    if (period === 'Semana') {
      setStart(
        sub(start, {weeks: 1})
      )
      setEnd(
        sub(end, {weeks: 1})
      )
    }

    if(period === 'Mes' || period === 'Este mes') {
      setStart(
        sub(start, {months: 1})
      )
      setEnd(
        endOfMonth(sub(start, {months: 1}))
      )
    }

    if(period === 'Año') {
      setStart(
        sub(start, {years: 1})
      )
      setEnd(
        sub(endOfMonth(start), {years: 1})
      )
    }

  }

  const periodDropdown = (
    <Dropdown onSelect={handlePeriodTags} >
      <Dropdown.Toggle 
      id="dropdown-basic"
      size='sm'
      variant="secondary"
      >
        {period}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="Semana">Semana</Dropdown.Item>
        <Dropdown.Item eventKey="Mes">Mes</Dropdown.Item>
        <Dropdown.Item eventKey="Año">Año</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const periodStart = (
    <div onClick={() => setShowStartCalendar(true)}>
      <Form.Group className="mb-3" >
        <Form.Label>Desde</Form.Label>
      <Form.Control size='sm' placeholder={format(new Date(start), 'dd/MM/yyyy')} disabled />
      </Form.Group>
    
      </div>
  )

  const periodEnd = (
    <div onClick={() => setShowEndCalendar(true)}>
    <Form.Group className="mb-3">
      <Form.Label>Hasta</Form.Label>
    <Form.Control size='sm' placeholder={format(new Date(end), 'dd/MM/yyyy')} disabled />
  </Form.Group>
  </div>
  )

  const periodHeader = (
    <div className="period_selector_container">

          <div className="period_selector_child">
            <img
            onClick={subStep}
            src={leftIcon} />
            {periodDropdown}
            <img
            onClick={addStep}
            src={rightIcon} />
          </div>
    
          <div style={{marginTop: '0.5rem'}} className="period_selector_child">
            {periodStart}
            {periodEnd}
          </div>
    
        </div>
  )

  function CalendarModal(props) { 
    return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Calendar 
        onChange={props.changeFn}
        value={props.startVal}
        locale={'es-ES'}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
    )
}

  return (
    <div>
          {periodHeader}
          <CalendarModal 
          show={showStartCalendar} 
          onHide={() => setShowStartCalendar(false)} 
          changeFn={setStart}
          startVal={start}
          title='Fecha inicio'
          />
          <CalendarModal 
          show={showEndCalendar} 
          onHide={() => setShowEndCalendar(false)} 
          changeFn={setEnd}
          startVal={end}
          title='Fecha fin'
          />
    </div>
  );
}
