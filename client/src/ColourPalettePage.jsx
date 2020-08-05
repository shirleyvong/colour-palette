import React, { useState } from 'react';
import ImageSelect from './components/ImageSelect';
import Results from './components/Results';

const ColourPalettePage = () => {
  const [colours, setColours] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imageURL, setImageURL] = useState('');

  const uploadURL = (url) => {
    // TODO: make request to server
    console.log('Uploading URL');
  };

  const uploadFile = (file) => {
    // TODO: make request to server
    console.log('Uploading file');
    setImageFile(file);
    setImageURLFromFile(file);
    setColours(['#f5bc42', '#e8cd92', '#92d8e8', '#e892bd', '#f2a0c9']);
  };

  const setImageURLFromFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      {colours && imageURL
        ? <Results colours={colours} imageURL={imageURL} />
        : <ImageSelect uploadURL={uploadURL} uploadFile={uploadFile} />}
    </div>
  );
};

export default ColourPalettePage;
