import React from 'react';
import bcrypt from 'bcryptjs';

function Login() {

  function Log() {
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value

    // Хэшируем пароль перед отправкой
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        console.error('Ошибка хэширования пароля', err);
        return;
      }

      const data = {
        login: login,
        password: hash  // Хэшированный пароль
      };

      const api = 'http://localhost:9001/login';

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
        localStorage.setItem('token', result.token);
      })
      .catch(error => {
        console.error('Ошибка при отправке запроса', error);
      });
    });
  }

  return (
    <>
      <h1>Логин</h1>
      <input id='login' type='text' placeholder='Логин' />
      <input id='password' type='password' placeholder='Пароль' />
      <button onClick={Log}>Войти</button>
    </>
  );
}

export default Login;
