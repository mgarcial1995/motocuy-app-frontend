import { useEffect, useState, useContext } from 'react';

//import context
import { FilterContext } from 'src/pages/passengers';


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
    id: 'fullname',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'birthday',
    numeric: true,
    disablePadding: false,
    label: 'Fecha Nacimiento',
  },
  {
    id: 'number_phone',
    numeric: true,
    disablePadding: false,
    label: 'Celular',
  },
  {
    id: 'create_at',
    numeric: true,
    disablePadding: false,
    label: 'Fecha creación',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Aciones',
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
            align="center"
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



export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [open, setOpen] = useState(false);
  const [passengers, setPassengers] = useState([]);//list of passengers
  const [passenger, setPassenger] = useState("");//current passenger
  const [travelsPassenger, setTravelsPassenger] = useState([]);//travels passenger


  const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);


  useEffect(() => {
    fetch('https://motocuy-app-backend-production.up.railway.app/api/passengers/getAllPassengers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ department: departmentSelected, province: provinceSelected, district: districtSelected })

    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(departmentSelected)
        setPassengers(response)
      })

  }, [departmentSelected, provinceSelected, districtSelected])

//   const fetchDriver = (driverId) => {
//     fetch('https://motocuy-app-backend-production.up.railway.app/api/drivers/getDriver', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ driver: "'" + driverId + "'" }),

//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(response => {
//         setDriver(response);
//       })
//   }
//   const fetchTravels = (placa) => {
//     fetch('https://motocuy-app-backend-production.up.railway.app/api/travels/getTravelsPerDriver', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ placa: "'" + placa + "'" }),

//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(response => {
//         setTravelsDriver(response);
//         console.log(response);
//       })
//   }
//   const fetchPayments = (idDriver) => {
//     fetch('https://motocuy-app-backend-production.up.railway.app/api/payments/getPaymentsPerDriver', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ id_firebase: "'" + idDriver + "'" }),

//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(response => {
//         setPaymentsDriver(response);
//       })
//   }

  const handleOpen = (driverId, placa_car, idDriver) => {
    fetchDriver(driverId);
    fetchTravels(placa_car);
    fetchPayments(idDriver);

    setOpen(true);
  }

  const theme = useTheme()

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - passengers.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
              {stableSort(passengers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((passenger, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={passenger.id_firebase}
                    >

                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {passenger.fullname}
                      </TableCell>
                      <TableCell align="center">{passenger.birthday}</TableCell>
                      <TableCell align="center">{passenger.number_phone}</TableCell>
                      <TableCell align="center">{passenger.create_at.split('T')[0]}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={2}>
                          <IconButton aria-label="view">
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>

                    </TableRow>
                  );
                })}
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
          count={passengers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  );
}