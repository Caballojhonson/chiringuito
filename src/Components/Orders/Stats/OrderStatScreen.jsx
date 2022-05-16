import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDb } from '../../../DbContext'
import OrderStatsCalculations from './Components/OrderStatsCalculations'
import ItemLineChart from './ItemLineChart'
import TotalItemsBoughtList from './TotalItemsBoughtList'
import Backdrop from '@mui/material/Backdrop';

import CircularProgress from '@mui/material/CircularProgress';



export default function OrderStatScreen() {
    const [stats, setStats] = useState('')
    const db = useDb()

  return (
    <div>
        <Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={db ? false : true}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
        <OrderStatsCalculations setState={setStats} stats={stats} db={db} />
        {db && stats.itemTotalsSorted && <TotalItemsBoughtList items={stats.itemTotalsSorted} />}
        <ItemLineChart  />
        </div>
  )
}
