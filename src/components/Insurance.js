import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Autocomplete, Grid } from '@mui/material';

import axios from 'axios';
import _ from "lodash";

import Loading from './ui/Loading';

import { setInsuranceProvider, setInsurancePlan } from '../store/actions/calculate';

const Insurance = () => {
    const [data,setData] = useState(false);

    const dispatch = useDispatch();
    const calculateData = useSelector( state => state.calculate );    

    useEffect(() => {
        async function fetchData() {    
            const result = await axios(
                'https://api.promirehealth.com/issuers',
            );
            setData(result.data);
        }
        fetchData();
    },[]);  

    const handleInsuranceProviderChange = (item) => {
        console.log(item);

        dispatch(setInsuranceProvider(item));
        dispatch(setInsurancePlan());
    }

    const handleInsurancePlanChange = (item) => {
        dispatch(setInsurancePlan(item));
    }

    if (!data) {
        return <Loading/>;
    }

    return (           
        <>
            <Grid item >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={data}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, item)=> handleInsuranceProviderChange(item)}
                    sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
                    renderInput={(params) => <TextField {...params} label="Insurance" />}
                    value={!_.isEmpty(calculateData.insuranceProvider) ? calculateData.insuranceProvider : {name:''} }
                    // isOptionEqualToValue={(option, value) => option.code === value}
                />     
            </Grid>   
            { !_.isEmpty(calculateData.insuranceProvider) && (
                <Grid item>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={calculateData.insuranceProvider?.plans}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, item)=> handleInsurancePlanChange(item)}
                        sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
                        renderInput={(params) => <TextField  {...params} label="Insurance Plan" />}
                        value={!_.isEmpty(calculateData.insuranceProvider) ? calculateData.insurancePlan : {name:''} }
                        // isOptionEqualToValue={(option, value) => option.code === value}
                    />     
                </Grid>       
            )}                
        </>
    );
}

export default Insurance;