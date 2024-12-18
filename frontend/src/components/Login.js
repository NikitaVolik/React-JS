import React, { useState } from 'react';

function Login() {
    // Состояние для хранения сообщений
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');  // Тип сообщения: success или error

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
        .then((result) => result.json())
        .then((result) => {
 
          // Если регистрация успешна
          if (result.message === 'Вы успешно авторизовались!') {
            setMessage(result.message);  // Сообщение об успешной авторизации
            setMessageType('success');
            console.log(result)
          } else {
            setMessage(result.message || 'Ошибка авторизации');
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
      <h1>Логин</h1>
      <input id="login" type="text" placeholder="Логин" />
      <input id="password" type="password" placeholder="Пароль" />
      <button onClick={Log}>Войти</button>

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

export default Login;