import React, {useState, useEffect} from 'react';
import './Main.css';
import Product from '../components/Product';
import image from '../images/product.jpg'

function Main({products, addToBasket}) {

  // const[products, setProducts] = useState([])

  // useEffect(() => {

  //   const api = 'http://localhost:9001/products'

  //   fetch(api)
  //   .then(result => result.json())
  //   .then((result) => {
  //     console.log(result)
  //     setProducts(result.data)
  //   })

  // }, [])

  console.log(products)

  return (
    <div className="Main">
      { products.map((item) => <Product key={item._id} productId={item._id} header={item.header} image={item.image} price={item.price} addToBasket={addToBasket} />) }
    </div>
  );
}

export default Main;