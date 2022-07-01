import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../store/actions/calculate';
import axios from 'axios';
import _ from "lodash";

import { Typography,Grid, Button, Menu, MenuItem } from '@mui/material';
import ItemView from '../components/ItemView';
// import res from './res';
import CustomButton from '../components/ui/CustomButton';
import SelectedData from '../components/SelectedData';

const Result = () => {
    const [data,setData] = useState([]);

    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

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
        }
        fetchData();
    }, []);     

    const sortHandler = (price) => {
        let arr = _.sortBy(data, (e) => {
            return price ? e.price : e.distance;
        });
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

                <Grid item container direction='column' alignContent="center" md={4}>
                    <SelectedData />
                    <Grid item mt="24px">
                        <CustomButton to="/search">Change</CustomButton>
                    </Grid>
                </Grid>                
                <Grid item container direction="column" md={8}>
                    <Grid item container direction="row">
                        <Grid item container alignItems='center' md >
                            <Typography variant='h3' sx={{fontSize:'16px'}}>{data.length} results found</Typography>
                        </Grid>
                    {data.length>0 &&                         
                        <Grid item md>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Sort
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
                                <MenuItem onClick={()=>sortHandler(true)}>price</MenuItem>
                                <MenuItem onClick={()=>sortHandler(false)}>distance</MenuItem>
                            </Menu>                            
                        </Grid>       
                    }                 
                    </Grid>
                    {data.map( (item) => <ItemView key={item.name} item={item} /> )}
                </Grid>
            </Grid>
        </>
    );
}

export default Result;