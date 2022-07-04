import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import _ from "lodash";

const SeletedData = ({ clickHadler=()=>{}, searchField=false }) => {    
    const calculateData = useSelector( state => state.calculate );    
console.log(searchField);
    return (
        <>
            { !_.isEmpty(calculateData.insuranceProvider) && (
                <Grid item onClick={()=> clickHadler('insurance')}>
                    <Typography variant='h5'>Provider</Typography>
                    <Typography variant='h3' sx={{ color: (searchField && searchField!=='insurance') ? '#888484' : '#161616' }}>{calculateData?.insuranceProvider.name}</Typography>
                </Grid> 
            )}
            { !_.isEmpty(calculateData.insurancePlan) && (
                <Grid item mt="24px" onClick={()=> clickHadler('insurance')}>
                    <Typography variant='h5'>Plan</Typography>
                    <Typography variant='h3' sx={{ color: (searchField && searchField!=='insurance') ? '#888484' : '#161616' }}>{calculateData?.insurancePlan.name}</Typography>
                </Grid>
            )}
            { !_.isEmpty(calculateData.procedure) && (
            <Grid item mt="24px" onClick={()=> clickHadler('procedure')}>
                <Typography variant='h5'>Procedure</Typography>
                <Typography variant='h3' sx={{ color: (searchField && searchField!=='procedure') ? '#888484' : '#161616' }}>{calculateData?.procedure.billing_code}:{calculateData?.procedure.name}</Typography>
            </Grid>
            )}
            { ( (calculateData.location.zipCode && calculateData.location.locationType==='zipcode') || 
                    (calculateData.location.lat && calculateData.location.locationType==='location') ) && (
                <Grid item mt="24px" onClick={()=> clickHadler('location')}>
                    <Typography variant='h5'>Location</Typography>
                    <Typography variant='h3' sx={{ color: (searchField && searchField!=='location') ? '#888484' : '#161616' }}>
                        { (calculateData.location.locationType === 'location') ? 'Your Location' : 'ZipCode: ' + calculateData?.location.zipCode}                        
                    </Typography>
                </Grid>        
            )}
        </>
    );
}

export default SeletedData;