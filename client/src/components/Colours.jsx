import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import hexRgb from 'hex-rgb';

const StyledColour = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: 5px 0 5px 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.colour};
  color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.12), 0px 6px 12px rgba(0,0,0,0.08);
`;

const Colours = ({ colours }) => {
  const toRgb = (hex) => {
    const { red, green, blue } = hexRgb(hex);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <Container>
      { colours.map((colour) => (
        <StyledColour colour={colour}>
          <span>{colour}</span>
          <span>{toRgb(colour)}</span>
        </StyledColour>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
`;

Colours.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Colours;
