import React, { useState } from "react";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  // state variable
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // change form data when state change
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // function to call api to log in
  const login = async () => {

    let dataObj;
    await fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });
    console.log(dataObj);


    if (dataObj.success) {
      // set 2 variable to localStorage when log in success
      localStorage.setItem('auth-token', dataObj.token);
      localStorage.setItem('username', dataObj.userName);
      window.location.replace("/");
    }
    else {
      alert(dataObj.errors)
    }
  }

  // function to call api to sign up

  const signup = async () => {
    // validate the form when user doesnot input anything
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    // validate the email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // validate the password
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // Password validation: Check if password has at least one uppercase letter
    if (!/[A-Z]/.test(formData.password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    // Password validation: Check if password has at least one special character
    if (!/[@#$%^&+=!*]/.test(formData.password)) {
      alert("Password must contain at least one special character.");
      return;
    }

    // Password validation: Check if password has at least one digit
    if (!/\d/.test(formData.password)) {
      alert("Password must contain at least one digit.");
      return;
    }
    let dataObj;

    // call api to sign up
    await fetch(`${process.env.REACT_APP_API}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });

    if (dataObj.success) {
      localStorage.setItem('auth-token', dataObj.token);
      localStorage.setItem('username', dataObj.userName);
      window.location.replace("/");
    }
    else {
      alert(dataObj.errors)
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input type="text" placeholder="Your name" name="username" value={formData.username} onChange={changeHandler} /> : <></>}
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>

        {state === "Login"
          ? <button onClick={() => { login() }}>Continue</button>
          : <button onClick={() => { signup() }}>Continue</button>}

        {state === "Login" ?
          <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>
          : <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>}
      </div>
    </div>
  );
};

export default LoginSignup;
