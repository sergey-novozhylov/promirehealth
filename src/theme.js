import { createTheme } from '@mui/material/styles';

let theme = createTheme({
    typography: {
        allVariants: {
        fontFamily: 'Quicksand',
        fontStyle: 'normal',
        }
    }
});
theme = createTheme(theme,{
    breakpoints: {
        values: {
            xs: 0,
            sm: 320,
            md: 768,
            lg: 1440,
            xl: 1536,
        },
    },
    typography: {
 
        h1: {
            fontWeight: '500',
            fontSize: '44px',
            lineHeight: '1.25',
            letterSpacing: '0.04em',
            color: '#000000',
            [theme.breakpoints.down('lg')]: {
                fontSize: '44px',
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '38px',
            },           
            [theme.breakpoints.down('sm')]: {
                fontSize: '32px',
            },             
        },
        h2: {
            fontWeight: '400',
            fontSize: '22px',
            lineHeight: '1.27',       
            letterSpacing: '0.12em',          
        },
        h3: {
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '1.25',      
            color: '#000000',
        },
        h4: {
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '1.25',            
            letterSpacing: '0.02em',
            color: '#000000',
        },        
        h5: {
            fontWeight: '300',
            fontSize: '12px',
            lineHeight: '1.25',
            letterSpacing: '0.01em',
            color: '#000000'
        }
    },
});

export default theme;