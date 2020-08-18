import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import tinycolor from 'tinycolor2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  width: 100%;
  padding: 10px;
  margin: 5px 0 5px 0;
  background-color: ${(props) => props.colour};
  color: ${(props) => props.textColour};
  border-radius: 10px;
  box-sizing: border-box;
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

  const onCopy = () => {
    toast('🎉 Copied!')
  }

  return (
    <Container>
      { colours.map((colour) => (
        <StyledColour colour={colour} textColour={getTextColour(colour)} key={colour}>
          <CopyToClipboard text={colour}>
            <Text onClick={onCopy}>{colour}</Text>
          </CopyToClipboard>
          {/* <CopyToClipboard text={tinycolor(colour).toRgbString()}>
            <Text onClick={onCopy}>{tinycolor(colour).toRgbString()}</Text>
          </CopyToClipboard> */}
        </StyledColour>
      ))}
    </Container>
  );
};

Colours.propTypes = {
  colours: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Colours;
