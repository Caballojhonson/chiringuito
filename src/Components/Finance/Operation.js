import React from 'react'

export default function Operation(props) {
    const {operation} = props

    return (
        <div  className='operation_wrapper'>
            <p className='operation operation_concept'>{operation.concept}</p>
            <p className='operation operation_amount'><strong>{operation.amount}€</strong></p>
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