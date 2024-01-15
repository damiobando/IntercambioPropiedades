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
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleButtonClick = () => {
    console.log('Primer Nombre:', firstName);
    console.log('Segundo Nombre:', secondName);
    console.log('Correo Electrónico:', email);
    console.log('Contraseña:', password);
  };

  return (
    <>
      <div className='signUp_container'>
        <div className='register_container '>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 2, width: '45ch' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              alignContent: 'left',
              marginLeft: '-200px',
            }}
            noValidate
            autoComplete='off'
          >
            <h1>Sign In to your Account</h1>
            <TextField
              required
              id='firstName'
              label='Nombre'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id='secondName'
              label='Apellidos'
              value={secondName}
              onChange={(e) => setSecondName(e.target.value)}
            />
            <TextField
              required
              id='email'
              label='Correo Electrónico'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              id='password'
              label='Contraseña'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </div>
        <div className='logoBtn'>
          <img
            src='./images/LogoIntercambio.png'
            style={{ width: '400px', height: 'auto', alignContent: 'center', marginLeft: '100px' }}
          />
          <FormGroup>
            <FormControlLabel required control={<Checkbox />} label='Acepta los Términos y Condiciones' />
          </FormGroup>
          <Button buttonStyle='btn--outline' onClick={handleButtonClick}>
            Crear cuenta
          </Button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
