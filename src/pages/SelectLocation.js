import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
        Typography, 
        Grid, 
    } from '@mui/material';

import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { setStep } from '../store/actions/calculate';

import CustomButton from '../components/ui/CustomButton';
import Location from '../components/Location';
import SelectedData from '../components/SelectedData';
import useMediaQuery from '@mui/material/useMediaQuery';

const SelectLocation = () => {    
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();
   
    const matchesMD = useMediaQuery('(min-width:1000px)');
    const matchesSM = useMediaQuery('(min-width:650px)');
    
    let navigate = useNavigate();

    if ( _.isEmpty(calculateData.insuranceProvider) || 
            _.isEmpty(calculateData.insurancePlan) ||
            _.isEmpty(calculateData.procedure)
    ) {
        navigate("/", { replace: true });
    }

    useEffect(() => {
        dispatch( setStep('STEP 3/3') );
    },[]);    


    return (
        <Grid item container direction='column' mt="30px">
            <Grid item container justifyContent="center">
                <Typography variant="h3">Pick your location</Typography>
            </Grid> 
            <Grid item container direction={matchesSM ? "row" : "column"} alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData />
                </Grid>  
                <Grid item container direction="column" mt={matchesSM ? '0' : '30px'}  alignItems="center" xs={matchesMD ? 4 : 6}>
                    <Grid item width={matchesSM ? '100%' : '80%'}>
                        <Location/>
                    </Grid>
                    <Grid item mt='10px'>
                        { ( 
                            (!_.isEmpty(calculateData.location.zipCode) && calculateData.location.locationType=='zipcode' )
                                || ( calculateData.location.lat && calculateData.location.locationType=='location' ) ) &&
                            <CustomButton to="/result">See Results</CustomButton>
                        }                
                    </Grid>                
                </Grid>
            </Grid>
        </Grid>
    );
}

export default SelectLocation;