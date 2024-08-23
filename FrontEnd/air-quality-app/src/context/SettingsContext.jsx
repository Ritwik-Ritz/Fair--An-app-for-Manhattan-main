import { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider , createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

export const ThemeContextProvider = ({children}) =>{

    //storing app theme in a state
    const [darkMode, setDarkMode] = useState( () =>{
        const savedTheme = localStorage.getItem('darkMode');
        return savedTheme === 'true' || false;
    });

    //storing font size in a state
    const[fontSize, setFontSize] = useState( () =>{
        const savedFontSize = localStorage.getItem('fontSize');
        return savedFontSize ? parseInt(savedFontSize, 10) : 13;
    });

    //useEffect hook here tracks user activity, and whenever user changes the theme or font size, this hook gets activated
    useEffect( ()=>{
        localStorage.setItem('darkMode', darkMode);
        localStorage.setItem('fontSize', fontSize);
    }, [darkMode, fontSize]);

    //useMemo hook will help us store the theme and font size, so that we are not rendering components again and again
    const theme = useMemo(() => createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
        typography: {
          fontSize: fontSize,
          h1: {
            fontSize: `${fontSize * 4}px`, 
          },
          h2: {
            fontSize: `${fontSize * 3.2}px`,
          },
          h3: {
            fontSize: `${fontSize * 2.5}px`, 
          },
          h4: {
            fontSize: `${fontSize * 1.8}px`,
          },
          h5: {
            fontSize: `${fontSize * 1.5}px`, 
          },
          body1: {
            fontSize: `${fontSize * 1.2}px`,
          },

          body2: {
            fontSize: `${fontSize * 0.8}px`,
          }
        },
      }), [darkMode, fontSize]);

    
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const changeFontSize = (size) => {
        setFontSize(size);
    };

    return (
        <SettingsContext.Provider value={{ darkMode, toggleDarkMode, fontSize, changeFontSize }}>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </SettingsContext.Provider>
    );
  };

  ThemeContextProvider.propTypes = {
    children: PropTypes.object
  }