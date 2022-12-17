// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'



// eslint-disable-next-line react/display-name
const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabInfo = () => {
    // ** State
    const [date, setDate] = useState(null)

    return (
        <CardContent>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Moneda</InputLabel>
                            <Select label='Moneda' defaultValue='soles'>
                                <MenuItem value='soles'>Soles</MenuItem>
                                <MenuItem value='dolares'>Dólares</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth type='number' label='Valor mínimo' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth type='number' label='Valor máximo' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Tipo medida</InputLabel>
                            <Select label='Tipo medida' defaultValue='m2'>
                                <MenuItem value='m2'>m2.</MenuItem>
                                <MenuItem value='has'>Has</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth type='number' label='Área úlil mínimo' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth type='number' label='Área úlil máximo' />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <InputLabel>Categoría</InputLabel>
                            <Select label='Categoria'>
                                <MenuItem value='casa'>Casa</MenuItem>
                                <MenuItem value='terreno'>Terreno</MenuItem>
                                <MenuItem value='departamento'>Departamento</MenuItem>
                                <MenuItem value='proyecto'>Proyecto</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2.6}>
                        <FormControl fullWidth>
                            <InputLabel>Num habitaciones</InputLabel>
                            <Select label='Num habitaciones' defaultValue='cero'>
                                <MenuItem value='cero'>00</MenuItem>
                                <MenuItem value='uno'>01</MenuItem>
                                <MenuItem value='dos'>02</MenuItem>
                                <MenuItem value='tres'>03</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2.6}>
                        <FormControl fullWidth>
                            <InputLabel>Num garajes</InputLabel>
                            <Select label='Num garajes' defaultValue='cero'>
                                <MenuItem value='cero'>00</MenuItem>
                                <MenuItem value='uno'>01</MenuItem>
                                <MenuItem value='dos'>02</MenuItem>
                                <MenuItem value='tres'>03</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2.8}>
                        <TextField fullWidth label='Ocupación' />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained' sx={{ marginRight: 3.5 }}>
                            Save Changes
                        </Button>
                        <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CardContent>
    )
}

export default TabInfo