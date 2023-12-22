import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {

  // limit product in every page
  let limit = 4;

  // state variable
  const [allproducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [productCount, setProductCount] = useState()

  // call api to get product for each page by product category and page number
  const fetchInfo = async (page) => {
    await fetch(`${process.env.REACT_APP_API}/${props.category}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products)
        setProductCount(data.productCount)
      })
  }

  // reset page when enter to other category
  useEffect(() => {
    setPage(1)
    fetchInfo(1);
  }, [props.category])

  // call api again when change category and page number
  useEffect(() => {
    fetchInfo(page);
  }, [page, props.category])
  
  // set page when it change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div className="shopcategory">
      <img src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing {productCount === 0 ? 0 : (page - 1) * limit + 1} - {productCount / page < limit ? productCount : page * limit}</span> out of {productCount} Products</p>
      </div>
      <div className="shopcategory-products">
        {allproducts.map((item, i) => {
          return <Item id={item.id} key={i} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
        })}
      </div>
      <div className="shopcategory-pagination">
        <button className="pagination-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <button className="pagination-btn" onClick={() => handlePageChange(page + 1)} disabled={productCount / page <= limit}>Next</button>
      </div>
    </div>
  );
};

export default ShopCategory;
