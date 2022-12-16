// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const Map = dynamic(
    () => import('react-leaflet').then(mod => mod.Map),
    { ssr: false })

export default Map;