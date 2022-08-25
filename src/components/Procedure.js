import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';

import { setProcedure } from '../store/actions/calculate';

import result2 from '../procedure_codes';

import Loading from '../components/ui/Loading';


const Procedure = () => {    
    const [data,setData] = useState(false);

    const calculateData = useSelector( state => state.calculate );
    const dispatch = useDispatch();

    // useEffect(() => {
    //     async function fetchData() {    
    //         const result = await axios(
    //                 'https://api.promirehealth.com/billing_codes',
    //         );
    //         setData(result.data);
    //     }
    //     fetchData();
    // },[]);  
    
    if (! result2 ) {
        return <Loading/>
    }

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={result2}
            // getOptionLabel={(option) => (option.billing_code + ' ' + option.name).trim() }
            getOptionLabel={(option) => (option.Code + ' ' + option.Description).trim() }
            onChange={(e, item)=> dispatch( setProcedure(item) ) }
            sx={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}
            renderInput={(params) => <TextField {...params} label="Procedure" />}
            value={ !_.isEmpty(calculateData.procedure) ? calculateData.procedure : {Code:'',Description:''} }
        />     
    );
}

export default Procedure;