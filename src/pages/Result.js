import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../store/actions/calculate';
import axios from 'axios';
import _ from "lodash";
import { useNavigate } from "react-router-dom";

import { Typography,Grid, Button, Menu, MenuItem } from '@mui/material';
import ItemView from '../components/ItemView';
import res from './res';
import CustomButton from '../components/ui/CustomButton';
import SelectedData from '../components/SelectedData';
import Loading from '../components/ui/Loading';

const Result = () => {
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortFilter, setSortFilter] = useState('price');
    
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

    let navigate = useNavigate();
    if ( _.isEmpty(calculateData.insuranceProvider) || 
            _.isEmpty(calculateData.insurancePlan) ||
            _.isEmpty(calculateData.procedure) ||
            (_.isEmpty(calculateData.location.zipCode) && _.isEmpty(calculateData.location.lat))
    ) {
        navigate("/", { replace: true });
    }

    useEffect(() => {
        dispatch( setStep('RESULTS') );
        async function fetchData() {
            let params = {
                billing_code: calculateData?.procedure.billing_code,
                postal_code: calculateData?.location.zipCode,
                radius: calculateData?.location.radius,
                issuer_id: calculateData?.insuranceProvider.id,
                plan_id: calculateData?.insurancePlan.id, 
            };
            if (calculateData.location.locationType == 'location' ) {
                params = {...params, lat: calculateData?.location.lat ,lng: calculateData?.location.lon, postal_code:null}
            }

            const result = await axios.get(
                'https://api.promirehealth.com/search', {
                params
            });
                // https://api.promirehealth.com/search?billing_code=71250&postal_code=30005&radius=100&issuer_id=20f21e64-e164-4bd9-8834-aa46d63e76b9&plan_id=11111111111        

            setData(result.data);
            setIsLoading(false);
        }
        fetchData();
    }, []);     

    const sortHandler = (filter) => {
        let arr = _.sortBy(data, (e) => {
            return (filter==='price') ? e.price : e.distance;
        });
        setSortFilter(filter);
        setData(arr);
        handleClose();
    }


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log(anchorEl);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };    

    return (
        <>
            <Grid item container direction="row" alignItems="flex-start" mt="60px">

                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData />
                    <Grid item mt="24px">
                        <CustomButton to="/search">Change</CustomButton>
                    </Grid>
                </Grid>                
                <Grid item container direction="column" xs={8}>
                    <Grid item container direction="row">
                        <Grid item container alignItems='center' md >
                            {isLoading ? <Loading/> : <Typography variant='h3' sx={{fontSize:'16px'}}>{res.length} results found</Typography>}
                        </Grid>
                        {res.length>0 &&                         
                        <Grid item md>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                {sortFilter}
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={()=>sortHandler('price')}>price</MenuItem>
                                <MenuItem onClick={()=>sortHandler('distance')}>distance</MenuItem>
                            </Menu>                            
                        </Grid>       
                        }                 
                    </Grid>
                    {res.map( (item) => <ItemView key={item.name} item={item} /> )}
                </Grid>
            </Grid>
        </>
    );
}

export default Result;