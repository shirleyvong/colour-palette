import React from 'react';
import styled from 'styled-components';

const PalettePreview = ({ colours, image, id }) => {
  return (
    <Container>
      <ColourContainer href={`/palettes/${id}`}>
        {colours.map(c => <Colour colour={c} />)}
      </ColourContainer>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 80px;
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px;
`;

const Colour = styled.div`
  background-color: ${(props) => props.colour};
  flex-grow: 1;
`;

const ColourContainer = styled.a`
  display: flex;
  flex-grow: 1;
`;

export default PalettePreview;
