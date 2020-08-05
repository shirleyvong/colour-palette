import React from 'react';
import styled from 'styled-components';
import ColourPalette from './ColourPalette';

const Results = ({ colours }) => {
  return (
    <Container>
      <Image src="https://images.unsplash.com/photo-1596403387729-1a07549f082a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />
      <ColourPalette colours={colours} />
    </Container>
  );
};

const Image = styled.img`
  width: 300px;
  height: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Results;
