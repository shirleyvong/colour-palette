import React from 'react';
import styled from 'styled-components';
import ColourPalette from './ColourPalette';

const Results = ({ colours, imageURL }) => {
  return (
    <Container>
      <h1>Colour Palette</h1>
      <Image src={imageURL} />
      <ColourPalette colours={colours} />
    </Container>
  );
};

const Image = styled.img`
  max-width: 300px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Results;
