import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageLink = ({ uploadURL }) => {
  const [input, setInput] = useState('');

  const handleInput = (event) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleButtonClick = async () => {
    if (input === '') {
      return;
    }

    // TODO: verify URL is an image, either client or server side
    uploadURL(input);
  };

  return (
    <>
      <form>
        <input onChange={handleInput} type="url" placeholder="Enter an image URL" />
        <button onClick={handleButtonClick} type="button">Submit</button>
      </form>
    </>
  );
};

ImageLink.propTypes = {
  uploadURL: PropTypes.func.isRequired,
};

export default ImageLink;
