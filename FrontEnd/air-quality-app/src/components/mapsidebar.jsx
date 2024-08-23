import React, { useState } from 'react';
import { Button} from '@mui/material';
import PropTypes from 'prop-types';

export const MapSidebar = ({ isOpen}) => {

    //TODO: These will be used when working
    const [source, setSource] = useState(null);
    const [dest, setDest] = useState(null);

  return (
    <div className={`fixed left-0 h-full bg-gray-100 p-4 items-center transition duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-1/3`} 
        style={{width: '20vw'}}>
        <h1 className='text-center text-3xl'> Get Directions</h1>
        <div className='flex flex-col items-center mt-2'>
            <input type="text" />
            <input type="text" />
        </div>
        <div className='flex justify-center mt-4'>
            <Button variant="contained" color="secondary" className='px-4 py-2 text-lg'>
                Get Directions
            </Button>
        </div>
    </div>
  );
};

MapSidebar.propTypes = {
    isOpen:PropTypes.bool
};