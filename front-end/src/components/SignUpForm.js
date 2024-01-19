import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { loginRequest } from '../api/auth';
import './SignUpForm.css';
function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState('success'); // Por defecto, success
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const showAlert = (message, severity = 'success') => {
    setAlert(message);
    setAlertSeverity(severity);

    // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const handleSignIn = async () => {
    try {
      const res = await loginRequest({ email, password });

      if (res.status === 200) {
        // Login exitoso
        const token = res.data.token;
        document.cookie = `token=${token}`;
        showAlert('Login successful', 'success');

        // Verificar si el usuario es administrador
        const isAdmin = res.data.isAdmin;
        console.log('isAdmin:', isAdmin);

        // Realizar la navegación después de mostrar la alerta
        setTimeout(() => {
          navigate(isAdmin ? '/admin' : '/listings');
        }, 3000);
      } else {
        // Error en el login
        console.error('Error en el login:', res.data.message);
        showAlert(`Error: ${res.data.message}`, 'error');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      showAlert('Datos incorrectos', 'error');
    }
  };

  return (
    <div className='main-conatiner '>
      <div className='signUp_container'>
        <div className='input_form_login'>
          <h1>Sign In to your Account</h1>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField
                id='input-with-sx'
                label='Email'
                variant='standard'
                value={email}
                onChange={handleUsernameChange}
              />
            </Box>
            <FormControl sx={{ m: 1, width: '25ch' }} variant='standard'>
              <InputLabel htmlFor='standard-adornment-password'>Contraseña</InputLabel>
              <Input
                id='standard-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
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
            <button className='btn--outline' onClick={handleSignIn}>
              SIGN IN
            </button>
          </div>
          <div style={{ marginTop: '20px' }}>
          {alert && (
            <Alert severity={alertSeverity}>
              <AlertTitle>{alertSeverity === 'success' ? 'Success' : 'Error'}</AlertTitle>
              {alert}
            </Alert>
          )}
        </div>
        </div>
        <div className='register_container'>
          <h1> No tienes cuenta todavía?</h1>
          <p>Crea una ahorita mismo</p>
          <div className='btn_register'>
            <Link to="/register">
              <button className='btn-outline' to='/register'>
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
