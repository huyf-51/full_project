import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { useParams } from 'react-router-dom'

const RelatedProducts = () => {
  const { productId } = useParams()
  const [relatedProduct, setRelatedProduct] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/relatedproduct/${productId}`)
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
        {relatedProduct.map((item)=>{
            return <Item id={item.id} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
