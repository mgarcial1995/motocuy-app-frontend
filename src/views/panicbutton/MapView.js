import MapContainer from 'src/@core/components/react-leaflet/map-container'
import TileLayer from 'src/@core/components/react-leaflet/tile-layer'
import Polygon from 'src/@core/components/react-leaflet/polygon'
import Tooltip from 'src/@core/components/react-leaflet/tooltip'
import LayerGroup from 'src/@core/components/react-leaflet/layer-group'
import Circle from 'src/@core/components/react-leaflet/circle'

import { districtsData } from '../../../districts'
import { departmentsData } from '../../../departments'
import { provinciesData } from '../../../provincies'

import 'leaflet/dist/leaflet.css'
import { useEffect, useState, useCallback } from 'react'

const MapView = () => {
  const [center, setCenter] = useState([-12.1895205, -76.9799053])

  const [panicEvents, setPanicEvents] = useState([])

  useEffect(() => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/panicEvent/getPanicEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json()
      })
      .then(response => {
        setPanicEvents(response)
      })
  }, [])

  console.log(center)

  const formatCoordinates = coordinates => {
    return [coordinates.split(':')[0], coordinates.split(':')[1]]
  }

  const fillRedOptions = { color: 'red' }

  return (
    <>
      <MapContainer center={center} zoom={16} style={{ width: '100vm', height: '100vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {panicEvents.map((event, index) => {
          return <Circle key={index} center={formatCoordinates(event.location)} pathOptions={fillRedOptions} radius={50} />
        })}

        {/* <Circle center={center} pathOptions={fillRedOptions} radius={50} />   */}
        {/* {
                districtsData.features.map((state) => {
                    const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
                    return (
                       <Polygon
                        pathOptions={{
                            fillColor: "blue",
                            fillOpacity: 0.1,
                            weight: 2,
                            opacity: 1,
                            dashArray: 3,
                            color: 'black'
                        }}
                        positions={coordinates}
                       >
                        <Tooltip sticky>{state.properties.NOMBDIST}</Tooltip>
                       </Polygon> 
                    )
                })
            }             */}
      </MapContainer>
      <button
        onClick={() => {
          setCenter([-10.1895205, -76.9799053])
        }}
      >
        Click me{' '}
      </button>
    </>
  )
}

export default MapView
