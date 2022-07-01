import React from 'react';
import { Typography, Grid } from '@mui/material';

const ItemDetails = ({item}) => {

    return (
        <Grid item container direction="row">
            <Grid item xs={9}>
                <Typography variant='h4'>{item.name}</Typography>
            </Grid>
            <Grid item xs={3} textAlign="right">
                <Typography variant='h4'>${item.price}</Typography>
            </Grid>
        </Grid>   
    );
}

export default ItemDetails;