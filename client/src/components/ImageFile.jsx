import React, { useRef } from 'react';
import styled from 'styled-components';

const ImageFile = () => {
  const fileInput = useRef(null);

  const onButtonClick = () => {
    fileInput.current.click();
  };

  const onUpload = (event) => {
    console.log(event.target.value);
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

export default ImageFile;
