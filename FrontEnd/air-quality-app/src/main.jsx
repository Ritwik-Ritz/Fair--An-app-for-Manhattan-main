import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './static/index.css'
import { ThemeContextProvider } from './context/SettingsContext.jsx'
import { HelmetProvider } from 'react-helmet-async'

// The normal theme + dark theme could be specified here
// https://mui.com/material-ui/customization/palette/
// https://mui.com/material-ui/customization/default-theme/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ThemeContextProvider>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </ThemeContextProvider>
  </React.StrictMode>,
)
