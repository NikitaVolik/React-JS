import React from 'react';
import './Private.css';

function Private() {
  
  function save() {
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
    const email = document.getElementById('email').value
    const newPassword = document.getElementById('new-password').value
    const data = {
        login: login,
        password: password,
        email: email,
        newPassword: newPassword
    }
    
    const api = 'http://localhost:9001/private'

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
    <div className="Private">
        <h1>Личный кабинет</h1>
        <input id='login' type='text' placeholder='Логин' />
        <input id='password' type='password' placeholder='Пароль' />
        <input id='email' type='email' placeholder='Почта' />
        <input id='new-password' type='password' placeholder='Новый пароль' />
        <button onClick={save}>Сохранить</button>
    </div>
  );
}

export default Private;