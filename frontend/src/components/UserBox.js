import React from 'react';
import './UserBox.css';

function UserBox({setModalBox}) {
  return (
    <div className="UserBox">
      <button className='btn' onClick={() => setModalBox('Login')}>Вход</button>
      <button className='btn' onClick={() => setModalBox('Registration')}>Регистрация</button>
      <button className='btn' onClick={() => setModalBox('Loading')}>Загрузка</button>
    </div>
  );
}

export default UserBox;