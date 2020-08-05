import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageFile = ({ uploadFile }) => {
  const fileInput = useRef(null);

  const onButtonClick = () => {
    fileInput.current.click();
  };

  const onUpload = (event) => {
    uploadFile(event.target.files[0]);
  };

  return (
    <>
      <input ref={fileInput} onChange={onUpload} type="file" accept="image/*" style={{ display: 'none' }} />
      <span>Drag and drop to upload</span>
      <span>or</span>
      <button onClick={onButtonClick} type="button">Choose a file</button>
    </>
  );
};

ImageFile.propTypes = {
  uploadFile: PropTypes.func.isRequired,
};

export default ImageFile;
