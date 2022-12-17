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

import DriverDetails from '../DriverDetails';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    
return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        
return a[1] - b[1];
    });
    
return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'create_at',
        numeric: false,
        disablePadding: true,
        label: 'Fecha',
    },
    {
        id: 'origen',
        numeric: true,
        disablePadding: false,
        label: 'Origen',
    },
    {
        id: 'destino',
        numeric: true,
        disablePadding: false,
        label: 'Destino',
    },
    {
        id: 'precio',
        numeric: true,
        disablePadding: false,
        label: 'Precio',
    },
];

function EnhancedTableHead(props) {

    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};



export default function HistoryTravelsDriverTable(props) {


    const { travels } = props;

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const [open, setOpen] = useState(false);
    const [drivers, setDrivers] = useState([]);//list of drivers
    const [driver, setDriver] = useState("");//current driver
    const [travelsDriver, setTravelsDriver] = useState([]);//travels drivers
    const [paymentsDriver, setPaymentsDriver] = useState([]);//payments drivers



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - travels.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
           
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            { travels != "" ? stableSort(travels, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((travel, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    
return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >

                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {travel.create_at}
                                            </TableCell>
                                            <TableCell align="right">{travel.origen}</TableCell>
                                            <TableCell align="right">{travel.destino}</TableCell>
                                            <TableCell align="right">{travel.precio}</TableCell>
                                            

                                        </TableRow>
                                    );
                                }):""}
                            <DriverDetails showModal={{ open, setOpen }} driver={{ driver, setDriver }} travels={{ travelsDriver, setTravelsDriver }} payments={{ paymentsDriver, setPaymentsDriver }} />
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={5}
                    component="div"
                    count={travels.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
        </Box>
    );
}