import {useState} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import constant from '../constant';

const UserAge = ({ nextStep }) => {
  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{constant.general.getting_started}</h2>
      <p className="mb-6 text-center">{constant.userAge.title}</p>
      <FormControl component="fieldset">
        <FormLabel component="legend" className="mb-4 text-center">{constant.userAge.title}</FormLabel>
        <RadioGroup value={age} onChange={handleChange}>
          <FormControlLabel value="0-17" control={<Radio />} label="0-17" />
          <FormControlLabel value="18-34" control={<Radio />} label="18-34" />
          <FormControlLabel value="35-64" control={<Radio />} label="35-64" />
          <FormControlLabel value="65+" control={<Radio />} label="65+" />
        </RadioGroup>
      </FormControl>
      <div className="flex justify-center mt-6">
        <Button variant="contained" color="primary" onClick={nextStep}>
          {constant.general.save_and_continue}
        </Button>
      </div>
    </div>
  );
};


UserAge.propTypes = {
  nextStep: PropTypes.func
}


export default UserAge;
