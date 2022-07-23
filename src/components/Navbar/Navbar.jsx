import React from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import useStyles from './styles';

function Navbar() {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)'); //if width > 600px => isMobile == false
  const theme = useTheme();
  const isAutenticated = true; //will be implemented later

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => {}} //will be implemented later
              className={classes.menuButton}
            > { /*an element*/ }
              <Menu /> { /*an icon*/ }
            </IconButton>
          )}
          { /*dark mode toggle button*/ }
          <IconButton
            color="inherit"
            sx={{ ml: 1 }} //mui inline style; ml == margin left
            onClick={() => {}} //will be implemented later
          >
            { /*toggle functionality will be implemented later*/ }
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && 'Search...'} { /*search bar will be implemented later*/ }
          <div>
            {!isAutenticated ? ( //login button is visible only if we are not logged in
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link} //link to a specific page
                to="/profile/:id" //will be implemented later
                className={classes.linkButton}
                onClick={() => {}} //will be implemented later
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" //will be implemented later
                /> { /*<Avatar> is a styled image*/ }
              </Button>
            )}
          </div>
          {isMobile && 'Search...'} { /*search bar will be implemented later*/ }
        </Toolbar>
      </AppBar>
      <div />
    </>
  );
}

export default Navbar;
