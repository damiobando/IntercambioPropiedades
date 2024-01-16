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
import Alert from './Alert'; 

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [contrasenna, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [alert, setAlert] = useState(null);

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

  const showAlert = (message) => {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  window.addEventListener('resize', showButton);
  const handleButtonClick = async () => {
    try {
      const requestData = {
        name: firstName,
        phone: telefono,
        email: email,
        password: contrasenna
      };

      const res = await registerRequest(requestData)
      if (res.status === 200) {
        // Registro exitoso
        const token = res.data.token;
        document.cookie = `token=${token}`;
        console.log('Successful registration');
        showAlert('Registro Exitoso');
      } else {
        // Error en el registro
        console.error('Error on registration', res.data.message);
        showAlert(`Error en el registro: ${res.data.message}`);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      showAlert('Error en el registro, revisa los datos y vuelve a intentarlo');
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
              type='contrasenna'
              value={contrasenna}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </div>
        {alert && <Alert message={alert} onClose={() => setAlert(null)} />}
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
