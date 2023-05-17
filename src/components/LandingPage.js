import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://ntsika.producedbysilva.co.za" target="_blank">
        Ntsika Silvano
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function LandingPage() {
  return (
    <>
            <Paper elevation={24} sx={{ margin: 10 }}>
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
            }}
            >
            <Typography variant="h3" gutterBottom>
                Welcome to the To-Do App
            </Typography>
            <Typography paragraph="true" gutterBottom>
                Register or Login with your Gmail email address and start doing!
            </Typography>
            <Box sx={{ '& > *': { m: 1 } }}>
                <Button component={Link} to="/register" variant="contained" color="primary">
                Register
                </Button>{' '}
                <Button component={Link} to="/login" variant="outlined" color="primary">
                Login
                </Button>
            </Box>
            
            </Box>
            </Paper>
            <Copyright />
        
    </>
  );
};

