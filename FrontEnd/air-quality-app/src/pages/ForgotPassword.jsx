import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AirIcon from '@mui/icons-material/Air';
import constant from '../constant';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [resetMessage, setResetMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
    } else {
      // TODO: connect this with login logic implemented by backend
      setResetMessage(true);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        <AirIcon fontSize="large" className='mb-4'></AirIcon>

        <Typography variant="h4" className="mb-4 font-bold">{constant.ForgotPass.forgotText}</Typography>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <TextField 
              label="Email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              fullWidth 
              margin="normal" 
              className="mb-3" 
              error={emailError !== ''}
              helperText={emailError}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4"> {constant.ForgotPass.forgotText} </Button>

            {resetMessage && (
              <div className='reset-message'> Please check your email for reset password link</div>
            )}
        </form>
    </div>
  );
};

export default ForgotPass;