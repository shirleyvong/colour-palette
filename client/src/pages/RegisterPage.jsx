import React from 'react';
import UserForm from '../components/UserForm';

const RegisterPage = () => {
  const register = (username, password) => {
    console.log(`registered ${username}:${password}`);
  };

  return (
    <div>
      <h1>Register</h1>
      <UserForm handleButtonClick={register} buttonText={'Register'} />
    </div>
  );
};

export default RegisterPage;
