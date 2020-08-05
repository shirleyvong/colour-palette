import React from 'react';
import styled from 'styled-components';

const ImageLink = () => {
  return (
    <Container>
      <form>
        <input type="url" placeholder="Enter an image URL" />
      </form>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid black;
  height: 125px;
  width: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ImageLink;
