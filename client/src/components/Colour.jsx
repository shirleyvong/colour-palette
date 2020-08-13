import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import hexRgb from 'hex-rgb';

const Colour = ({ colour }) => {
  const toRgb = (hex) => {
    const { red, green, blue } = hexRgb(hex);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <StyledColour colour={colour}>
      <span>{colour}</span>
      <span>{toRgb(colour)}</span>
    </StyledColour>
  );
};

const StyledColour = styled.div`
  width: 100%;
  margin: 5px 0 5px 0;
  background-color: ${(props) => props.colour};
  color: white;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;

  height: 100%;
  min-height: 4rem;

  @media (max-width: 768px) {
    height: 4rem;
  }
`;

Colour.propTypes = {
  colour: PropTypes.string.isRequired,
};

export default Colour;
