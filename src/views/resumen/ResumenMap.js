import MapContainer from 'src/@core/components/react-leaflet/map-container'
import TileLayer from 'src/@core/components/react-leaflet/tile-layer'
import Polygon from 'src/@core/components/react-leaflet/polygon'
import Tooltip from 'src/@core/components/react-leaflet/tooltip'
import LayerGroup from 'src/@core/components/react-leaflet/layer-group'
import Circle from 'src/@core/components/react-leaflet/circle'

import { districtsData } from '../../../districts'
import { departmentsData } from '../../../departments'
import { provinciesData } from '../../../provincies'
import { ProvinceContext } from 'src/pages/resumen'

import 'leaflet/dist/leaflet.css'
import { useEffect, useState, useCallback, useContext } from 'react'

const ResumenMap = () => {
  const [center, setCenter] = useState([-12.04074098821909, -77.04545737172991])
  const { provinceSelected, setProvinceSelected } = useContext(ProvinceContext)

  const HandleChart = ubi => {
    setProvinceSelected(ubi)
  }

  const fillRedOptions = { color: 'red' }

  return (
    <>
      <MapContainer center={center} zoom={11} style={{ width: '100vm', height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {provinciesData.features.map((state, ind) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]])
          
return (
            <Polygon
              key={ind}
              pathOptions={{
                fillColor: 'blue',
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                dashArray: 0,
                color: 'black'
              }}
              positions={coordinates}
              eventHandlers={{
                // mouseover: (e) => {
                //   const layer = e.target;
                //   layer.setStyle({
                //     fillOpacity: 0.8,
                //     weight: 2,
                //     dashArray: 0,
                //     color: 'black'
                //   })
                // },
                // mouseout: (e) => {
                //   const layer = e.target;
                //   layer.setStyle({
                //     fillOpacity: 0.5,
                //     weight: 2,
                //     dashArray: 0,
                //     color: 'black'
                //   })
                // },
                click: () => {
                  HandleChart(state.properties.FIRST_IDPR)
                }
              }}
            >
              <Tooltip sticky>{state.properties.NOMBPROV}</Tooltip>
            </Polygon>
          )
        })}
      </MapContainer>
    </>
  )
}

export default ResumenMap
