import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderStatsCalculations from './Components/OrderStatsCalculations'

export default function OrderStatScreen() {
    const [stats, setStats] = useState('')

  return (
    <div>
        <OrderStatsCalculations setState={setStats} stats={stats} />
        <List>
            {stats && stats.itemTotalsSorted.map(item => {
                return(
                    <ListItem sx={{display: 'flex'}} key={item.name}>
                        <ListItemText>{item.name}</ListItemText> 
                        <ListItemText>{item.quantity}</ListItemText> 
                        </ListItem>
                )
            })}
        </List>
        </div>
  )
}
