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
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import useMediaQuery from '@mui/material/useMediaQuery';

const Result = () => {
    const [data,setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortFilter, setSortFilter] = useState('price');
    
    const calculateData = useSelector( state => state.calculate );    
    const dispatch = useDispatch();

    const matchesMD = useMediaQuery('(min-width:1000px)');
    const matchesSM = useMediaQuery('(min-width:650px)');
console.log(calculateData);
    let navigate = useNavigate();
    if ( _.isEmpty(calculateData.insuranceProvider) || 
            _.isEmpty(calculateData.insurancePlan) ||
            _.isEmpty(calculateData.procedure) ||
            ( !calculateData.location.zipCode && !calculateData.location.lat)
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
            <Grid item container direction={matchesSM ? "row" : "column"} alignItems="flex-start" mt="60px">

                <Grid item container direction='column' alignContent="center" xs={4}>
                    <SelectedData />
                    <Grid item mt="24px">
                        <CustomButton to="/search">Change</CustomButton>
                    </Grid>
                </Grid>                
                <Grid item container direction="column" alignItems='center' mt={matchesSM ? '0' : '30px'}  xs={matchesMD ? 4 : 6}>
                    <Grid item container direction="row" alignItems='center' width={matchesSM ? '100%' : '80%'}>
                        <Grid item container  textAlign='left' xs >
                            {isLoading ? <Loading/> : <Typography variant='h3' sx={{fontSize:'16px'}}>{data.length} results found</Typography>}
                        </Grid>
                        {data.length>0 &&                         
                        <Grid item xs textAlign='right'>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                sx={{color:'#000000'}}
                            >
                                {sortFilter}<UnfoldMoreIcon fontSize='small'/>
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
                    <Grid item container width={matchesSM ? '100%' : '80%'}>
                        {data.map( (item) => <ItemView key={item.name} item={item} /> )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Result;