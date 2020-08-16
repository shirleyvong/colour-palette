import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../services/api';
import styled from 'styled-components';
import ColourPalette from '../components/ColourPalette';
import PalettePage from '../pages/PalettePage';

const Container = styled.div`
  background: ${(props) => props.colours[0]};
  background: ${(props) => (
    `linear-gradient(to right, ${props.colours[0]}, ${props.colours[1]}, ${props.colours[2]})
  `)};
  height: 100%;
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  max-width: 640px;
`;

const TestPage = () => {
  const [colours, setColours] = useState([]); 
  const [b64Image, setB64Image] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    api.getPalette(id)
      .then((res) => {
        setColours(res.colours);
        setB64Image(res.image);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePalette = () => {
    api.deletePalette(id)
      .then((res) => {
        history.push('/palettes');
      })
      .catch((err) => console.log(err));
  }

  const buttons = [
    {
      text: 'Delete',
      onClick: deletePalette,
      colour: undefined,
    }
  ]

  return (
    <PalettePage colours={colours} imageURL={`data:image/jpeg;base64,${b64Image}`} buttons={buttons}/>
    // <Container colours={colours}>
    //   <InnerContainer>

    //     {b64Image && <img src={`data:image/jpeg;base64,${b64Image}`} />}
    //     {colours}
    //     <ColourPalette colours={colours} />
    //   </InnerContainer>
    // </Container>
  );
}

export default TestPage;
