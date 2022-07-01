import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../store/actions/calculate';

import { Grid } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import Insurance from '../components/Insurance';
import Procedure from '../components/Procedure';
import Location from '../components/Location';
import SelectedData from '../components/SelectedData';

const Search = () => {
    
    const [searchField, setSearchField] =  useState('insurance');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( setStep('Change Params') );
    }, []);     


    const ShowSwitchedField = () => {
        switch(searchField) {
            case 'insurance':
                return <Insurance/>;
            case 'procedure':
                return <Procedure/>;
            case 'location':
                return <Location/>;
            default:
                <Insurance/>    
        }
    }

    return (
        <>
            <Grid item container direction="row" alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" md={4}>
                    <SelectedData clickHadler={setSearchField} />
                    <Grid item mt="24px">
                        <CustomButton to="/result">See Results</CustomButton>
                    </Grid>
                </Grid>                
                <Grid item container direction="column" md={8}>
                    <Grid item>
                        <ShowSwitchedField/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Search;