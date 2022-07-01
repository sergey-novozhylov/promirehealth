import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
        Typography, 
        Grid, 
    } from '@mui/material';

import _ from "lodash";
import { setStep } from '../store/actions/calculate';

import CustomButton from '../components/ui/CustomButton';
import Location from '../components/Location';
import SelectedData from '../components/SelectedData';

const SelectLocation = () => {    
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setStep('STEP 3/3') );
    },[]);    


    return (
        <Grid item container direction='column' mt="30px">
            <Grid item container justifyContent="center">
                <Typography variant="h3">Pick your location</Typography>
            </Grid> 
            <Grid item container direction="row" alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" md={4}>
                    <SelectedData />
                </Grid>  
                <Grid item container direction="column"  alignItems="center" md={4}>
                    <Grid item>
                        <Location/>
                    </Grid>
                    <Grid item mt='10px'>
                        { (!_.isEmpty(calculateData.location.zipCode) || !_.isEmpty(calculateData.location.lat) ) &&
                            <CustomButton to="/result">See Results</CustomButton>
                        }                
                    </Grid>                
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SelectLocation;