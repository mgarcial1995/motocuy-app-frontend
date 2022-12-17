//** react imports */
import { useEffect, useState, useContext } from 'react';

// ** MUI Imports
import { FilterContext } from 'src/pages/drivers';
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const ActiveDriversCounterCard = () => {

  const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);
  const [activeDriversCounter, setActiveDriversCounter] = useState(0);//list of drivers

  useEffect(() => {

    fetch('https://motocuy-app-backend-production.up.railway.app/api/drivers/getActiveDrivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: departmentSelected, province: provinceSelected, district: districtSelected})

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response[0].active_drivers)
        setActiveDriversCounter(response[0].active_drivers)      
      })

  }, [departmentSelected, provinceSelected, districtSelected])
  
return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(5.75, 5, 5.25)} !important`
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <HelpCircleOutline sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='h7' sx={{ marginBottom: 2.75 }}>
          Total Conductores Activos
        </Typography>
        <Typography variant='h4' sx={{ marginBottom: 6 }}>
          {activeDriversCounter}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ActiveDriversCounterCard
