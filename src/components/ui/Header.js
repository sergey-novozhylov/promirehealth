import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Header = () => {
    const calculateData = useSelector( state => state.calculate );
    const history = useNavigate();

    return (   
        <Grid container direction='column' width='100%'>
            <Grid container alignItems="center" justifyContent="center" width='100%'     
                sx={{  
                    height: '60px',
                    background: '#595959',
                }} 
            >
                <Typography sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '24px',
                        lineHeight: '30px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#FFFFFF'
                }} >
                    Promire Health
                </Typography>
            </Grid>
            <Grid item container direction="row" alignItems="center" width='100%'      
                sx={{  
                    height: '108px',
                    background: '#D5E7F6',
                }} 
            >
                <Grid item container xs={2} justifyContent="center" alignItems="center">
                    { (calculateData.step == 'STEP 2/3' || calculateData.step == 'STEP 3/3') && (
                        <Button onClick={() => history(-1)}
                            sx={{
                                fontWeight: '400',
                                fontSize: '22px',
                                lineHeight: '28px',
                                color: '#595959',
                                textTransform: 'lowercase',
                            }}
                        ><ArrowBackIosNewIcon fontSize='18px' color='#595959' />back</Button>
                    )}
                </Grid>
                <Grid item container justifyContent="center" xs={8}>
                    <Typography sx={{
                        fontWeight: '400',
                        fontSize: '22px',
                        lineHeight: '28px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#161616'                       
                    }}>
                        {calculateData.step}
                    </Typography>
                </Grid>
                {/* <Grid item container xs justifyContent="center" alignItems="center" /> */}
            </Grid>            
        </Grid>
    );
}

export default Header;