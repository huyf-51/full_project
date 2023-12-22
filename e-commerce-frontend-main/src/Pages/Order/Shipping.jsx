import React, { useState } from "react";
import '../CSS/Shipping.css'
import { useNavigate } from "react-router-dom";

const Shipping = () => {

  // state variable
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [PhoneNumber, setPhonenumber] = useState("");

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Basic validation: Check if required fields are not empty
    if (!name || !address || !province || !PhoneNumber) {
      alert("Please fill in all required fields");
      return; // Exit the function if validation fails
    }
  
    // Phone number validation: Check if PhoneNumber contains only numeric characters
    const phoneNumberRegex = /^[0-9]+$/;
    if (!phoneNumberRegex.test(PhoneNumber)) {
      alert("Please enter a valid phone number (numeric characters only)");
      return; // Exit the function if validation fails
    }
  
    // Check if PhoneNumber has exactly 10 digits
    if (PhoneNumber.length !== 10) {
      alert("Phone number must be 10 digits");
      return; // Exit the function if validation fails
    }
  
    // Proceed with navigation if validation passes
    navigate(`/checkout?name=${name}&address=${address}&province=${province}&phoneNumber=${PhoneNumber}`);
  };
  
  

  return (
    <div className="shipping-container">
      <h2>Shipping Information</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            
          />
        </label>

        <label>
          Province:
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            value={PhoneNumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            
          />
        </label>

        <button type="submit" onClick={handleSubmit} className="button-shipping">
               Submit
        </button>
      </form>
    </div>
  );
};

export default Shipping;