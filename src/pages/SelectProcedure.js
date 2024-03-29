import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Grid } from '@mui/material';
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { setStep } from '../store/actions/calculate';

import CustomButton from '../components/ui/CustomButton';
import Procedure from '../components/Procedure';
import SelectedData from '../components/SelectedData';
import useMediaQuery from '@mui/material/useMediaQuery';

const SelectProcedure = () => {    

    const calculateData = useSelector( state => state.calculate );
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const matchesMD = useMediaQuery('(min-width:1000px)');
    const matchesSM = useMediaQuery('(min-width:650px)');


    if ( _.isEmpty(calculateData.insuranceProvider) || _.isEmpty(calculateData.insurancePlan) ) {
        navigate("/", { replace: true });
    }

    useEffect(() => {
        dispatch( setStep('STEP 2/3') );
    },[]);  

    return (
        <Grid item container direction='column' mt="30px">
            <Grid item container justifyContent="center">
                <Typography variant="h3">Which procedure are you looking for?</Typography>
            </Grid> 

            <Grid item container direction={matchesSM ? "row" : "column"} alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData />
                </Grid>    

                <Grid item container direction="column" mt={matchesSM ? '0' : '30px'}  alignItems="center" xs={matchesMD ? 4 : 6}>              
                    <Grid item width={matchesSM ? '100%' : '80%'}>
                        <Procedure/>
                    </Grid>                       
                    <Grid item>
                        {!_.isEmpty(calculateData.procedure) &&
                            <CustomButton to="/location">Next</CustomButton>                    
                        }
                    </Grid>                
                </Grid>
            </Grid>
        </Grid> 
    );
}

export default SelectProcedure;