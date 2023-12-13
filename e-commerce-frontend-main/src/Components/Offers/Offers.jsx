import React from 'react'
import './Offers.css'
import image1 from '../Assets/maciphone.png'

const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers for you</h1>
            <p>ONLY ON BEST SELLERS</p>
            <button>CHECK NOW</button>
        </div>
        <div className='offers-right'>
            <img src={image1} alt=""></img>
        </div>
    </div>
  )
}

export default Offers