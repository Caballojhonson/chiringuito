import React from 'react'

export default function Operation(props) {
    const {operation} = props

    const greenText = {color: 'darkgreen'}
    const redText = {color: 'darkred'}
    const textColor = (operation.amount > 0 ? greenText : redText)

    return (
        <div  className='operation_wrapper'>
            <p className='operation operation_concept'>{operation.concept}</p>
            <p style={textColor} className='operation operation_amount'><strong>{Number(operation.amount).toFixed(2)}€</strong></p>
        </div>
    )
}

// "operations": [
//     {
//       "concept": "Apertura",
//       "timestamp": "2022-01-01T14:59:50.086Z",
//       "by": "Caballo",
//       "type": "cash addition",
//       "amount": "200"
//     }
//   ],