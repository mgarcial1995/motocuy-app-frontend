// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const GeoJSON = dynamic(
    () => import('react-leaflet').then(mod => mod.GeoJSON),
    { ssr: false })

export default GeoJSON;