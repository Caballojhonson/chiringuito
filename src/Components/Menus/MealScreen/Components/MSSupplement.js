import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


export default function MSSupplement(props) {
    const {concept, percentage, } = props

    const containerStyle = {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0.5rem 1rem 0.5rem 1rem',
	};
    
  return (
    <div style={containerStyle}>
			<Grid container>
				<Grid item xs={3} >
					<Box >
						<Typography variant="subtitle2"></Typography>
					</Box>
				</Grid>
				<Grid item xs={7} >
					<Typography variant="body2"></Typography>
				</Grid>


				<Grid item xs={2}>
					<Box>
						<Typography variant="subtitle2"></Typography>
					</Box>
				</Grid>

			</Grid>
		</div>
  )
}
