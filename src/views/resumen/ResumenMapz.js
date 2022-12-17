import MapContainer from 'src/@core/components/react-leaflet/map-container'
import TileLayer from 'src/@core/components/react-leaflet/tile-layer';
import Polygon from 'src/@core/components/react-leaflet/polygon';
import Tooltip from 'src/@core/components/react-leaflet/tooltip';
import LayerGroup from 'src/@core/components/react-leaflet/layer-group';
import Circle from 'src/@core/components/react-leaflet/circle';
import Map from 'src/@core/components/react-leaflet/map';
import GeoJSON from 'src/@core/components/react-leaflet/geo-json';

import { districtsData } from '../../../districts';
import { departmentsData } from '../../../departments';
import { provinciesData } from '../../../provincies';

import "leaflet/dist/leaflet.css";
import { useEffect, useState, useCallback } from 'react';

const ResumenMap = () => {


  const [center, setCenter] = useState([-12.04074098821909, -77.04545737172991]);



  const [panicEvents, setPanicEvents] = useState([]);

  useEffect(() => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/panicEvent/getPanicEvent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setPanicEvents(response)
      })

  }, [])

  console.log(center)

  const formatCoordinates = (coordinates) => {

    return [coordinates.split(':')[0], coordinates.split(':')[1]];
  }




  const fillRedOptions = { color: 'red' }

  const onEachDistrict = (district , layer) => {
    layer.bindPopup(district.properties.NOMBDIST);
  }
  
return (
    <div>
      <MapContainer style={{ width: '100vm', height: '100vh' }} zoom={2} center={center}>
        <GeoJSON 
          style={{
            fillColor: "blue",
            fillOpacity: 1,
           
          }} 
          data={
            districtsData.features
          }
          onEachFeature={
            onEachDistrict
          } 
          />
          
      </MapContainer>
    </div>
  )
}

export default ResumenMap