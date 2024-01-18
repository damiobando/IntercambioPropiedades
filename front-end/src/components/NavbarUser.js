import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import jsc from 'js-cookie';

function NavbarUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const closeMobileMenu = () => setClick(false);

  const shouldRenderNavbar = () => {
    const excludedRoutes = ['/sign-up'];
    return !excludedRoutes.includes(location.pathname);
  };
  const handleLogout = () => {
    // Eliminar la cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Redirigir a la página de inicio de sesión u otra página deseada
    navigate('/sing-up'); // Cambia '/login' con la ruta a la que quieras redirigir
  };

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

  useEffect(() => {
    window.addEventListener('resize', showButton);

    return () => {
      // Limpiar el evento del resize al desmontar el componente
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <>
      {shouldRenderNavbar() && (
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img src='./images/LogoIntercambio.png' style={{ width: '100px', height: 'auto' }} alt="Logo" />
            </Link>
            <div className='menu-icon' onClick={() => setClick(!click)}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/listings'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Propiedades
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact-us'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Contáctenos
              </Link>
            </li> 
            <li className='nav-item'>
              <Link
                to='/notifications'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Notificaciones
              </Link>
            </li>    
            <Dropdown>
            <MenuButton>Mi Cuenta</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
                <Link to="/myaccount">
                <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
                </Link>
                <Link to="/preference">
                  <MenuItem onClick={createHandleMenuClick('Language settings')}>
                Preferences
                </MenuItem>
                </Link>
                <Link to="/sign-up"> 
                <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
                </Link>
            </Menu>
            </Dropdown>
            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>

          </ul>
          <Link to="/addlisting">
            <button className='btn--outline'>AGREGAR PROPIEDAD</button>
          </Link>
        </div>
      </nav>
      )}
    </>
  );
}

const Listbox = styled('ul')(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
    z-index: 1;
  `,
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;

    &:last-of-type {
      border-bottom: none;
    }

    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === 'dark' ? '#003A75' : '#F0F7FF'};
      color: ${theme.palette.mode === 'dark' ? '#C2E0FF' : '#003A75'};
    }
  `,
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-size: 1.2rem;
    line-height: 1.5;
    padding: 8px 16px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? '#003A75' : '#fff'};
    border: 0px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
    color: #000000;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      border-bottom: 4px solid #f67130;
      transition: all 0.2s ease-out;
    }
  `,
);

export default NavbarUser;
