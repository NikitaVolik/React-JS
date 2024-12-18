import React from 'react';
import './Basket.css';

function Basket({products, deleteFromBasket, setModalBox}) {
  const totalCount = () => products.reduce((count, product) => count += product.price, 0);
  const renderTotalCount = () => totalCount() ? `${totalCount()} руб.` : '';

  return (
    <div className="Basket">
      <h1>Корзина</h1>
      {renderTotalCount()}
      <div className='BasketProduct'>
        { products.map(({header, price, image, _id}) => <div className="Product" key={_id}>
          <img alt='' src={image} />
          <h1>{header}</h1>
          <p>{`${price} руб`}</p>
          <button onClick={() => deleteFromBasket(_id)}>Удалить из корзины</button>
        </div>) }
      </div>
      {products.length > 0 && ( // Условие для отображения кнопки
        <button className='btn' onClick={() => setModalBox('Payment')}>Оформление заказа</button>
      )}
    </div>
  );
}

export default Basket;