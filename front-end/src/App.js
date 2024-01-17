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
import MyAccount from './components/pages/MyAccount';
import UserReport from './components/pages/UserReport';
import NewOffer from './components/pages/NewOffer';
import UserFeedback from './components/pages/UserFeedback';
import Listings from './components/pages/Listings';
import Offer from './components/pages/Offer';
import ListingInfo from './components/pages/ListingInfo';

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
        <Route path='/myaccount' element={<MyAccount/>} />
        <Route path= '/report' element={<UserReport/>}/>
        <Route path= '/offer' element={<NewOffer/>}/>
        <Route path= '/feedback' element={<UserFeedback/>}/>
        <Route path='/listings' element={<Listings/>} />
        <Route path='/newOffer' element={<Offer/>} />
        <Route path='/propertyInfo' element={<ListingInfo/>} />
      </Routes>
      <Footer />
      </Router>
    </>
  );
}

export default App;