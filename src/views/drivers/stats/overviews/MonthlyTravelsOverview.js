import ReactApexcharts from 'src/@core/components/react-apexcharts'

//** react imports */
import { useEffect, useState, useContext } from 'react';
import { FilterContext } from 'src/pages/drivers';


import { useTheme } from '@mui/material/styles'

const MonthlyTravelsOverview = () => {
    const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);
    const [dataPerMonth, setDataPerMonth] = useState([]);//data per day

    useEffect(() => {

        fetch('https://motocuy-app-backend-production.up.railway.app/api/travels/getTravelsPerMonth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department: departmentSelected, province: provinceSelected, district: districtSelected })

        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                setDataPerMonth(response)
            })

    }, [departmentSelected, provinceSelected, districtSelected])

    const formatData = () => {
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0]
        for (let index = 0; index < dataPerMonth.length; index++) {
            if (dataPerMonth[index].DATE === 'January') {
                data[0] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'February') {
                data[1] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'March') {
                data[2] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'April') {
                data[3] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'May') {
                data[4] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'June') {
                data[5] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'July') {
                data[6] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'August') {
                data[7] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'September') {
                data[8] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'October') {
                data[9] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'November') {
                data[10] = dataPerMonth[index].COUNT;
            }
            if (dataPerMonth[index].DATE === 'December') {
                data[11] = dataPerMonth[index].COUNT;
            }
        }
        
return data
    }

    // ** Hook
    const theme = useTheme()

    const options = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                borderRadius: 9,
                distributed: true,
                columnWidth: '40%',
                endingShape: 'rounded',
                startingShape: 'rounded'
            }
        },
        stroke: {
            width: 2,
            colors: [theme.palette.background.paper]
        },
        legend: { show: false },
        grid: {
            strokeDashArray: 7,
            padding: {
                top: -1,
                right: 0,
                left: -12,
                bottom: 5
            }
        },
        dataLabels: { enabled: false },
        colors: [
            theme.palette.primary.main,
        ],
        states: {
            hover: {
                filter: { type: 'none' }
            },
            active: {
                filter: { type: 'none' }
            }
        },
        xaxis: {
            categories: ['En', 'Fb', 'Mr', 'Ab', 'My', 'Jn', 'Jy', 'Ag', 'Sp', 'Oc', 'Nv', 'Dc'],
            tickPlacement: 'on',
            labels: { show: true },
            axisTicks: { show: false },
            axisBorder: { show: false }
        },
        yaxis: {
            show: true,
            tickAmount: 4,
            labels: {
                offsetX: -17,
                formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
            }
        }
    }

    return (
        <ReactApexcharts type='bar' height={205} options={options} series={[{ name: 'Viajes', data: formatData() }]} />
    )
}

export default MonthlyTravelsOverview