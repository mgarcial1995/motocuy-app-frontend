import { useEffect, useState, useContext } from 'react';

//import context
import { FilterContext } from 'src/pages/drivers';

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import { Modal } from '@mui/material'
import { Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles'



import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PaidIcon from '@mui/icons-material/Paid';







const DriversTable = () => {
  //states 
  const [open, setOpen] = useState(false);
  const [drivers, setDrivers] = useState([]);//list of drivers
  const [driver, setDriver] = useState("");//current driver
  const [travelsDriver, setTravelsDriver] = useState([]);//travels drivers
  const [paymentsDriver, setPaymentsDriver] = useState([]);//payments drivers

  const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);


  useEffect(() => {

    fetch('https://motocuy-app-backend-production.up.railway.app/api/drivers/getAllDrivers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: departmentSelected, province: provinceSelected, district: districtSelected })

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(departmentSelected)
        setDrivers(response)
      })

  }, [departmentSelected, provinceSelected, districtSelected])

  const fetchDriver = (driverId) => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/drivers/getDriver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ driver: "'" + driverId + "'" }),

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setDriver(response);
      })
  }

  const fetchTravels = (placa) => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/travels/getTravelsPerDriver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placa: "'" + placa + "'" }),

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setTravelsDriver(response);
        console.log(response);
      })
  }

  const fetchPayments = (idDriver) => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/payments/getPaymentsPerDriver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_firebase: "'" + idDriver + "'" }),

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        setPaymentsDriver(response);
      })
  }

  const handleOpen = (driverId, placa_car, idDriver) => {
    fetchDriver(driverId);
    fetchTravels(placa_car);
    fetchPayments(idDriver);

    setOpen(true);
  }

  const handleClose = () => {
    setDriver("");
    setTravelsDriver("");
    setPaymentsDriver("");
    setOpen(false);
  }

  const theme = useTheme()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 6,
  };

  return (

    // ** State
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Licencia</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Fecha creación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {drivers.map(driver => (
              <TableRow hover key={driver.license} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{driver.fullname}</Typography>
                    <Typography variant='caption'>{driver.company}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{driver.license}</TableCell>
                <TableCell>{driver.phone_contact}</TableCell>
                <TableCell>{driver.create_at}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <IconButton onClick={() => { handleOpen(driver.id_firebase, driver.placa_car, driver.id_firebase) }} aria-label="view">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Grid container spacing={6}>
                  <Grid item xs={5}>
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                      {driver == "" ? "" : driver[0].fullname}
                    </Typography>
                    <Typography id="modal-modal-title" variant="body2" component="h2">
                      {driver == "" ? "" : driver[0].company}
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Grid item xs={2.3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="DNI" placement="left">
                        <AssignmentIndIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Tooltip>
                      <Typography id="modal-modal-title" sx={{ marginLeft: "10px" }} variant="body2">
                        {driver == "" ? "" : driver[0].document}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Licencia" placement="left">
                        <FolderSharedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Tooltip>
                      <Typography id="modal-modal-title" sx={{ marginLeft: "10px" }} variant="body2">
                        {driver == "" ? "" : driver[0].license}
                      </Typography>
                    </Box>

                  </Grid>
                  <Grid item xs={2.3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Placa" placement="left">
                        <SportsMotorsportsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Tooltip>
                      <Typography id="modal-modal-title" sx={{ marginLeft: "10px" }} variant="body2">
                        {driver == "" ? "" : driver[0].placa_car}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Celular" placement="left">
                        <LocalPhoneIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Tooltip>
                      <Typography id="modal-modal-title" sx={{ marginLeft: "10px" }} variant="body2">
                        {driver == "" ? "" : driver[0].phone_contact}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2.3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Crédito" placement="left">
                        <PaidIcon  sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                      </Tooltip>
                      <Typography id="modal-modal-title" sx={{ marginLeft: "10px" }} variant="body2">
                        {driver == "" ? "" : driver[0].credit}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h6">
                      Historial de Viajes
                    </Typography>
                    <TableContainer >
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Destino</TableCell>
                            <TableCell>Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          { travelsDriver === "" ? "" : travelsDriver.map((travel) => (
                            <TableRow hover key={travel.create_at} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                              <TableCell>{travel.create_at}</TableCell>
                              <TableCell>{travel.origen}</TableCell>
                              <TableCell>{travel.destino}</TableCell>
                              <TableCell>{travel.precio}</TableCell>
                            </TableRow>)
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography id="modal-modal-title" variant="h6">
                      Historial de Recargas
                    </Typography>
                    <TableContainer >
                      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                        <TableHead>
                          <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Origen</TableCell>
                            <TableCell>Destino</TableCell>
                            <TableCell>Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          { paymentsDriver === "" ? "" : paymentsDriver.map(payment=> (
                            <TableRow hover key={payment.date_approved} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                              <TableCell>{payment.date_approved}</TableCell>
                              <TableCell>{payment.transaction_amount}</TableCell>
                            </TableRow>)
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={8}>
                  </Grid>
                  <Grid item xs={4}>
                  <Typography variant="h6">TOTAL RECARGAS: </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Modal>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={drivers.length}
        rowsPerPage={5}
      />
    </Card>
  )
}

export default DriversTable