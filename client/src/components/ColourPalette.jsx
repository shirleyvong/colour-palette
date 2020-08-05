import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colour from './Colour';

const ColourPalette = ({ colours }) => {
  return (
    <Container>
      { colours.map((colour) => <Colour colour={colour} />) }
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

ColourPalette.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColourPalette;
