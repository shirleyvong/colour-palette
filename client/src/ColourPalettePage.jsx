import React from 'react';
import ImageSelect from './components/ImageSelect';

const ColourPalettePage = () => {
  const uploadURL = (URL) => {
    console.log('Uploading URL');
    // TODO: make request to server
  };

  const uploadFile = (file) => {
    console.log('Uploading file');
    // TODO: make request to server
  };

  return (
    <div>
      <ImageSelect uploadURL={uploadURL} uploadFile={uploadFile} />
    </div>
  );
};

export default ColourPalettePage;
