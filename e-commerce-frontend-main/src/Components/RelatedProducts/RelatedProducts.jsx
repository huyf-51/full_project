import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { useParams } from 'react-router-dom'

const RelatedProducts = () => {
  // get id of product
  const { productId } = useParams()
  const [relatedProduct, setRelatedProduct] = useState([])

  useEffect(() => {
    // call api to get related products
    fetch(`${process.env.REACT_APP_API}/relatedproduct/${productId}`)
      .then((res) => res.json())
      .then((data) => {setRelatedProduct(data)
        console.log("data: ", data);
      })
  }, [])
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {/* show all related products */}
        {relatedProduct.map((item)=>{
            return <Item id={item.id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
