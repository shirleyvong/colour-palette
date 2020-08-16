import React from 'react';
import styled from 'styled-components';
import ColourPalette from '../components/ColourPalette';
import { StyledButton } from '../styles/StyledComponents';

const PalettePage = ({ imageURL, colours, buttons }) => {
  return (
    <Container colours={colours}>
      <InnerContainer>
        {/* <h1>Colour Palette</h1> */}
        <Content>
          <Image src={imageURL} />
          <ColourPalette colours={colours} />
        </Content>
        <ButtonContainer>
          {buttons && buttons.map((btn) => (
            <StyledButton colour={btn.colour} onClick={btn.onClick}>{btn.text}</StyledButton>
          ))}
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
  background: ${(props) => props.colours[0]};
  background: ${(props) => `linear-gradient(to right, ${props.colours[0]}, ${props.colours[1]}, ${props.colours[2]})`}; 
  transition: background-color 5s ease;
  height: 100%;
  box-sizing: border-box;
  transition: opacity 0.5s ease-out;
`;

const InnerContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  padding: 20px;
  max-width: 768px;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: column;
  }
`;


const Image = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 400px;
  max-height: 300px;
  
  width: 100%;
  height: auto;

  @media (min-width: 768px) {
    margin-right: 10px;
  }
`;

export default PalettePage;
