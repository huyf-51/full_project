import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Menu = () => {
  // state variable
  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  // call api to get product 
  const fetchInfo = () => { 
    fetch(`${process.env.REACT_APP_API}/popular`) 
            .then((res) => res.json()) 
            .then((data) => setPopular(data))
    fetch(`${process.env.REACT_APP_API}/newcollections`) 
            .then((res) => res.json()) 
            .then((data) => setNewCollection(data))
    }

    useEffect(() => {
      fetchInfo();
    }, [])


  return (
    <div>
      <Hero/>
      <Popular data={popular}/>
      <Offers/>
      <NewCollections data={newcollection}/>
      <NewsLetter/>
    </div>
  )
}

export default Menu
