import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const location = useLocation(); // Hook de react-router para obtener la ruta actual

  const excludedRoutes = ['/sign-up', '/exampleRoute', '/anotherExcludedRoute'];
  const shouldRenderNavbar = !excludedRoutes.includes(location.pathname);

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

  useEffect(() => {
    window.addEventListener('resize', showButton);

    return () => {
      // Limpiar el evento del resize al desmontar el componente
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <>
      {shouldRenderNavbar && (
        <nav className='navbar'>
          <div className='navbar-container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <img src='./images/LogoIntercambio.png' style={{ width: '100px', height: 'auto' }} alt="Logo" />
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
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Registrate / Inicio de Sesión
                </Link>
              </li>
              <li>
                <Link
                  to='/sign-up'
                  className='nav-links-mobile'
                  onClick={closeMobileMenu}
                >
                  Sign Up / Login
                </Link>
              </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>AGREGAR PROPIEDAD</Button>}
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
