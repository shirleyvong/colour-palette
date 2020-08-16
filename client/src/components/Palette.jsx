import React from 'react';
import styled from 'styled-components';
import Colours from './Colours';

const Palette = ({ imageSource, colours }) => {
  return (
    <Content>
      <Image src={imageSource} />
      <Colours colours={colours} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 10px;
  margin-bottom: 10px;
  max-width: 400px;
  max-height: 300px;
`;

export default Palette;
