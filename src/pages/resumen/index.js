// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ResumenMap from 'src/views/resumen/ResumenMap'
import PanicEventTable from 'src/views/panicbutton/PanicEventTable'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ResumenChart from 'src/views/resumen/ResumenChart'

import { useRouter } from 'next/router'
import { createContext, useState, useContext } from 'react'

import { userLoggedContext } from '../_app'

export const ProvinceContext = createContext({});

const PanicButton = () => {

    const [provinceSelected, setProvinceSelected] = useState(1501); //department selected

    const router = useRouter()

    const {userLogged, setUserLogged} = useContext(userLoggedContext);

    if(userLogged.typeUser === 'Municipalidad'){
        router.push('401')
    }

    return (
        <ApexChartWrapper>
            <ProvinceContext.Provider
                value={{
                    provinceSelected, setProvinceSelected
                }}
            >
            <Grid container spacing={5}>
                <Grid item xs={5} >
                    <ResumenMap />
                </Grid>
                <Grid item xs={7} >
                    <ResumenChart />
                </Grid>
            </Grid>
            </ProvinceContext.Provider>
        </ApexChartWrapper>
    )
}

export default PanicButton