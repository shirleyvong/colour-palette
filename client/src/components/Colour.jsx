import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Colour = ({ colour }) => {
  return (
    <div>
      <StyledColour colour={colour} />
      <span>{colour}</span>
    </div>
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

export default Colour;
