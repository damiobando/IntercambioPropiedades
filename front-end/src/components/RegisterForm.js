import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './RegisterForm.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { registerRequest } from '../api/auth';
import bcrypt from 'bcryptjs';

async function hashPassword(password) {
  const saltRounds = 10; // Número de rondas de salto (más rondas hacen el proceso más lento)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenna, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');

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

  const handleButtonClick = async () => {
    const hashedPassword = await hashPassword(contrasenna);
    const requestData = {
      name: firstName,
      phone: telefono,
      email: email,
      password: hashedPassword
    };
    const res = await registerRequest(requestData)
    console.log(res)
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
              id='telefono'
              label='Telefono'
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
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
              id='contrasenna'
              label='Contraseña'
              type='contrasenna'
              value={contrasenna}
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
