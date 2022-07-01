import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
        TextField, 
        Grid, 
        InputLabel, 
        MenuItem, 
        FormControl, 
        Select,
        Radio,
        RadioGroup,
        FormControlLabel
    } from '@mui/material';

import { setZipCode, setRadius, setLatLon, setLocationType } from '../store/actions/calculate';

const Location = () => {    
    // const [locationType, setLocationType] = useState(null);
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

    const handleZipCodeChange = (event) => {
        dispatch(setZipCode(event.target.value));
    };
    
    const handleRadiusChange = (event) => {
        dispatch(setRadius(event.target.value));
    };

    const handleLocationTypeChange = (event) => {
        //setLocationType(event.target.value);
        dispatch(setLocationType(event.target.value))
    };

    const styles = {
        radio: {
            color: '#000000',
            '&.Mui-checked': {
            color: '#000000',
            },            
        }
    }

    return (
        <>
            <Grid item>
                <FormControl color="#ffffff">
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={calculateData.location.locationType}
                        onChange={handleLocationTypeChange} 
                    >
                        <FormControlLabel value="zipcode" control={<Radio sx={styles.radio} />} label="Zip Code" />
                        <FormControlLabel value="location" control={<Radio sx={styles.radio} />} label="Location" />
                    </RadioGroup>
                </FormControl>     
            </Grid>                       
            { (calculateData.location.locationType == 'zipcode') &&      
                <Grid item mt="20px">
                    <TextField
                        required
                        id="outlined-required"
                        label="Type Zip Code"
                        type="number"
                        defaultValue={calculateData.location.zipCode}
                        onChange={handleZipCodeChange}
                        fullWidth
                        sx={{width:'500px'}}
                    />
                </Grid>
            }
            { (calculateData.location.locationType == 'location') &&      
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                    dispatch(setLatLon({lat: position.coords.latitude, lon: position.coords.longitude}));
                })
            }            
            { calculateData.location.locationType && 
                <Grid item mt="20px" mb="20px">
                    <FormControl sx={{width:'500px'}}>
                        <InputLabel width='500px' id="demo-simple-select-label">Choose radius up to 100 miles</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={calculateData.location.radius}
                            label="Choose radius up to 100 miles"
                            onChange={handleRadiusChange}
                        >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>                    
                </Grid>
            }
        </>
    );
}

export default Location;