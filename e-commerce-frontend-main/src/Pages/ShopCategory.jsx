import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {

  let limit = 4;

  const [allproducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1)
  const [productCount, setProductCount] = useState()
  //update
  const fetchInfo = async (page) => {
    await fetch(`http://localhost:4000/${props.category}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.products)
        setProductCount(data.productCount)
      })
  }

  useEffect(() => {
    setPage(1)
    fetchInfo(1);
  }, [props.category])

  useEffect(() => {
    fetchInfo(page);
  }, [page, props.category])
  //update
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
