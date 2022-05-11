import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Changelog() {
    const chlog = [
        '- Nueva sección de escandallos',
        '- Caballojhonson empleado del mes por no hacer absolutamente nada',
        '- Nuevo panel lateral ahí arriba a la izquierda. Ya lo pondré en todas partes',
        '- Arreglado infinito alquiler',
        '- Roto alquiler (Lo del gato de schrodinger)',
        '- Mañana será otro día',
        '- Nueva pantalla de referencias carta',
        '- Nueva vista de elementos de carta',
    ]

  return (
    <Box sx={{display: 'flex', flexDirection:'column', m: '2rem'}}>
        <Typography variant='h5' sx={{mb:2}}>
            Changelog
        </Typography>
        {chlog.map(item => {
            return(
                <Typography variant='subtitle2' key={item} sx={{width: '100%', m:0.5}}>
                    {item}
                </Typography>
            )
        })}
    </Box>
  )
}
