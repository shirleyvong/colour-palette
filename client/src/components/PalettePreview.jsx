import React from 'react';
import styled from 'styled-components';

const PalettePreview = ({ colours, id }) => {
  return (
    <Container href={`/palettes/${id}`}>
      {colours.map((colour) => <Colour colour={colour} />)}
    </Container>
  );
};

const Container = styled.a`
  display: flex;
  height: 80px;
  width: 200px;
  border-radius: 20px;
  margin: 10px;
  overflow: hidden;
`;

const Colour = styled.div`
  background-color: ${(props) => props.colour};
  flex-grow: 1;
`;

export default PalettePreview;
