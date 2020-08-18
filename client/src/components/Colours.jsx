import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
`;

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
  color: ${(props) => props.textColour};
  border-radius: 10px;
  box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.12), 0px 6px 12px rgba(0,0,0,0.08);
`;

const Text = styled.div`
  &:hover {
    font-weight: bold;
  }
`;

const Colours = ({ colours }) => {
  const getTextColour = (backgroundColour) => () => {
    const colour = tinycolor(backgroundColour);
    if (colour.isDark()) {
      return 'white';
    }
    return 'black';
  };

  return (
    <Container>
      { colours.map((colour) => (
        <StyledColour colour={colour} textColour={getTextColour(colour)} key={colour}>
          <CopyToClipboard text={colour}>
            <Text>{colour}</Text>
          </CopyToClipboard>
          <CopyToClipboard text={tinycolor(colour).toRgbString()}>
            <Text>{tinycolor(colour).toRgbString()}</Text>
          </CopyToClipboard>
        </StyledColour>
      ))}
    </Container>
  );
};

Colours.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Colours;
