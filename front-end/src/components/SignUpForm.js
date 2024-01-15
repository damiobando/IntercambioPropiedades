import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button } from './Button';
import IconButton from '@mui/material/IconButton';
import './SignUpForm.css';
import { colors } from '@mui/material';



function SignUpForm() {

    const [showPassword, setShowPassword] = useState(false);
  
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

    return (
        <div className='main-conatiner ' >
        <div className='signUp_container'>
             
        <div className='input_form_login'> 
         <h1>Sign In to your Account</h1> 
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Usuario" variant="standard" />
                </Box>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Contraseña</InputLabel>
                <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                />
                </FormControl> 
            </Box> 
            <div className='btn_register'>
            <Button buttonStyle='btn--outline'>SIGN IN</Button>
            </div>
        </div>
        <div className='register_container'>
            <h1> No tienes cuenta todavía?</h1>
            <p>Crea una ahorita mismo</p>   
            <div className='btn_register' >
            <Button buttonStyle='btn-outline' to='/register'>Registrarse</Button>
        </div>
        </div>
     
      </div>
      </div>
    );
  }

export default SignUpForm