import ReactApexcharts from 'src/@core/components/react-apexcharts'

//** react imports */
import { useEffect, useState, useContext } from 'react';
import { FilterContext } from 'src/pages/drivers';


import { useTheme } from '@mui/material/styles'

const WeeklyTravelsOverview = () => {
    const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);

    const [dataPerDay, setDataPerDay] = useState([]);//data per day

    useEffect(() => {

        fetch('https://motocuy-app-backend-production.up.railway.app/api/travels/getTravelsPerDay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department: departmentSelected, province: provinceSelected, district: districtSelected })

        })
            .then(res => {
                return res.json();
            })
            .then(response => {
                setDataPerDay(response)
            })

    }, [departmentSelected, provinceSelected, districtSelected])

    const formatData = () => {
        const data = [0, 0, 0, 0, 0, 0, 0]
        for (let index = 0; index < dataPerDay.length; index++) {
            if (dataPerDay[index].DATE === 'Monday') {
                data[0] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Tuesday') {
                data[1] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Wednesday') {
                data[2] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Thursday') {
                data[3] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Friday') {
                data[4] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Saturday') {
                data[5] = dataPerDay[index].COUNT;
            }
            if (dataPerDay[index].DATE === 'Sunday') {
                data[6] = dataPerDay[index].COUNT;
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
            categories: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
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

export default WeeklyTravelsOverview