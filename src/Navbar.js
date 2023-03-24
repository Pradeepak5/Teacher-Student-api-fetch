import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div className='Navbar-container'>
      <div className='Navs'>
        <Link style={{color:'red',textDecoration:'none'}} to="/">Student</Link>
        <Link style={{color:'red',textDecoration:'none'}} to="/teacher">Teacher</Link>
      </div>
    </div>
  )
}