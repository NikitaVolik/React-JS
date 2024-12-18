import React from 'react';
import bcrypt from 'bcryptjs';

function Registration() {

  function Reg() {
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value

    // Хэшируем пароль перед отправкой
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        console.error('Ошибка хэширования пароля', err);
        return;
      }

      const data = {
        login: login,
        password: hash,  // Отправляем хэшированный пароль
        email: email
      };
      console.log(data);

      const api = 'http://localhost:9001/registration';

      fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(result => result.json())
      .then((result) => {
        console.log(result);
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса', error);
      });
    });
  }

  return (
    <>
      <h1>Регистрация</h1>
      <input id='login' type='text' placeholder='Логин' />
      <input id='password' type='password' placeholder='Пароль' />
      <input id='email' type='email' placeholder='Почта' />
      <button onClick={Reg}>Сохранить</button>
    </>
  );
}

export default Registration;
