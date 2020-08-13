import React, {} from 'react';
import styled from 'styled-components';
import ColourPalette from '../components/ColourPalette';
import { StyledButton } from '../styles/StyledComponents';

const colours = ['#e27d60', '#85dcb0', '#e8a87c', '#c38d9e', '#41b3a3'];

const PalettePage = () => {
  return (
    <Container>
      <InnerContainer>
        <h1>Colour Palette</h1>
        <Content>
          <Image src="https://images.unsplash.com/photo-1597286039335-b0d08ca3fd56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
          <ColourPalette colours={colours} />
        </Content>
        <ButtonContainer>
          <StyledButton>Save</StyledButton>
          <StyledButton>New</StyledButton>
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
  background: rgb(195,141,158);
  background: linear-gradient(42deg, rgba(195,141,158,1) 0%, rgba(226,125,96,1) 33%, rgba(232,168,124,1) 57%, rgba(65,179,163,1) 85%, rgba(133,220,176,1) 100%);
`;

const InnerContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px 20px 20px;
  max-width: 768px;
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
    flex-direction: row;
  }
`;

const Image = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 400px;
  max-height: 300px;
  
  @media (min-width: 768px) {
    margin-right: 10px;
  }
`;

export default PalettePage;
