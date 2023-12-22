import React, { useState } from "react";
import "./EditProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  // useParams to get id of product 
  const { id } = useParams()

  const [previewImage, setPreviewImage] = useState({})
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    new_price: "",
    old_price: ""
  });

  // function to call api to get product details for update
  const editProduct = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/product/editproduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data)
      })
  }

  useEffect(() => {
    if (image) {
      setPreviewImage(URL.createObjectURL(image))
    }
  }, [image])

  // call api in the initial render
  useEffect(() => {
    editProduct()
  }, [])

  // function to update product
  const UpdateProduct = async () => {

    let dataObj;
    let product = productDetails;

    if (image) {
      let formData = new FormData();
      formData.append('product', image);

      // call api upload image
      await fetch(`${process.env.REACT_APP_SERVER_URL}/product/upload`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => { dataObj = data });
      if (dataObj.success) {
        product.image = dataObj.image_url;
        console.log(product);

        // call api to update product after edit info in case image change
        await fetch(`${process.env.REACT_APP_SERVER_URL}/product/updateproduct/${id}`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => { data.success ? alert("Product Updated") : alert("Failed") });
      }
    } else {
      // call api to update product after edit info in case image not change
      await fetch(`${process.env.REACT_APP_SERVER_URL}/product/updateproduct/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => { data.success ? alert("Product Updated") : alert("Failed") });
    }
  }

  // image set state when product details change
  const changeHandler = (e) => {
    console.log(e);
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  }

  // set image state when image change
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setProductDetails((pre) => {
      return {...pre, image: ""}
    })
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
          <img className="addproduct-thumbnail-img" src={productDetails.image || previewImage} alt="" />
        </label>
        <input onChange={(e) => { imageHandler(e) }} type="file" name="image" id="file-input" hidden />
      </div>
      <button className="addproduct-btn" onClick={() => { UpdateProduct() }}>UPDATE</button>
    </div>
  );
};

export default EditProduct;
