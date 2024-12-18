import React from 'react';
import './Product.css';

function Product({header, image, price, productId, addToBasket}) {
  return (
    <div className="Product">
      <img alt='' src={image} />
      <h1>{header}</h1>
      <p>{`${price} руб`}</p>
      <button onClick={() => addToBasket(productId)}>В корзину</button>
    </div>
  );
}

export default Product;