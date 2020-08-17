import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserForm from '../components/UserForm';
import api from '../services/api';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  max-height: 400px;
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 20px;
`;

const LoginPage = () => {
  const login = (username, password) => {
    console.log('logging in');
  };

  return (
    <Container>
      <h1>Login</h1>
      <div>
        <Image src="/undraw_authentication_fsn5.svg" />
        <UserForm handleButtonClick={login} buttonText="Login" />
      </div>
    </Container>
  );
};

export default LoginPage;
