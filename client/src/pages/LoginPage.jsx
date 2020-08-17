import React from 'react';
import UserForm from '../components/UserForm';
import api from '../services/api';
import styled from 'styled-components';

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

const RegisterPage = () => {
  const login = (username, password) => {
    console.log(`logging in`);
  };

  return (
    <Container>
      <h1>Login</h1>
      <div>
        <Image src='/undraw_add_color_19gv.svg' />
        <UserForm handleButtonClick={login} buttonText={'login'} />
      </div>
    </Container>
  );
};

export default RegisterPage;
