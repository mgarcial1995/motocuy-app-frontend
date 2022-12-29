// ** React Imports
import { useState, Fragment, useEffect, useContext } from 'react'

import { useRouter } from 'next/router'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'


// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '70rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [typeUserSelected, setTypeUserSelected] = useState('Municipalidad')

  const router = useRouter()


  const [departmentSelected, setDepartmentSelected] = useState(0); //department selected
  const [provinceSelected, setProvinceSelected] = useState(0); //department selected
  const [districtSelected, setDistrictSelected] = useState(0); //district selected
  const [districts, setDistricts] = useState([]); //list of districts;
  const [departments, setDepartments] = useState([]); //list of departments
  const [provincies, setProvincies] = useState([]); //list of provincies
  const [newUser, setNewUser] = useState({ name: "", lastname: "", typeUser: "", sex: "", ruc: "", rzSocial: "", email: "", phoneNumber: "", province: "", department: "", district: "", password: "" }); //

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("userLogged"));

    if (token) {
      if (token.data.typeUser != "Administrador") {
        router.push('401')
      }
    }

    fetch('https://motocuy-app-backend-production.up.railway.app/api/departments/getAllDepartments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setDepartments(response)
      })

    if (provinceSelected != 0) {
      fetch('https://motocuy-app-backend-production.up.railway.app/api/districts/getAllDistricts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ province: provinceSelected })

      })
        .then(res => {
          return res.json();
        })
        .then(response => {
          setDistricts(response)
        })
    }

    if (departmentSelected != 0) {
      fetch('https://motocuy-app-backend-production.up.railway.app/api/provincies/getAllProvincies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ department: departmentSelected })

      })
        .then(res => {
          return res.json();
        })
        .then(response => {
          setProvincies(response)
        })
    }

  }, [departmentSelected, provinceSelected, districtSelected])

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('https://motocuy-app-backend-production.up.railway.app/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.success) {
          router.push('/')
        } else {
          router.push('/register')
        }
      })
  }


  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    setNewUser({ ...newUser, password: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleDepartmentSelection = (event) => {
    setNewUser({ ...newUser, department: event.target.value })
    setProvinceSelected(0);
    setDistrictSelected(0);
    setDepartmentSelected(event.target.value);
  }

  const handleProvinceSelection = (event) => {
    setNewUser({ ...newUser, province: event.target.value })
    setDistrictSelected(0);
    setProvinceSelected(event.target.value);
  }

  const handleDistrictSelection = (event) => {
    setNewUser({ ...newUser, district: event.target.value })
    setDistrictSelected(event.target.value);
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
          <Box sx={{ mb: 1 }}>
            <Typography variant='h7' sx={{ fontWeight: 600 }}>
              Regístrate para empezar a adminstrar
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormControl>
                  <RadioGroup row defaultValue='Municipalidad' onChange={(e) => { setNewUser({ ...newUser, typeUser: e.target.value }); setTypeUserSelected(e.target.value) }} className="login-form-email" aria-label='type-user' name='type-user-radio'>
                    <FormControlLabel value='Municipalidad' label='Soy Municipalidad' control={<Radio />} />
                    <FormControlLabel disabled value='Empresa' label='Soy Empresa' control={<Radio />} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {
                typeUserSelected != 'Municipalidad' ? <>
                <Grid item xs={6}>
                <TextField autoFocus fullWidth value={newUser.rzSocial} onChange={(e) => setNewUser({ ...newUser, rzSocial: e.target.value })} id='rz-social' label='Razón social' />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth value={newUser.ruc} onChange={(e) => setNewUser({ ...newUser, ruc: e.target.value })} type='number' label='RUC' />
              </Grid>
              <Grid item xs={12} >
                <Divider sx={{ marginBottom: 0 }} />
              </Grid> </>: ""
              }

              <Grid item xs={12}>
                <Typography variant='h7' sx={{ fontWeight: 600 }}>
                  Datos de la cuenta
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <TextField autoFocus fullWidth value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} id='name-user' label='Nombres' />
              </Grid>
              <Grid item xs={4}>
                <TextField autoFocus fullWidth value={newUser.lastname} onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })} id='lastname-user' label='Apellidos' />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Sexo</InputLabel>
                  <Select label='Sexo' defaultValue="" value={newUser.sex} onChange={(e) => setNewUser({ ...newUser, sex: e.target.value })}>
                    <MenuItem value='Masculino'>Masculino</MenuItem>
                    <MenuItem value='Femenino'>Femenino</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField autoFocus fullWidth type='email' id='email' label='Email' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              </Grid>
              <Grid item xs={6}>
                <TextField autoFocus fullWidth type='number' id='cel-user' label='Celular' value={newUser.phoneNumber} onChange={(e) => setNewUser({ ...newUser, phoneNumber: e.target.value })} />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    label='Departamento'
                    value={departmentSelected}
                    onChange={handleDepartmentSelection}>
                    <MenuItem value={0}>
                      <em>Seleccionar</em>
                    </MenuItem>
                    {departments.map((department) => {
                      return <MenuItem key={department.departments_id} value={department.departments_id} >
                        {department.name}
                      </MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Provincia</InputLabel>
                  <Select
                    label='Provincia'
                    value={provinceSelected}
                    onChange={handleProvinceSelection}
                    disabled={departmentSelected != 0 ? false : true}
                  >
                    <MenuItem value={0}>
                      <em>Seleccionar</em>
                    </MenuItem>
                    {provincies.map((province) => {
                      return <MenuItem key={province.id} value={province.id} >
                        {province.name}
                      </MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Distrito</InputLabel>
                  <Select
                    label='Distrito'
                    value={districtSelected}
                    onChange={handleDistrictSelection}
                    disabled={provinceSelected != 0 ? false : true}>
                    <MenuItem value={0}>
                      <em>Seleccionar</em>
                    </MenuItem>
                    {districts.map((district) => {
                      return <MenuItem key={district.id} value={district.id} >
                        {district.name}
                      </MenuItem>
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>
                  <OutlinedInput
                    label='Password'
                    value={values.password}
                    id='auth-register-password'
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
                          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button fullWidth onClick={handleLogin} size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                  Registrar
                </Button>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/'>
                  <LinkStyled>Inicia sesión</LinkStyled>
                </Link>
              </Typography>
            </Box>

          </form>
        </CardContent>
      </Card>

    </Box>
  )
}
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
