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
  const register = (username, password) => {
    console.log(`registered ${username}, ${password}`);
  };

  return (
    <Container>
      <h1>Register</h1>
      <div>
        <Image src='/undraw_color_palette_yamk.svg' />
        <UserForm handleButtonClick={register} buttonText={'Register'} />
      </div>
    </Container>
  );
};

export default RegisterPage;
