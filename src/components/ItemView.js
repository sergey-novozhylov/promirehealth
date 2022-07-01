import React, { useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';

import ItemDetails from './ItemDetails';
import DirectionsIcon from '@mui/icons-material/Directions';

const styles = {
    title: {
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: '16px',
        lineHeight: '20px'
    },
    address: {
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '20px',
        letterSpacing: '0.02em',
        color: 'rgba(60, 60, 67, 0.6)',
        textDecoration: 'none',
    },
    gridContainer: {
        border: '1px solid #BBBBBB', 
        width: '60%',
        padding: '17.5px 16px 17.5px 16px'        
    }
}

const ItemView = ({item}) => {

    const [showPriceList, setShowPriceList] = useState(false);

    return (
        <>
        <Grid item container direction="row" sx={{...styles.gridContainer, marginTop: '20px',}}>
            <Grid item container direction="column" xs>
                <Grid item>
                    <Typography sx={styles.title}>{item.name}</Typography>
                </Grid>
                <Grid item>
                    <a href={'https://maps.google.com/?q=' + item.address} style={styles.address} target='_blank' rel="noreferrer">{item.address}</a>
                </Grid>            
                <Grid item container direction='row'>
                    <Typography>{Math.round(item.distance)} miles</Typography>
                    <a href={'https://maps.google.com/?q=' + item.address} style={{...styles.address, color:'#000000'}} target='_blank' rel="noreferrer"><DirectionsIcon fontSize='small' color='#000000' /></a>
                </Grid>
            </Grid>
            <Grid item container direction="column" xs>
                <Grid item textAlign="right">
                    {item.price && (<Typography variant='h2'>${item?.price}</Typography>) }
                    {item.min_price && (
                        <>
                            <Typography variant='h2'>min: ${item?.min_price}</Typography> 
                            <Typography variant='h2'>max: ${item?.max_price}</Typography> 
                        </>
                    )}
                </Grid>
                <Grid item textAlign="right" mt='20px'>                    
                    {item.min_price && item.max_price && (
                        <Button 
                            onClick={ ()=>setShowPriceList(!showPriceList) }
                            sx={{
                                padding: '22px 20px',
                                border: '1px solid #161616',
                                boxSizing: 'border-box',
                                height: '18px',
                                fontWeight: '700',
                                fontSize: '12px',
                                lineHeight: '15px',
                                letterSpacing: '0.18em',
                                color: '#161616' ,                        
                            }}
                        >
                            all prices
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
        {showPriceList && 
            <Grid item container direction="column" sx={{...styles.gridContainer, borderTop:'0px'}} > 
                {item.pricelist.map( (item) => <ItemDetails key={item.npi} item={item}/> )}
            </Grid>        
        }
        </>
    );
}

export default ItemView;