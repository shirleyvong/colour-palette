import React, { useRef, useContext } from 'react';
import { IoIosImage } from 'react-icons/io';
import styled, { ThemeContext } from 'styled-components';
import { StyledButton } from '../styles/StyledComponents';

const StyledIcon = styled(IoIosImage)`
  color: ${(props) => props.theme.colours.primary};
  font-size: 4rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 2px dashed ${(props) => props.theme.colours.primary};
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
`;

const Info = styled.div`
  color: ${(props) => props.theme.colours.tertiary};
  text-align: center;
  padding-top: 15px;
  font-size: 0.8rem;
`;

const Image = styled.img`
  max-height: 400px
  max-width: 300px;
  width: 100%;
  height: auto;
  margin: 20px;
`;

const FileSelector = ({ uploadFile }) => {
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
      <h3>Drop an image or</h3>
      <StyledButton onClick={onButtonClick} type="button" colour={themeContext.colours.primary}>
        Choose a file
      </StyledButton>
      <Info>
        <div>Maximum file size: 1MB</div>
        <div>Supported types: jpeg, jpg, png</div>
      </Info>
    </Container>
  );
};

export default FileSelector;
