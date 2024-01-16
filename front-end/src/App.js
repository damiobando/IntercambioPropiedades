import React from 'react';
import NavbarUser from './components/NavbarUser';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/pages/SignUp';
import Footer from './components/Footer'
import Register from './components/pages/Register';
import AddListing from './components/pages/AddListing';
import Preference from './components/pages/Preference';

function App() {
  return (
    <>
       <Router>
      {/* <Navbar /> */}
      <NavbarUser />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/addlisting' element={<AddListing/>} />
        <Route path='/preference' element={<Preference/>} />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;