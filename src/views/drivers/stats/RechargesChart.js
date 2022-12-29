// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import { FilterContext } from 'src/pages/drivers';
import { useEffect, useState, useContext } from 'react';

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const RechargesChart = () => {
    const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);
    const [dataPerMonth, setDataPerMonth] = useState([]);//data per month


    useEffect(() => {

        fetch('https://motocuy-app-backend-production.up.railway.app/api/payments/getAllPayments', {
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
    console.log(dataPerMonth)
    // ** Hook
    const theme = useTheme()

    const formatData = () => {
        const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

    const dummyData = [28, 29, 33, 36, 32, 32, 33, 34, 39, 36, 32, 32]

    const options = {
        chart: {
            height: 350,
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        title: {
            text: 'Recargas a lo largo del año',
            align: 'left'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: ['En', 'Fb', 'Mr', 'Ab', 'My', 'Jn', 'Jy', 'Ag', 'Sp', 'Oc', 'Nv', 'Dc'],
            title: {
                text: 'Meses'
            }
        },
        yaxis: {
            title: {
                text: 'Recargas'
            },
            min: 5,
            max: 40
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5
        }
    }

    return (
        <Card>
            <CardHeader
                title='Resumen de recargas'
                titleTypographyProps={{
                    sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
                }}
                action={
                    <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
                        <DotsVertical />
                    </IconButton>
                }
            />
            <CardContent    >
                <ReactApexcharts type='line' height={505} options={options} series={[{ name: 'Cantidad', data: formatData() /*or dummyData*/ }]} />
            </CardContent>
        </Card>
    )
}


export default RechargesChart