// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const MapContainer = dynamic(
    () => import('react-leaflet').then(mod => mod.MapContainer),
    { ssr: false })


export default MapContainer