import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from 'src/pages/passengers';

const DistrictFilter = () => {

    const { departmentSelected, setDepartmentSelected, provinceSelected, setProvinceSelected, districtSelected, setDistrictSelected } = useContext(FilterContext);
    const [districts, setDistricts] = useState([]); //list of districts;
    const [userAdmin, setUserAdmin] = useState(false);

    useEffect(() => {
        setDistrictSelected(0);
        let token = JSON.parse(localStorage.getItem("userLogged"));
        if (token) {
            if (token.data.typeUser === "Administrador") {
                setUserAdmin(true);
            }else{
                setDistrictSelected(token.data.district);
            }            
        }

        if (provinceSelected != 0) {
            fetch('https://motocuy-app-backend-production.up.railway.app/api/districts/getAllDistricts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ province: provinceSelected })

            })
                .then(res => {
                    return res.json();
                })
                .then(response => {
                    setDistricts(response)
                })
        }

    }, [provinceSelected])

    const handleChange = (event) => {
        setDistrictSelected(event.target.value);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-autowidth-label">Distrito</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={districtSelected}
                    onChange={handleChange}
                    autoWidth
                    label="Distrito"
                    disabled={provinceSelected != 0 && userAdmin ? false : true}
                >
                    <MenuItem value={0}>
                        <em>Ninguno</em>
                    </MenuItem>
                    {districts.map((district) => {
                        return <MenuItem key={district.id} value={district.id} >
                            {district.name}
                        </MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default DistrictFilter;  