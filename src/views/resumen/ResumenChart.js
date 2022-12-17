import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { useEffect, useState, useCallback, useContext } from 'react';
import { ProvinceContext } from 'src/pages/resumen';

import { useTheme } from '@mui/material/styles'

const ResumenChart = () => {

    const { provinceSelected, setProvinceSelected } = useContext(ProvinceContext);

    const [travels, setTravels] = useState([]);

    useEffect(() => {
        fetch('https://motocuy-app-backend-production.up.railway.app/api/travels/getTravelsPerDistrict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ province: provinceSelected})
    
        })
          .then(res => {
            return res.json();
          })
          .then(response => {
            setTravels(response)
          })
    
      }, [provinceSelected])

    const categories = [];
    const data = []
    for (const travel of travels) {
        categories.push(travel.name)
        data.push(travel.viajes)
    }
    console.log(categories)
    console.log(data)

    


    const options = {
       
            chart: {
              type: 'bar',
              height: 500
            },
            plotOptions: {
              bar: {
                borderRadius: 4,
                horizontal: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: categories
            }
          
    }

    return (
        <ReactApexcharts type='bar' options={options} series={[{ name: 'Viajes', data: data }]} />
    )
}

export default ResumenChart