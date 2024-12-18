import React from 'react';

function Loading({onLoading}) {

    function Load() {
        const header = document.getElementById('header').value
        const price = document.getElementById('price').value
        const image = document.getElementById('image').value
        const data = {
            header: header,
            price: price,
            image: image
        }
        console.log(data)

        const api = 'http://localhost:9001/loading'

        fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(result => result.json())
        .then((result) => {
          console.log(result)
          onLoading();
        })
    }

  return (
    <>
      <h1>Новый товар</h1>
      <input id='header' type='string' placeholder='Наименование' />
      <input id='price' type='number' placeholder='Цена' />
      <input id='image' type='string' placeholder='Фото' />
      <button onClick={Load}>Добавить</button>
    </>
  );
}

export default Loading;