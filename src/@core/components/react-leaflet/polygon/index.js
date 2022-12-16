// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const Polygon = dynamic(
    () => import('react-leaflet').then(mod => mod.Polygon),
    { ssr: false })

export default Polygon;