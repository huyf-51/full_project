import React from 'react'
import CartItems from '../Components/CartItems/CartItems'
import LoginSignup from './LoginSignup';

const Cart = () => {
  // update
  const auth = localStorage.getItem("auth-token");
  return (
    <div>
      {/* enter cart route when user logged in*/}
      {auth ? <CartItems/> : <LoginSignup />}
    </div>
  )
}

export default Cart
