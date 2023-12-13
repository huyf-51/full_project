import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/nav-logo.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" />
    </div>
  )
}

export default Navbar
