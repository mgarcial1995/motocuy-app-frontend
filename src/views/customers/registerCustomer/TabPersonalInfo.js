// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import Phone from 'mdi-material-ui/Phone'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import DatePicker from 'react-datepicker'


// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

// eslint-disable-next-line react/display-name
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Fecha nacimiento' autoComplete='off' />
})

const TabAccount = () => {
  // ** State
  const [date, setDate] = useState(null)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7} >
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo documento</InputLabel>
              <Select label='Status' defaultValue=''>
                <MenuItem value='dni'>DNI</MenuItem>
                <MenuItem value='ruc'>RUC</MenuItem>
                <MenuItem value='carne'>Carné de extranjería</MenuItem>
                <MenuItem value='dnipendiente'>DNI pendiente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type='number'
              label='Documento'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Nacionalidad</InputLabel>
              <Select label='Status' defaultValue=''>
                <MenuItem value='peruana'>Peruana</MenuItem>
                <MenuItem value='otra'>Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Especifique su nacionalidad' disabled='true' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Estado civil</InputLabel>
              <Select label='Status' defaultValue=''>
                <MenuItem value='dni'>Soltero(a)</MenuItem>
                <MenuItem value='ruc'>Conviviente</MenuItem>
                <MenuItem value='carne'>Casado(a)</MenuItem>
                <MenuItem value='dnipendiente'>Divorciado(a)</MenuItem>
                <MenuItem value='dnipendiente'>Viudo(a)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Unidad Matrimonial</InputLabel>
              <Select label='Status' disabled='true'>
                <MenuItem value='ninguno'>Ninguno</MenuItem>
                <MenuItem value='total'>Total</MenuItem>
                <MenuItem value='parcial'>Parcial</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Profesión' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Cargo' />
          </Grid>
          <Grid item xs={12} >
            <Divider sx={{ marginBottom: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              Datos del cónyuge
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo documento</InputLabel>
              <Select label='Status' defaultValue='' disabled='true'>
                <MenuItem value='dni'>DNI</MenuItem>
                <MenuItem value='ruc'>RUC</MenuItem>
                <MenuItem value='carne'>Carné de extranjería</MenuItem>
                <MenuItem value='dnipendiente'>DNI pendiente</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type='number'
              label='Documento'
              disabled='true'
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              disabled='true'
              selected={date}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              id='form-layouts-separator-date'
              onChange={date => setDate(date)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Nacionalidad</InputLabel>
              <Select label='Status' defaultValue='' disabled='true'>
                <MenuItem value='peruana'>Peruana</MenuItem>
                <MenuItem value='otra'>Otra</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Especifique su nacionalidad' disabled='true' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Profesión' disabled='true' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Cargo' disabled='true' />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount