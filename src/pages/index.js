// ** React Imports
import { useState, useContext } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

import { userLoggedContext } from './_app'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const {userLogged, setUserLogged} = useContext(userLoggedContext);
  const [user, setUser] = useState({ email: '', password: '' });

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://motocuy-app-backend-production.up.railway.app/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.success) {
          localStorage.setItem('userLogged', JSON.stringify(response))
          setUserLogged({ logged: true, typeUser: response.data.typeUser })
          if (response.data.type === "Administrador") {
            router.push('/drivers')
          } else {
            router.push('/import-drivers')
          }
        } else {
          
        }
      })
  }

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    setUser({ ...user, password: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              width={55}
              height={55} src='/images/logos/motocuy_full_logo.png'
              minHeight={100} />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              MotocuyApp
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido al adminstrador de Motocuy
            </Typography>
            <Typography variant='body2'>Por favor inicia sesión</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField autoFocus fullWidth id='email' label='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}  sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel   htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel control={<Checkbox />} label='Remember Me' />
              <Link passHref href='/'>
                <LinkStyled onClick={e => e.preventDefault()}>¿Olvidaste tu contraseña?</LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                ¿Eres nuevo(a)?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/register'>
                  <LinkStyled>Crear una cuenta</LinkStyled>
                </Link>
              </Typography>
            </Box>

          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage

// // ** MUI Imports
// import Grid from '@mui/material/Grid'

// // ** Icons Imports
// import Poll from 'mdi-material-ui/Poll'
// import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
// import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
// import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// // ** Custom Components Imports
// import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// // ** Styled Component Import
// import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// // ** Demo Components Imports
// import Table from 'src/views/dashboard/Table'
// import Trophy from 'src/views/dashboard/Trophy'
// import TotalEarning from 'src/views/dashboard/TotalEarning'
// import StatisticsCard from 'src/views/dashboard/StatisticsCard'
// import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
// import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
// import SalesByCountries from 'src/views/dashboard/SalesByCountries'

// const Dashboard = () => {
//   return (
//     <ApexChartWrapper>
//       <Grid container spacing={6}>
//         <Grid item xs={12} md={4}>
//           <Trophy />
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <StatisticsCard />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <WeeklyOverview />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <TotalEarning />
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <Grid container spacing={6}>
//             <Grid item xs={6}>
//               <CardStatisticsVerticalComponent
//                 stats='$25.6k'
//                 icon={<Poll />}
//                 color='success'
//                 trendNumber='+42%'
//                 title='Total Profit'
//                 subtitle='Weekly Profit'
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <CardStatisticsVerticalComponent
//                 stats='$78'
//                 title='Refunds'
//                 trend='negative'
//                 color='secondary'
//                 trendNumber='-15%'
//                 subtitle='Past Month'
//                 icon={<CurrencyUsd />}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <CardStatisticsVerticalComponent
//                 stats='862'
//                 trend='negative'
//                 trendNumber='-18%'
//                 title='New Project'
//                 subtitle='Yearly Project'
//                 icon={<BriefcaseVariantOutline />}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <CardStatisticsVerticalComponent
//                 stats='15'
//                 color='warning'
//                 trend='negative'
//                 trendNumber='-18%'
//                 subtitle='Last Week'
//                 title='Sales Queries'
//                 icon={<HelpCircleOutline />}
//               />
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid item xs={12} md={6} lg={4}>
//           <SalesByCountries />
//         </Grid>
//         <Grid item xs={12} md={12} lg={8}>
//           <DepositWithdraw />
//         </Grid>
//         <Grid item xs={12}>
//           <Table />
//         </Grid>
//       </Grid>
//     </ApexChartWrapper>
//   )
// }

// export default Dashboard
