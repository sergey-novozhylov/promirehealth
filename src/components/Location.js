import React, { useState, useEffect } from 'react';
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
        FormControlLabel,
        Typography
    } from '@mui/material';

import { setZipCode, setRadius, setLatLon, setLocationType } from '../store/actions/calculate';

const Location = () => {    
    // const [locationType, setLocationType] = useState(null);
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

    useEffect(() => {
        getLocation();
    }, []);      

    const handleZipCodeChange = (event) => {
        dispatch(setZipCode(event.target.value));
    };
    
    const handleRadiusChange = (event) => {
        dispatch(setRadius(event.target.value));
    };

    const handleLocationTypeChange = (event) => {
        //setLocationType(event.target.value);
        if ( event.target.value === 'location' )  {
            getLocation();
        }
        dispatch(setLocationType(event.target.value))
    };

    const [status, setStatus] = useState(null);
  
    const getLocation = () => {
      if (!navigator.geolocation) {
        setStatus('Geolocation is not supported by your browser');
      } else {
        setStatus('Locating...');
        navigator.geolocation.getCurrentPosition((position) => {
          setStatus('Your location is determined');
          dispatch(setLatLon({lat: position.coords.latitude, lon: position.coords.longitude}));
        }, () => {
          setStatus('Unable to retrieve your location');
        });
      }
    }

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
            <Grid item container justifyContent='center'>
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
                        sx={{width:'100%'}}
                    />
                </Grid>
            }
            { (calculateData.location.locationType === 'location') &&      
                <Grid item textAlign="center">
                    <Typography variant='h3'>{status}</Typography>
                </Grid>
            }            
            { calculateData.location.locationType && 
                <Grid item mt="20px" mb="20px">
                    <FormControl sx={{width:'100%'}}>
                        <InputLabel width='100%' id="demo-simple-select-label">Choose radius up to 100 miles</InputLabel>
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