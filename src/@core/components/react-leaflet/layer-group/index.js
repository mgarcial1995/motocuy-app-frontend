// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const LayerGroup = dynamic(
    () => import('react-leaflet').then(mod => mod.LayerGroup),
    { ssr: false })

export default LayerGroup;