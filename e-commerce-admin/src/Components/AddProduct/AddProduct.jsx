import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";

const AddProduct = () => {
  // state variables
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  });
  
  // Function add product
  const AddProduct = async () => {

    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    // call api to upload the image to server
    await fetch(`${process.env.REACT_APP_SERVER_URL}/product/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => { dataObj = data });

    // if the image upload successfully set the image url and call api to add product
    if (dataObj.success) {
      product.image = dataObj.image_url;
      console.log(product);
      await fetch(`${process.env.REACT_APP_SERVER_URL}/product/addproduct`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? alert("Product Added") : alert("Failed") });

    }
  }

  // set productDetails when state variable change
  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  // set state for image
  const imageHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" value={productDetails.name} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <textarea type="text" name="description" value={productDetails.description} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" value={productDetails.old_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" value={productDetails.new_price} onChange={(e) => { changeHandler(e) }} placeholder="Type here" />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select value={productDetails.category} name="category" className="add-product-selector" onChange={changeHandler}>
          <option value="none">None</option>
          <option value="iphone">Iphone</option>
          <option value="ipad">Ipad</option>
          <option value="mac">Mac</option>
          <option value="watch">Watch</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label for="file-input">
          <img className="addproduct-thumbnail-img" src={!image ? upload_area : URL.createObjectURL(image)} alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e) }} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn" onClick={() => { AddProduct() }}>ADD</button>
    </div>
  );
};

export default AddProduct;
