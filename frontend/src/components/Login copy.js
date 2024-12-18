import React from 'react';
const bcrypt = require('bcrypt');

/*

   // Хэширование пароля
   const password = 'userpassword';
   const saltRounds = 10;

   bcrypt.hash(password, saltRounds, function(err, hash) {
       // Сохраняем hash в базе данных
   });

   // Проверка пароля
   bcrypt.compare(password, hash, function(err, result) {
       if (result) {
           console.log('Password is correct');
       } else {
           console.log('Invalid password');
       }
   });
*/

function Login() {

    function Log() {
        const login = document.getElementById('login').value
        const password = document.getElementById('password').value
        const data = {
            login: login,
            password: password
        }
        console.log(data)
        
        const api = 'http://localhost:9001/login'

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
          localStorage.setItem('token', result.token)
        })
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