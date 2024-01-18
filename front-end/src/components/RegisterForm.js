import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './RegisterForm.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { registerRequest } from '../api/auth';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenna, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [button, setButton] = useState(true);

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

  const isPasswordValid = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(contrasenna);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);

    if (!isPasswordValid()) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra y un número.');
    } else {
      setPasswordError('');
    }
  };

  const handleButtonClick = async () => {
    try {
      if (!firstName || !telefono || !email || !contrasenna) {
        alert('Todos los campos son obligatorios.');
        return;
      }

      if (!isPasswordValid()) {
        alert('La contraseña no cumple con los requisitos.');
        return;
      }

      // Desactivar el botón durante el procesamiento
      setButton(false);

      const requestData = {
        name: firstName,
        phone: telefono,
        email: email,
        password: contrasenna,
        isAdmin: false,
      };

      const res = await registerRequest(requestData);
      if (res.status === 200) {
        const token = res.data.token;
        document.cookie = `token=${token}`;
        console.log('Successful registration');
        alert('Registro Exitoso');
      } else {
        console.error('Error on registration', res.data.message);
        alert(`Error en el registro: ${res.data.message}`);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro, revisa los datos y vuelve a intentarlo');
    } finally {
      // Volver a activar el botón después del procesamiento
      setButton(true);
    }
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
              type={showPassword ? 'text' : 'password'}
              value={contrasenna}
              onChange={(e) => handlePasswordChange(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
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
          <button
            className={`btn--outline ${isPasswordValid() ? '' : 'disabled'}`}
            onClick={handleButtonClick}
            disabled={!isPasswordValid()}
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
