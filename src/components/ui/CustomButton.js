import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CustomButton = ({children, to}) => {
    const styles = {
        button: {
            padding: '22px 20px',
            border: '1px solid #161616',
            boxSizing: 'border-box',
            // width: '109px',
            height: '18px',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '18px',
            letterSpacing: '0.18em',
            color: '#161616' ,
            '&::before':  {
                borderTop: '1px solid !important',
                width: '18px',
                height: '0.1px',
                display: 'inline-block',
                content: '""',
                marginRight: '8px',
                boxSizing: 'inherit'
            },
            '&::after':  {
                borderTop: '1px solid !important',
                width: '18px',
                height: '0.1px',
                display: 'inline-block',
                content: '""',
                marginLeft: '8px',
                boxSizing: 'inherit'
            }
        }
    }
    return (   
        <Button   
            component={Link}    
            to={to} 
            sx={styles.button} 
        >
            {children}
        </Button>
    );
}

export default CustomButton;