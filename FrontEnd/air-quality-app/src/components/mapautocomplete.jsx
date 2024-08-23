import {useRef, useContext} from "react";
import {Autocomplete} from '@react-google-maps/api';
import PropTypes from 'prop-types';

import { SettingsContext } from "../context/SettingsContext";

const PlaceAutomplete = ({onPlaceSelected})=>{

    const {darkMode} = useContext(SettingsContext);

    const autocompleteRef = useRef(null);
    const onLoad = (autocompleteInstance) =>{
        autocompleteRef.current = autocompleteInstance;
    }

    const onPlaceChanged = () =>{
        if(autocompleteRef.current != null)
        {
            const place = autocompleteRef.current.getPlace();
            if (place.geometry && place.geometry.location) {
                onPlaceSelected(place.geometry.location);
            }
            else
            {
                console.log('No geometry location found for the selected place.');
            }
        }
        else
        {
            console.log("AutoComplete has not loaded");
        }
    }

    return (
        <Autocomplete ref = {autocompleteRef} onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
        <input
            type="text"
            placeholder="Search for a location"
            style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '240px',
            height: '32px',
            padding: '0 12px',
            borderRadius: '1.5vh',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
            color: darkMode ? 'white' : 'black', // Change text color based on dark mode
            backgroundColor: darkMode ? '#333' : 'white', // Change background color based on dark mode
            zIndex: '10'
            }}
        />
        </Autocomplete>
    );
}

export default PlaceAutomplete;

PlaceAutomplete.propTypes = {
    onPlaceSelected:PropTypes.func
};