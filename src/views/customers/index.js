// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import HomeIcon from '@mui/icons-material/Home';


// ** Demo Tabs Imports
import TabContact from 'src/views/customers/registerCustomer/TabContact'
import TabGeneralInfo from 'src/views/customers/registerCustomer/TabGeneralInfo'
import TabPersonalInfo from 'src/views/customers/registerCustomer/TabPersonalInfo'
import TabProperty from 'src/views/customers/registerCustomer/TabProperty'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const RegisterCustomer = () => {
  // ** State
  const [value, setValue] = useState('general-info')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='general-info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Información General</TabName>
              </Box>
            }
          />
          <Tab
            value='personal-info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Datos personales</TabName>
              </Box>
            }
          />
          <Tab
            value='contact'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocalPhoneOutlinedIcon  />
                <TabName>Contacto</TabName>
              </Box>
            }
          />
          <Tab
            value='property'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon />
                <TabName>Inmueble</TabName>
              </Box>
            }
          />
        </TabList>
        <TabPanel sx={{ p: 0 }} value='general-info'>
          <TabGeneralInfo />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='personal-info'>
          <TabPersonalInfo />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='contact'>
          <TabContact />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='property'>
          <TabProperty />
        </TabPanel>
      </TabContext>
    </Card>
  )
}

export default RegisterCustomer