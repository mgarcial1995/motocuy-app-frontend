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
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'



import Icons from 'src/pages/icons'
import ListIcons from 'src/views/lists/ListIcons'


//**MUI ICONS
import { HouseOutlined } from '@mui/icons-material' 


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const CustomInput = forwardRef((props, ref) => {
    return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

const TabDetails = () => {
    // ** State
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <ListIcons/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant='contained' sx={{ marginRight: 3.5 }}>
                                Save Changes
                            </Button>
                            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
                                Reset
                            </Button>
                            <Button onClick={handleOpen}>Open modal</Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography id="modal-modal-title" variant="h5" component="h2">
                                        Añade una nueva etiqueta
                                    </Typography>
                                    <Grid container spacing={7}>
                                        <Grid item xs={12} >
                                            <Divider sx={{ marginBottom: 0 }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label='Nombre' placeholder='Espacio para estacionamiento' />
                                        </Grid>
                                        <Grid item xs={12} >
                                            <TextField
                                                fullWidth
                                                multiline
                                                label='Descripción'
                                                minRows={2}
                                                placeholder='Cuenta con espacio para... '
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Icons />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Modal>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>

        </>
    )
}

export default TabDetails