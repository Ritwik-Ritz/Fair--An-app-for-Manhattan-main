import React, { useContext, useState } from 'react';
import { Switch } from '@mui/material';
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import Login from './Login';
import Register from './Register';
import { SettingsContext } from '../context/SettingsContext';

const BetterLogin = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleToggle = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const {darkMode} = useContext(SettingsContext);

  const BoxBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkMode ? "#000000":"#F2F2F2",
    borderRadius: "2vh",
    padding: "2rem",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Center the box
    zIndex: 10,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    opacity: 0.85,
    marginTop: "2.5rem",
    width: "40vw",
    height: "auto",
    maxWidth: "90vw",
    maxHeight: "90vh",
    overflowY: "auto", // Add scrollbars if content overflows
    '@media (max-width: 768px)': {
      width: "80vw",
    }
  });

  return (
    <div style={{ position: 'fixed', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {!darkMode ? 
        <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted>
        <source src="static/manhattanvid.mp4" type="video/mp4" />
        </video> :
        <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted>
          <source src="static/manhattan_night.mp4" type="video/mp4" />
        </video>
      }

      <BoxBox>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <div className="flex flex-col mt-1">
            <span>{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
            <div className="ml-1">
              Click Here → <Switch checked={isSignUpMode} onChange={handleToggle} color="primary" />
            </div>
          </div>
        </div>
        {isSignUpMode ? <Register /> : <Login />}
      </BoxBox>
    </div>
  );
};

export default BetterLogin;
