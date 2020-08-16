import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import api from '../services/api';
import Palette from '../components/Palette';
import { StyledButton as Button } from '../styles/StyledComponents';

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

const ViewPalettePage = ({ setBackground }) => {
  const [colours, setColours] = useState([]);
  const [b64Image, setB64Image] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    api.getPalette(id)
      .then((res) => {
        setBackground(`linear-gradient(${res.colours[0]}, ${res.colours[1]}, ${res.colours[2]})`);
        setColours(res.colours);
        setB64Image(res.image);
      })
      .catch((err) => console.log(err));

    return () => setBackground('');
  }, []);

  const deletePalette = () => {
    api.deletePalette(id)
      .then((res) => {
        history.push('/palettes');
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Palette colours={colours} imageSource={`data:image/jpeg;base64,${b64Image}`} />
      <StyledButton onClick={deletePalette}>Delete </StyledButton>
    </Container>
  );
};

export default ViewPalettePage;
