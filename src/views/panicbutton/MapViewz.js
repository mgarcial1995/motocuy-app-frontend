
import MapContainer from 'src/@core/components/react-leaflet/map-container'
import TileLayer from 'src/@core/components/react-leaflet/tile-layer';
import Polygon from 'src/@core/components/react-leaflet/polygon';
import Tooltip from 'src/@core/components/react-leaflet/tooltip';
import LayerGroup from 'src/@core/components/react-leaflet/layer-group';
import Circle from 'src/@core/components/react-leaflet/circle';

import { districtsData } from '../../../districts';
import { departmentsData } from '../../../departments';
import { provinciesData } from '../../../provincies';

import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback, useMemo } from 'react';

const center = [51.505, -0.09]
const zoom = 13



const DisplayPosition = ({map}) => {
  console.log("hola",map);
  const [position, setPosition] = useState(() => map.getCenter())

  const onClick = useCallback(() => {
    map.setView(center, zoom)
  }, [map])

  const onMove = useCallback(() => {
    setPosition(map.getCenter())
  }, [map])

  useEffect(() => {
    map.on('move', onMove)
    
return () => {
      map.off('move', onMove)
    }
  }, [map, onMove])

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  )
}

const ExternalStateExample = () => {
  const [map, setMap] = useState(null)
 

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  )

  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  )
}

export default ExternalStateExample

