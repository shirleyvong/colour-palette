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
  box-shadow:  0px 0px 40px 0px rgba(0,0,0,0.12), 0px 6px 12px rgba(0,0,0,0.08);
`;

Colour.propTypes = {
  colour: PropTypes.string.isRequired,
};

export default Colour;
