import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Palette from '../components/Palette';
import { StyledButton as Button } from '../styles/StyledComponents';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 10px 10px 0px 10px;
`;

const Author = styled.span`
  margin: 10px;
`;

const ViewPalettePage = ({ isAuthenticated: checkAuth, authData }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [author, setAuthor] = useState('');
  const [colours, setColours] = useState([]);
  const [b64Image, setB64Image] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsAuthenticated(checkAuth(authData));
  }, [authData, checkAuth])

  useEffect(() => {
    api.getPalette(id)
      .then((res) => {
        setColours(res.colours);
        setB64Image(res.image);
        setAuthor(res.username);
      })
      .catch((err) => {
        toast.error('Something unexpected happened, try again later.');
      });
  }, [id]);

  const deletePalette = () => {
    if (isAuthenticated && authData.username === author) {
      api.deletePalette(id, authData.authToken)
        .then((res) => {
          history.push(`/palettes/users/${res.username}`);
        })
        .catch((err) => {
          toast.error('Something unexpected happened, try again later.');
        });
    };  
  }

  return (
    <Container>
      <Author>By {author}</Author>
      <Palette colours={colours} imageSource={`data:image/jpeg;base64,${b64Image}`} />
      {isAuthenticated && authData.username === author && (
        <StyledButton onClick={deletePalette}>Delete</StyledButton>
      )}
    </Container>
  );
};

export default ViewPalettePage;
