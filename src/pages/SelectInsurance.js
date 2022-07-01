import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import _ from "lodash";

import { setStep } from '../store/actions/calculate';

import CustomButton from '../components/ui/CustomButton';
import Insurance from '../components/Insurance';
import SelectedData from '../components/SelectedData';

const SelectInsurance = () => {
    const dispatch = useDispatch();
    const calculateData = useSelector( state => state.calculate );    

    useEffect(() => {
        localStorage.clear();
        dispatch( setStep('STEP 1/3') );
    },[]);  

    return (
        <Grid item container direction='column' mt="30px">
            <Grid item container justifyContent="center">
                <Typography variant="h3">Select your health insurance provider and plan</Typography>
            </Grid> 
            <Grid item container direction="row" alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" md={4}>
                    <SelectedData />
                </Grid>              
                <Grid item container direction="column" alignItems="center" md={4}> 
                    <Grid item >
                        <Insurance/>
                    </Grid>
                    <Grid item>
                        {!_.isEmpty(calculateData.insuranceProvider) && 
                            !_.isEmpty(calculateData.insurancePlan) &&
                            <CustomButton to="/procedure">Next</CustomButton>
                        }
                    </Grid>                
                </Grid>
                <Grid item md={4}></Grid>
            </Grid>
        </Grid>
    );    
}

export default SelectInsurance;