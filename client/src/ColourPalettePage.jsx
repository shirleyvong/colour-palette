import React, { useState } from 'react';
import ImageSelect from './components/ImageSelect';
import Results from './components/Results';

const ColourPalettePage = () => {
  const [colours, setColours] = useState([]);
  const [imageFile, setImageFile] = useState();

  const uploadURL = (URL) => {
    // TODO: make request to server
    console.log('Uploading URL');
  };

  const uploadFile = (file) => {
    // TODO: make request to server
    console.log('Uploading file');
    setImageFile(file);
    setColours(['#f5bc42', '#e8cd92', '#92d8e8', '#e892bd', '#f2a0c9']);
  };

  return (
    <div>
      {colours && imageFile
        ? <Results colours={colours} />
        : <ImageSelect uploadURL={uploadURL} uploadFile={uploadFile} />}
    </div>
  );
};

export default ColourPalettePage;
