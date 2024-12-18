import React, { useState } from 'react';

function Registration() {
  // Состояние для хранения сообщений
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // Тип сообщения: success или error

  // Функция регистрации
  function Reg() {
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    const data = {
      login: login,
      password: password,
      email: email,
    };

    console.log(data);

    const api = 'http://localhost:9001/registration';

    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((result) => {
        console.log(result);

        // Если регистрация успешна
        if (result.message === 'Вы успешно зарегистрировались!') {
          setMessage(result.message);  // Сообщение об успешной регистрации
          setMessageType('success');
        } else {
          setMessage(result.message || 'Ошибка регистрации');
          setMessageType('error');
        }
      })
      .catch((error) => {
        setMessage('Ошибка при подключении к серверу');
        setMessageType('error');
        console.error(error);
      });
  }

  return (
    <div>
      <h1>Регистрация</h1>
      <input id="login" type="text" placeholder="Логин" />
      <input id="password" type="password" placeholder="Пароль" />
      <input id="email" type="email" placeholder="Почта" />
      <button onClick={Reg}>Сохранить</button>

      {/* Показываем сообщение об успехе или ошибке */}
      {message && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            color: messageType === 'success' ? 'green' : 'red',
            // color: 'white',
            borderRadius: '5px',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Registration;
