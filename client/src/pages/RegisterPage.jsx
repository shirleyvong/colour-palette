import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserForm from '../components/UserForm';
import api from '../services/api';
import { ReactComponent as Image } from '../images/undraw_color_palette_yamk.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledImage = styled(Image)`
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
        setAuthorizationData(res.auth_token, res.expiry_date, res.username, res.user_id);
        history.push(`/palettes/users/${res.username}`);
        toast.success(`Welcome ${res.username}!`);
      })
      .catch((err) => {
        if (err.response && err.response.status < 500 && err.response.data) {
          toast.error(err.response.data);
        } else {
          toast.error('Something unexpected happened, try again later.');
        }
      });
  };

  return (
    <Container>
      <h1>Register</h1>
      <div>
        <StyledImage />
        <UserForm handleButtonClick={register} buttonText="Register" />
      </div>
    </Container>
  );
};

export default RegisterPage;
