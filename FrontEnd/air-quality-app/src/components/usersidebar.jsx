import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, ListItemText, Avatar, Divider, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
import clsx from 'clsx';
import constant from '../constant';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const DrawerOpen = styled('div')(({ theme }) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const DrawerClose = styled('div')(({ theme }) => ({
  width: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: 'hidden',
}));

const Sidebar = ({ isOpen, toggleDrawer }) => {
  return (
    <div className="flex">
      {!isOpen && (
        <IconButton onClick={toggleDrawer} className="sticky top-2 left-2">
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant="permanent"
        open={isOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: isOpen ? drawerWidth : 0,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            overflowX: 'hidden',
            marginTop: {
              xs: '56px',
              sm: '64px',
              md: '72px',
              lg: '76px',
            },
          },
        }}
      >
        {isOpen && (
          <div className={clsx('h-full bg-teal-600  text-white p-4 flex flex-col justify-between', isOpen ? DrawerOpen : DrawerClose)}>
            <div className="relative">
              <IconButton onClick={toggleDrawer} className="absolute right-2">
                <CloseIcon />
              </IconButton>
              <div className="flex flex-col items-center mt-1"> 
                {/* <Avatar
                  alt="User"
                  src="https://via.placeholder.com/150"
                  sx={{ width: 150, height: 150, margin: 'auto', display: 'block' }}
                  className="md:w-48 lg:w-64"
                /> */}
                {/* Replace with username from database */}
                <p className="text-lg mt-2">{constant.userSidebar.welcomeText}</p>
                <p className="text-lg text-center mt-2 mb-2">{constant.userSidebar.exposureText}</p>
                <Button variant="contained" className="bg-white text-green-500 mt-1" component ={Link} to="/user/dailyform">
                  Start Daily Quiz
                </Button>
              </div>
              <div className='mt-4 text-center text-2xl'>
              <ul className='mt-1 '>
                <li>
                  <Button className='' component ={Link} to="/user"
                   sx={{ color: 'white' }}>
                    DashBoard
                  </Button>
                </li>
                <li>
                  <Button className='block py-2 px-4' component ={Link} to="/user/stgeorgesquiz"
                   sx={{ color: 'white' }}>
                    Assessment
                  </Button>
                </li>
                <li>
                  <Button className='block py-2 px-4' component ={Link} to="/privacy"
                   sx={{ color: 'white'}}>
                    Privacy
                  </Button>
                </li>
              </ul>
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Sidebar;

Sidebar.propTypes = {
    isOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};