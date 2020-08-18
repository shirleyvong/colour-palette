import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

const RegisterPage = ({ isAuthenticated, setAuthorizationData, authData }) => {
  const history = useHistory();

  useEffect(() => {
    // Redirect to user page if already logged in
    if (isAuthenticated()) {
      history.push(`/palettes/${authData.userID}`);
    }
  }, [authData, history, isAuthenticated]);

  const register = (username, password) => {
    api.register(username, password)
      .then((res) => {
        setAuthorizationData(res.auth_token, res.expiry_date, res.user_id, res.username);
        history.push(`/palettes/users/${res.username}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <h1>Register</h1>
      <div>
        <Image src="/undraw_color_palette_yamk.svg" />
        <UserForm handleButtonClick={register} buttonText="Register" />
      </div>
    </Container>
  );
};

export default RegisterPage;
