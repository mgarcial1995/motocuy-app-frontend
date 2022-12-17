// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
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
import DataArrayIcon from '@mui/icons-material/DataArray'
import swal from 'sweetalert';

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

import { userLoggedContext } from 'src/pages/_app'

import { useContext } from 'react'


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

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const TabImportDrivers = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [excelFile, setExcelFile] = useState()

  const { userLogged, setUserLogged } = useContext(userLoggedContext)

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setExcelFile(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const uploadDrivers = (e) => {
    e.preventDefault()
    const formData = new FormData();


    formData.append('file', excelFile);
    formData.append('department', userLogged.department);
    formData.append('province', userLogged.province);
    formData.append('district', userLogged.district);

    fetch('https://motocuy-app-backend-production.up.railway.app/api/drivers/postDriver', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response)
        if (response.status === "OK") {
          swal({
            title: "Conductores subidos correctamente",
            icon: "success",
            button: "Aceptar",
          });
        } else {
          swal({
            title: "Error al subir los conductores",
            icon: "error",
            button: "Aceptar",
          });
        }
      })

  }


  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box >
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Subir lista de conductores
                  <input
                    hidden
                    type='file'
                    onChange={(e) => setExcelFile(e.target.files[0])}
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                {/* <ResetButtonStyled color='error' variant='outlined' onClick={() => setExcelFile()}>
                  Reset
                </ResetButtonStyled> */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  <Typography variant='body2' sx={{ marginRight: 1, marginTop: 5 }}>
                    Solo se permite subir archivos .xlsx.
                  </Typography>
                  <Typography variant='body2' sx={{ marginRight: 1, marginTop: 5 }}>
                    Descarga la plantilla de datos
                  </Typography>
                  <Typography variant='body2' sx={{ marginTop: 5 }}>
                    <Link passHref href='https://www.google.com/search?q=excel+tablas+dinamicas&sxsrf=ALiCzsbK64HWl_j852uyPJZd8D89sVOxUw:1664006633248&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjX-Jzi-6z6AhUDFLkGHWWmCaoQ_AUoAnoECAIQBA&biw=1536&bih=722&dpr=1.25#imgrc=S0bXbyMlNKuKpM'>
                      <LinkStyled>aquí</LinkStyled>
                    </Link>
                  </Typography>

                </Box>
              </Box>
            </Box>
          </Grid>



          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={(e) => { uploadDrivers(e) }}>
              Subir
            </Button>
            <Button type='reset' variant='outlined' color='secondary' >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabImportDrivers

