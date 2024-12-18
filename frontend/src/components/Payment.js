import React from 'react';

function Payment() {

    function Pay() {
        const number = document.getElementById('number').value
        const code = document.getElementById('code').value
        const month = document.getElementById('month').value
        const year = document.getElementById('year').value
        const data = {
            number: number,
            code: code,
            month: month,
            year: year
        }
        console.log(data)
        
        const api = 'http://localhost:9001/payment'

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
        })
    }

  return (
    <>
      <h1>Данные карты</h1>
      <input id='number' type='text' placeholder='Номер' />
      <input id='code' type='password' placeholder='Код' />
      <input id='month' type='string' placeholder='Месяц' />
      <input id='year' type='number' placeholder='Год' />
      <button onClick={Pay}>Оплатить</button>
    </>
  );
}

export default Payment;