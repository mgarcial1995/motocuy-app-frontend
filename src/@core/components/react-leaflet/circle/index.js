// ** Next Import
import dynamic from 'next/dynamic'

// ! To avoid 'Window is not defined' error
const Circle = dynamic(
    () => import('react-leaflet').then(mod => mod.Circle),
    { ssr: false })

export default Circle;