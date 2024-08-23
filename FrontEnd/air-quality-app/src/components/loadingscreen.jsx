import { Box, CircularProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LoadingScreen = ({loadingtext}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
    }}
  >
    <CircularProgress />
    <Typography sx={{ marginTop: '2rem' }}>{loadingtext}</Typography>
  </Box>
);
LoadingScreen.propTypes = {
    loadingtext: PropTypes.string,
}

LoadingScreen.displayName = "LoadingScreen"


export default LoadingScreen;