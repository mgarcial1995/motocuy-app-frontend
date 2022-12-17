// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import MapView from 'src/views/panicbutton/MapView'
import PanicEventTable from 'src/views/panicbutton/PanicEventTable'


const PanicButton = () => {

    return (

        <Grid container spacing={5}>
            <Grid item xs={12} >
                <MapView />
            </Grid>
            {/* <Grid item xs={8} >
                <PanicEventTable />
            </Grid> */}
        </Grid>
    )
}

export default PanicButton