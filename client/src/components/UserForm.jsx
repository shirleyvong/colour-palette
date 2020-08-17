import React, { useState } from 'react';

const UserForm = ({ buttonText, handleButtonClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onButtonClick = (event) => {
    event.preventDefault();
    handleButtonClick(username, password);
  };

  return (
    <form>
      <label>Username</label>
      <input onChange={handleUsernameChange} placeholder="username" />
      <label>Password</label>
      <input onChange={handlePasswordChange} placeholder="password" type="password" />
      <button onClick={onButtonClick}>{buttonText}</button>
    </form>
  );
};

export default UserForm;
