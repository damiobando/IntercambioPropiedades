import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './RegisterForm.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from './Button';
import { Link } from 'react-router-dom';



function RegisterForm() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
        <>
    <div className='signUp_container'>      
    
    <div className='register_container '>
    
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '45ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        alignContent: 'left',
        marginLeft: '-200px'
      }}
      noValidate
      autoComplete="off" >

        <h1>Sign In to your Account</h1>  
        <TextField
          required
          id="firstName"
          label="Primer Nombre"
        />
         <TextField
          required
          id="secondName"
          label="Segundo Nombre"
        />
         <TextField
          required
          id="email"
          label="Correo Electrónico"
        />
        <TextField
          required
          id="password"
          label="Contraseña"
          type="password"
        />
        </Box>
        </div>
        <div className='logoBtn' >
        <img src='./images/LogoIntercambio.png' style={{ width: '400px', height: 'auto', alignContent: 'center', marginLeft : '100px' }}/>
        <FormGroup>
        <FormControlLabel required control={<Checkbox />} label="Acepta los Términos y Condiciones" />
        </FormGroup>
        <Button buttonStyle='btn--outline'>Crear cuenta</Button>
 
        </div>
    </div>
      </>
    );
  }

export default RegisterForm