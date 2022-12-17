import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from 'src/pages/drivers';

const ProvinceFilter = () => {

    const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected } = useContext(FilterContext);

    const [provincies, setProvincies] = useState([]); //list of provincies
    const [userAdmin, setUserAdmin] = useState(false);

    useEffect(() => {
        setProvinceSelected(0);
        let token = JSON.parse(localStorage.getItem("userLogged"));
        if (token) {
            if (token.data.typeUser === "Administrador") {
                setUserAdmin(true);
            }else{
                setProvinceSelected(token.data.province);
            }           
        }
        if (departmentSelected != 0) {
            fetch('https://motocuy-app-backend-production.up.railway.app/api/provincies/getAllProvincies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ department: departmentSelected })

            })
                .then(res => {
                    return res.json();
                })
                .then(response => {
                    setProvincies(response)
                })
        }

    }, [departmentSelected])



    const handleChange = (event) => {
        setProvinceSelected(event.target.value);
    };


    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Provincia</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={provinceSelected}
                    onChange={handleChange}
                    autoWidth
                    label="Departamento"
                    disabled={departmentSelected != 0 && userAdmin ? false : true}
                    
                >
                    <MenuItem value={0}>
                        <em>Ninguno</em>
                    </MenuItem>
                    {provincies.map((province) => {
                        return <MenuItem key={province.id} value={province.id} >
                            {province.name}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default ProvinceFilter;  