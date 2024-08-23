import { Typography, Box } from "@mui/material";
import { renderMapAlert } from "./mapalerts";
import PropTypes from 'prop-types';

const MapAlertCard = ({aqi}) => {
    let {alertHeading, aqiNumber, alertContent} = renderMapAlert(aqi)

    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#0D1B2A"
        color="white"
        p={2}
        ml={3}
        borderRadius="8px"
        maxWidth="md"
        sx={{
            width: {
              xs: '80vw',
              sm: '50vw',
              md: '30vw',
              lg: '20vw',
            },
          }}
      >
        {/* <img src={warningImg} alt="Warning Icon" /> */}
        <Box
          sx={{
            wordBreak: "break-word",
            whiteSpace: "normal",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold"}}>
            {alertHeading}
          </Typography>
          <Typography variant="body2">
            {aqiNumber}
          </Typography>
          <Typography variant="body2">
            {alertContent}
          </Typography>
        </Box>
      </Box>
    );
}

export default MapAlertCard;

MapAlertCard.propTypes = {
  alertHeading: PropTypes.string,
  aqiNumber: PropTypes.number,
  alertContent: PropTypes.string,
  aqi:PropTypes.number
}
