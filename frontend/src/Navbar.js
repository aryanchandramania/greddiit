import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import oswald from './oswald-dog.jpg';

export default function Navbar() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem('user-token');
    console.log('redirect to login');
    navigate('/');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon />     */}
            <img src={oswald} style={{width:"45px", height:"45px"}}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            greddiit
          </Typography>
          <Button onClick={() => navigate('/all')} color="inherit">All Subs</Button>
          <Button onClick={() => navigate('/my')} color="inherit">My Subs</Button>
          <Button onClick={() => navigate('/profile')} color="inherit">Profile</Button>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}