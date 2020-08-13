import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { IoIosImage } from 'react-icons/io';
import styled, { ThemeContext } from 'styled-components';
import { StyledButton } from '../styles/StyledComponents';

const ImageFile = ({ uploadFile }) => {
  const fileInput = useRef(null);
  const themeContext = useContext(ThemeContext);

  const onButtonClick = () => {
    fileInput.current.click();
  };

  const handleFileSelect = (event) => {
    uploadFile(event.target.files[0]);
  };

  const handleDragEnter = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDragOver = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const isImage = /^image\//.test(file.type);
    if (isImage) {
      uploadFile(file);
    }
  };

  return (
    <Container
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={fileInput}
        onChange={handleFileSelect}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
      />
      <StyledIcon />
      <span>Drop an image or</span>
      <StyledButton onClick={onButtonClick} type="button" colour={themeContext.colours.primary}>
        Choose a file
      </StyledButton>
    </Container>
  );
};

const Container = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: ${(props) => `2px dashed ${props.theme.colours.primary}`};
  border-radius: 20px;
  padding: 15px 0 15px 0;
  max-width: 800px;
`;

const StyledIcon = styled(IoIosImage)`
  color: ${(props) => props.theme.colours.primary};
  font-size: ${(props) => props.theme.iconSize};
`;

ImageFile.propTypes = {
  uploadFile: PropTypes.func.isRequired,
};

export default ImageFile;
