import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import _ from "lodash";

import { setStep } from '../store/actions/calculate';

import CustomButton from '../components/ui/CustomButton';
import Insurance from '../components/Insurance';
import SelectedData from '../components/SelectedData';
import useMediaQuery from '@mui/material/useMediaQuery';

const SelectInsurance = () => {
    const dispatch = useDispatch();
    const calculateData = useSelector( state => state.calculate );    
    
    const matchesMD = useMediaQuery('(min-width:1000px)');
    const matchesSM = useMediaQuery('(min-width:650px)');

    useEffect(() => {
        localStorage.clear();
        dispatch( setStep('STEP 1/3') );
    },[]);  

    return (
        <Grid item container direction='column' mt="30px">
            <Grid item container justifyContent="center">
                <Typography variant="h3">Select your health insurance provider and plan</Typography>
            </Grid> 
            <Grid item container direction={matchesSM ? "row" : "column"} alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData />
                </Grid>              
                <Grid item container mt={matchesSM ? '0' : '30px'} direction="column" alignItems="center" xs={matchesMD ? 4 : 6}> 
                    <Grid item width={matchesSM ? '100%' : '80%'}>
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