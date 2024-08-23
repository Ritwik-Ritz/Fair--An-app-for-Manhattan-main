import { useImperativeHandle, useRef, forwardRef } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { Box } from "@mui/system";
import { styled } from "@mui/system";
import PropTypes from 'prop-types';


const StyledInput = styled("input")({
  width: "100%",
  color: "red",
  padding: "1rem",
  fontSize: "18px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    borderColor: "#3399FF",
  },
});

const DailySearchbar = forwardRef(({passPlaceData}, ref) => {
  const inputRef = useRef();
  const textRef= useRef();

  const apikey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const placeslib = ["places"];

  const nyBounds = {
    south: 40.477399,
    west: -74.259090,
    north: 40.917577,
    east: -73.700272,
  };

  const handlePlaceChange = () => {
    // checks if an input exists
    if (inputRef.current && inputRef.current.getPlace) {
      const place = inputRef.current.getPlace()

      // checks if place has loaded
      if (place && place.geometry && place.geometry.location) {
        const placeData = {
          components_array: place.address_components,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      
      // a placeholder function which contains placeData outlined above and is passed as a prop to the daily form parent component.
      // Placeholder meaning that is not defined within the daily search bar.
      // When passed as a prop in daily form ie <Daily searchbar passPlaceData="func()"> 
      // it gives the placeData that it is holding to the function that *is* defined 
      // in the daily form. Essentially replacing it. This is done so that data can pass from the child to the parent components.

      passPlaceData(placeData)
      
      }


    }

  };

  useImperativeHandle(ref, () => ({
    handleReset() {
      if (textRef.current){
        textRef.current.value=""
      }
    },
    textRef
  }));

  return (
    <Box sx={{ margin: "1rem" }}>
      <LoadScript googleMapsApiKey={apikey} libraries={placeslib}>
        <Autocomplete
          onLoad={(ref) => (inputRef.current = ref)}
          onPlaceChanged={handlePlaceChange}
          options={{
            bounds: nyBounds,
            strictBounds: true,
          }}
        >
          <StyledInput
            sx={{
              color: "black"
            }}
            type="text"
            className="form-control"
            placeholder="Enter Location"
            ref={textRef}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
          />
        </Autocomplete>
      </LoadScript>
    </Box>
  );
});

DailySearchbar.displayName = "DailySearchbar";

DailySearchbar.propTypes = {
  passPlaceData: PropTypes.func,
}

export default DailySearchbar;

