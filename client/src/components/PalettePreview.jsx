import React from 'react';
import styled from 'styled-components';

// const colours = ['#2b251c', '#f2f0f2', '#e0e0e0', '#c4beb7', '#9a9287'];

const PalettePreview = ({ colours, image }) => {
  return (
    <Container>
      <ImageWrapper>
        <Image src="https://images.unsplash.com/photo-1597151234193-03890c44b69a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
      </ImageWrapper>
      <ColourContainer>
        {colours.map(c => <Colour colour={c} />)}
      </ColourContainer>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  background-color: red;
  width: 300px;
  height: 300px;
  
  ${'' /* border-radius: 20px; */}
  ${'' /* overflow: hidden; */}
  margin: 10px;
`;

const Colour = styled.div`
  background-color: ${(props) => props.colour};
  flex-grow: 1;
`;

const ColourContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ImageWrapper = styled.div`
  height: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;


export default PalettePreview;
