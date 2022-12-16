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
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircle';


// ** Demo Tabs Imports
import TabInfo from 'src/views/customers/registerCustomer/TabContact'
import TabAccount from 'src/views/customers/registerCustomer/TabGeneralInfo'
import TabSecurity from 'src/views/customers/registerCustomer/TabPersonalInfo'
import TabProperty from 'src/views/customers/registerCustomer/TabProperty'
import RegisterCustomer from 'src/views/customers'
import TableBasic from 'src/views/tables/TableBasic'
import TabImportDrivers from 'src/views/import-drivers/TabImportDrivers'
import DataArrayIcon from '@mui/icons-material/DataArray';


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

const ImportDrivers = () => {
    // ** State
    const [value, setValue] = useState('import-drivers')

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
                        value='import-drivers'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DataArrayIcon/>
                                <TabName>Importa tus datos</TabName>
                            </Box>
                        }
                    />
                    {/* <Tab
                        value='preview-drivers'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddCircleIcon />
                                <TabName>Previsualizar</TabName>
                            </Box>
                        }
                    /> */}
                </TabList>

                <TabPanel sx={{ p: 0 }} value='import-drivers'>
                    <TabImportDrivers/> 
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='personal-info'>
                    <RegisterCustomer />
                </TabPanel>
            </TabContext>
        </Card>
    )
}

export default ImportDrivers