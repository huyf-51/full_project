import React from 'react'
import './Hero.css' 
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
// import hero_image from '../Assets/hero_image.png'

// import iphone from '../Assets/iphone.png'
import iphone15 from '../Assets/Apple15.png'

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>New Arrival Only</h2>
            <div>
                <div className='hero-hand-icon'>
                    <p>New</p>
                    <img src={hand_icon} alt=""/>
                </div>
                <p>Collections</p>
                <p>for everyone</p>
            </div>
            <div className='hero-latest-btn'>
            <div>Latest Collection</div>
            <img src={arrow_icon} alt=''/>
        </div>
        </div>
        <div className='hero-right'>
            <img src={iphone15} alt=''/>
        </div>
    </div>
  )
}

export default Hero