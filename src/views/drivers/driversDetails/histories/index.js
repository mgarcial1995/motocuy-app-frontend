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
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import AddCardIcon from '@mui/icons-material/AddCard';


// ** Demo Tabs Imports
import HistoryTravelsDriverTable from './HistoryTravelsDriverTable'



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

const Histories = (props) => {
    const { travels } = props;
    console.log(travels)

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
                                <AirlineSeatReclineExtraIcon />
                                <TabName>Viajes</TabName>
                            </Box>
                        }
                    />
                    <Tab
                        value='personal-info'
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AddCardIcon />
                                <TabName>Recargas</TabName>
                            </Box>
                        }
                    />     
                </TabList>
                <TabPanel sx={{ p: 0 }} value='general-info'>
                        <HistoryTravelsDriverTable travels={travels} />
                </TabPanel>
                <TabPanel sx={{ p: 0 }} value='personal-info'>

                </TabPanel>
            </TabContext>
        </Card>
    )
}

export default Histories