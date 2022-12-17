// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import DriversTable from 'src/views/drivers/DriversTable'
import DepartmentFilter from 'src/views/drivers/filters/DepartmentFilter'
import ProvinceFilter from 'src/views/drivers/filters/ProvinceFilter'
import DistrictFilter from 'src/views/drivers/filters/DistrictFilter'
import WeeklyOverview from 'src/views/drivers/stats/TravelsOverview'
import DriversCounterCard from 'src/views/drivers/stats/DriversCounterCard'
import ActiveDriversCounterCard from 'src/views/drivers/stats/ActiveDriversCounterCard'
import MotoTypeChart from 'src/views/drivers/stats/MotoTypeChart'
import RechargesChart from 'src/views/drivers/stats/RechargesChart'

//react imports
import { createContext, useState } from 'react'

export const FilterContext = createContext({});


const Drivers = () => {

    const [departmentSelected, setDepartmentSelected] = useState(0); //department selected
    const [provinceSelected, setProvinceSelected] = useState(0); //department selected
    const [districtSelected, setDistrictSelected] = useState(0); //district selected

    return (
        <ApexChartWrapper>
            <FilterContext.Provider
                value={{
                    departmentSelected, setDepartmentSelected,
                    provinceSelected, setProvinceSelected,
                    districtSelected, setDistrictSelected
                }}>
                <Grid container spacing={5}>
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
                        <DriversCounterCard />
                    </Grid>
                    <Grid item xs={4}>
                        <ActiveDriversCounterCard />
                    </Grid>
                    <Grid item xs={4}>
                        {/* <DriversCounterCard /> */}
                    </Grid>
                    <Grid item xs={8.5}>
                        <DriversTable />
                    </Grid>
                    <Grid container item xs={3.5} spacing={5}  >
                        <Grid item xs={12} >
                            <MotoTypeChart />
                        </Grid>
                        <Grid item xs={12} >
                            <WeeklyOverview />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <RechargesChart />
                    </Grid>
                </Grid>
            </FilterContext.Provider>
        </ApexChartWrapper >
    )
}

export default Drivers