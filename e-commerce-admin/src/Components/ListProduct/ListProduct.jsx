import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png'
import edit_icon from '../Assets/edit.png'
import { useNavigate } from "react-router-dom";

const Listproduct = () => {
  const navigate = useNavigate()

  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllproducts(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const removeproduct = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/product/removeproduct`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })

    fetch(`${process.env.REACT_APP_SERVER_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllproducts(data))
  }

  const updateproduct = async (id) => {
    navigate(`/editproduct/${id}`)

    // await fetch(`${process.env.REACT_APP_SERVER_URL}/product/editproduct`, {
    //   method: 'GET',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id: id }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => )
  }

  console.log(allproducts);
  return (
    <div className="listproduct">
      <h1>All products List</h1>
    <div className="listproduct-allproducts">
      <table>
        <thead>
          <tr>
            <th>products</th>
            <th>Title</th>
            <th>Old price</th>
            <th>New price</th>
            <th>Category</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
            {allproducts.map((e) => {
              console.log(e.image)
              return (
                <tr>
                  <td><img className="listproduct-product-icon" src={e.image} alt="" /></td>
                  <td cartitems-product-title>{e.name}</td>
                  <td>{e.old_price}$</td>
                  <td>{e.new_price}$</td>
                  <td>{e.category}</td>
                  <td><img className="listproduct-edit-icon" onClick={() => { updateproduct(e.id) }} src={edit_icon} alt="" /></td>
                  <td><img className="listproduct-remove-icon" onClick={() => { removeproduct(e.id) }} src={cross_icon} alt="" /></td>
                </tr>
              );
            })}
        </tbody>
      </table>
          </div>
    </div>
  );
};

export default Listproduct;
