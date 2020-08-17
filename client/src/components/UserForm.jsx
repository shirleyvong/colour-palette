import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledButton as Button } from '../styles/StyledComponents';

const Input = styled.input`
  height: 2rem;
  background: #ececec;
  border: none;
  width: 300px;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 10px;
`;

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
    <Form>
      <Input onChange={handleUsernameChange} placeholder="Username" />
      <Input onChange={handlePasswordChange} placeholder="Password" type="password" />
      <StyledButton onClick={onButtonClick}>{buttonText}</StyledButton>
    </Form>
  );
};

export default UserForm;
