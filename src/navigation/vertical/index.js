// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import { AccountCircleOutline } from 'mdi-material-ui'
import ApartmentIcon from '@mui/icons-material/Apartment';
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined'
import AssessmentIcon from '@mui/icons-material/Assessment';
import FolderSharedIcon from '@mui/icons-material/FolderShared'
import UpcomingIcon from '@mui/icons-material/Upcoming';
import PublicIcon from '@mui/icons-material/Public';

import { userLoggedContext } from '../../pages/_app'
import { useEffect, useContext } from 'react'

const navigation = () => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userLogged, setUserLogged } = useContext(userLoggedContext)

  const verticalRoutes = [
    {
      sectionTitle: 'Opciones'
    },
    {
      title: 'Importar conductores',
      icon: FolderSharedIcon,
      path: '/import-drivers'
    },
    {
      title: 'Conductores',
      icon: SportsMotorsportsOutlinedIcon,
      path: '/drivers',
    },    
    {
      title: 'Botón de pánico',
      icon: UpcomingIcon,
      path: '/panicbutton',
    },

  ]

  if (userLogged.typeUser == 'Administrador') {
    verticalRoutes.push(
      {
        sectionTitle: 'Administrador'
      },
      {
        title: 'Pasajeros',
        icon: AccountCircleOutline,
        path: '/passengers',
      },      
      {
        title: 'Resumen',
        icon: PublicIcon,
        path: '/resumen',
      })
  }

  return verticalRoutes;
}

export default navigation
