import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from 'src/pages/drivers';


const DepartmentFilter = () => {

    const { departmentSelected, setDepartmentSelected } = useContext(FilterContext);
    const [departments, setDepartments] = useState([]); //list of departments
    const [userAdmin, setUserAdmin] = useState(false);

    

    useEffect(() => {

        let token = JSON.parse(localStorage.getItem("userLogged"));
        if (token) {
            if (token.data.typeUser === "Administrador") {
                setUserAdmin(true);
            }else{
                setDepartmentSelected(token.data.department);
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
    }, [])

    const handleChange = (event) => {
        setDepartmentSelected(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Departamento</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={departmentSelected}
                    onChange={handleChange}
                    autoWidth
                    label="Departamento"
                    sx={{ m: 1, minWidth: 120, maxWidth: 300 }}
                    disabled = {userAdmin ? false: true}
                >
                    <MenuItem value={0}>
                        <em>Ninguno</em>
                    </MenuItem>
                    {departments.map((department) => {
                        return <MenuItem key={department.departments_id} value={department.departments_id} >
                            {department.name}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default DepartmentFilter;  