// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const Tooltip = dynamic(
    () => import('react-leaflet').then(mod => mod.Tooltip),
    { ssr: false })

export default Tooltip;