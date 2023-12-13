import React, { useContext, useState, useEffect, useRef } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [showDropdown, setShowDropdown] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);
    const authToken = localStorage.getItem('auth-token');
    const userName = localStorage.getItem('username');
    // Dropdown
    const [showOptions, setShowOptions] = useState(false);


    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('username');
        window.location.replace("/");
    };

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDropdownOptionSelect = (selectedOption) => {
        setMenu(selectedOption);
        setShowDropdown(false);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <Link style={{ textDecoration: 'none' }} to='/'><p onClick={() => { setMenu("shop") }}>TOPSHIU</p> </Link>
            </div>

            <div className="dropdown-button" onClick={toggleOptions}>
                <span>&#9776;</span>
                <span className="menu-text">Menu</span>
            </div>

            <ul className={`nav-menu ${showOptions ? "show-options" : "collapsed"}`}>
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Menu</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("iPhone") }}><Link style={{ textDecoration: 'none' }} to='/Iphone'>Iphone</Link>{menu === "iPhone" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("iPad") }}><Link style={{ textDecoration: 'none' }} to='/Ipad'>Ipad</Link>{menu === "iPad" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Mac") }}><Link style={{ textDecoration: 'none' }} to='/Mac'>Mac</Link>{menu === "Mac" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Watch") }}><Link style={{ textDecoration: 'none' }} to='/Watch'>Watch</Link>{menu === "Watch" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("Promotion") }}><Link style={{ textDecoration: 'none' }} to='/Promotion'>Promotion</Link>{menu === "Promotion" ? <hr /> : <></>}</li>
                {/* <li onClick={() => { setMenu("Support") }}><Link style={{ textDecoration: 'none' }} to='/Support'>Support</Link>{menu === "Support" ? <hr /> : <></>}</li> */}
            </ul>
            <div className="nav-login-cart">
                {authToken ? (
                    <div ref={dropdownRef} className="dropdown">
                        <button className="dropdown-toggle" onClick={handleDropdownToggle}>
                            {userName}
                        </button>
                        {showDropdown && (
                            <ul className="dropdown-menu">
                                
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <button>Login</button>
                    </Link>
                )}
                <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;