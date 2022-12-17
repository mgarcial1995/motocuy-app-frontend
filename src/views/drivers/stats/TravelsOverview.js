//** react imports */
import { useEffect, useState, useContext } from 'react';

// ** MUI Imports
import { FilterContext } from 'src/pages/drivers';

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade from '@mui/material/Fade'

import WeeklyTravelsOverview from './overviews/WeeklyTravelsOverview';
import MonthlyTravelsOverview from './overviews/MonthlyTravelsOverview';


import CustomizeOverView from './customize/CustomizeOverview';

const WeeklyOverview = () => {

  const [open, setOpen] = useState(false)
  const [ overviewFormat, setOverViewFormat] = useState('weekly')
 
 

  return (
    <Card>
      <CardHeader
        title={overviewFormat === 'weekly' ? 'Resumen de viajes de la semana': 'Resumen de viajes del mes'}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={          
            <Fade in={open} timeout={700}>
              <CustomizeOverView formatState={{overviewFormat, setOverViewFormat}} />
            </Fade>         
        }
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        {overviewFormat === 'weekly' ? <WeeklyTravelsOverview /> : <MonthlyTravelsOverview/>}
        

      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
