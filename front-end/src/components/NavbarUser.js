import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';



import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

function NavbarUser() {

    const createHandleMenuClick = (menuItem) => {
        return () => {
          console.log(`Clicked on ${menuItem}`);
        };
      };

    const handleClick = (event) => {
      setClick(!click);
    };

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src='./images/LogoIntercambio.png' style={{ width: '100px', height: 'auto' }}/>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Inicio
              </Link>
            </li>
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
                to='/contact-us'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Mi Cuenta
              </Link>
            </li>    
            <Dropdown>
            <MenuButton>My account</MenuButton>
            <Menu slots={{ listbox: Listbox }}>
                <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
                <MenuItem onClick={createHandleMenuClick('Language settings')}>
                Language settings
                </MenuItem>
                <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
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
          {button && <Button buttonStyle='btn--outline'>AGREGAR PROPIEDAD</Button>}
        </div>
      </nav>
    </>
  );
}


  
  const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
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
      color: ${theme.palette.mode === 'dark' ? '#C2E0FF' :'#003A75'};
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
    border: 0px solid ${theme.palette.mode === 'dark' ? '#434D5B' :'#DAE2ED'};
    color: #000000;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
        border-bottom: 4px solid #f67130;
        transition: all 0.2s ease-out;
    }
    `,
  );


export default NavbarUser;