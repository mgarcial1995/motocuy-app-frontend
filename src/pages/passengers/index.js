// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import PassengersTable from 'src/views/passengers/PassengersTable'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'


import DepartmentFilter from 'src/views/passengers/filters/DepartmentFilter'
import ProvinceFilter from 'src/views/passengers/filters/ProvinceFilter'
import DistrictFilter from 'src/views/passengers/filters/DistrictFilter'
import PassengersCounterCard from 'src/views/passengers/stats/PassengersCounterCard'
import { useRouter } from 'next/router'

import { createContext, useState, useContext } from 'react'
import { userLoggedContext } from '../_app'

export const FilterContext = createContext({});


const Passengers = () => {
    const [departmentSelected, setDepartmentSelected] = useState(0); //department selected
    const [provinceSelected, setProvinceSelected] = useState(0); //department selected
    const [districtSelected, setDistrictSelected] = useState(0); //district selected


    const router = useRouter()

    const {userLogged, setUserLogged} = useContext(userLoggedContext);

    if(userLogged.typeUser === 'Municipalidad'){
        router.push('401')
      }

    return (
        <ApexChartWrapper>
            <FilterContext.Provider
                value={{
                    departmentSelected, setDepartmentSelected,
                    provinceSelected, setProvinceSelected,
                    districtSelected, setDistrictSelected
                }}>
                <Grid container spacing={6}>
                    <Grid item xs={3}>
                        <DepartmentFilter />
                    </Grid>
                    <Grid item xs={3}>
                        <ProvinceFilter />
                    </Grid>
                    <Grid item xs={3}>
                        <DistrictFilter />
                    </Grid>
                    <Grid item xs={4}>
                        <PassengersCounterCard />
                    </Grid>

                    <Grid item xs={12}>
                        <PassengersTable />
                    </Grid>
                </Grid>
            </FilterContext.Provider>
        </ApexChartWrapper>
    )
}

export default Passengers