
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component="img"
          src="/PMS_logo.png"
          alt="PMS Logo"
          sx={{ height: 40, marginRight: 2 }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'yellow' }}
        >
          Patient Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;