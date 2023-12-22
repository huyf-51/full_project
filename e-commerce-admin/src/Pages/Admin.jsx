import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListProduct/ListProduct";
import EditProduct from "../Components/EditProduct/EditProduct";

const Admin = () => {

  return (
    <div className="admin">
      <Sidebar />
      {/* routing url for three route*/}
      <Routes>
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
