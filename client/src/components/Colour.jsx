import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Colour = ({ colour }) => {
  return (
    <Container>
      <StyledColour colour={colour} />
      <span>{colour}</span>
    </Container>
  );
};

const StyledColour = styled.div`
  height: 100px;
  width: 100px;
  margin: 5px;
  background-color: ${(props) => props.colour}
`;

Colour.propTypes = {
  colour: PropTypes.string.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Colour;
