import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageFile = ({ uploadFile }) => {
  const fileInput = useRef(null);

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
    uploadFile(file);
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
      <span>Drag and drop to upload</span>
      <span>or</span>
      <button onClick={onButtonClick} type="button">Choose a file</button>
    </Container>
  );
};

const Container = styled.div`
  height: inherit;
  width: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;

ImageFile.propTypes = {
  uploadFile: PropTypes.func.isRequired,
};

export default ImageFile;
