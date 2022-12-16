// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const TileLayer = dynamic(
    () => import('react-leaflet').then(mod => mod.TileLayer),
    { ssr: false })

export default TileLayer;