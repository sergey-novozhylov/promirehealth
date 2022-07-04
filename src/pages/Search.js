import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStep } from '../store/actions/calculate';

import { Grid } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import Insurance from '../components/Insurance';
import Procedure from '../components/Procedure';
import Location from '../components/Location';
import SelectedData from '../components/SelectedData';
import useMediaQuery from '@mui/material/useMediaQuery';

const Search = () => {
    
    const [searchField, setSearchField] =  useState('insurance');
    const dispatch = useDispatch();

    const matchesMD = useMediaQuery('(min-width:1000px)');
    const matchesSM = useMediaQuery('(min-width:650px)');

    useEffect(() => {
        dispatch( setStep('Change Parameters') );
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
            <Grid item container direction={matchesSM ? "row" : "column"} alignItems="flex-start" mt="60px">
                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData clickHadler={setSearchField} searchField={searchField} />
                    <Grid item mt="24px">
                        <CustomButton to="/result" dashes={false}>See Results</CustomButton>
                    </Grid>
                </Grid>                
                <Grid item container direction="column" alignItems="center" mt={matchesSM ? '0' : '30px'} xs={matchesMD ? 4 : 6}>
                    <Grid item width={matchesSM ? '100%' : '80%'}>
                        <ShowSwitchedField/>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Search;