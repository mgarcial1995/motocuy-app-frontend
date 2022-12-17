import { useEffect, useState, useContext } from 'react';

//import context
import { FilterContext } from 'src/pages/drivers';


import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import { Modal } from '@mui/material'
import { Divider } from '@mui/material';


import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PaidIcon from '@mui/icons-material/Paid';


import HistoryTravelsDriverTable from './histories/HistoryTravelsDriverTable';

import Histories from './histories';

const DriverDetails = (props) => {

    const { open, setOpen } = props.showModal;
    const { driver, setDriver } = props.driver;//current driver
    const { travelsDriver, setTravelsDriver } = props.travels;//travels drivers
    const { paymentsDriver, setPaymentsDriver } = props.payments ;//payments drivers

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
                            <PaidIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
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
                    <Histories travels={travelsDriver}/>
                </Grid>
                {/* <Grid item xs={12}>
                    <Typography id="modal-modal-title" variant="h6">
                        Historial de Viajes
                    </Typography>
                    <HistoryTravelsDriverTable travels={travelsDriver} />
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
                                {paymentsDriver === "" ? "" : paymentsDriver.map(payment => (
                                    <TableRow hover key={payment.date_approved} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                                        <TableCell>{payment.date_approved}</TableCell>
                                        <TableCell>{payment.transaction_amount}</TableCell>
                                    </TableRow>)
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> */}
                <Grid item xs={8}>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">TOTAL RECARGAS: </Typography>
                </Grid>
            </Grid>
        </Box>
    </Modal>
    )
}

export default DriverDetails;