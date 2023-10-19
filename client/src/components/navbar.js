import React from 'react';
import '../assets/styles/navbar.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';


const Navbar = ()=>{
    return (
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"> <img className='logo-img' src={logo} alt="logo" /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ">
        <li class="nav-item ">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/about">About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/contact">Contact Us</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/login">Login</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/signup">Register</Link>
        </li>

        <li class="nav-item">
          <Link class="nav-link" to="/logout">Logout</Link>
        </li>
        
      </ul>
    </div>
  </div>
</nav>
    )
}
export default Navbar;
