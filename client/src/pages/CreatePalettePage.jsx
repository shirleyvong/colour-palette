import React, { useState } from 'react';
import ImageSelect from '../components/ImageSelect';
import Results from '../components/Results';
import axios from 'axios';
import rgbHex from 'rgb-hex';
import styled from 'styled-components';

const CreatePalettePage = () => {
  const [colours, setColours] = useState([]);
  const [imageFile, setImageFile] = useState();
  const [imageURL, setImageURL] = useState('');

  const parseColours = (colours) => {
    return colours.map((colour) => '#' + rgbHex(colour.red, colour.green, colour.blue));
  }

  const uploadURL = (url) => {
    // TODO: make request to server
    console.log('Uploading URL');
  };

  const uploadFile = (file) => {
    console.log('Uploading file');
    setImageFile(file);

    const formData = new FormData();
    formData.append('file', file);
    
    axios.post('/palette',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        setColours(parseColours(res.data.colours))
        setImageURLFromFile(file);
      })
      .catch(err => { console.log(err) });
  };

  const setImageURLFromFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Div>
      {colours.length > 0 && imageURL
        ? <Results colours={colours} imageURL={imageURL} />
        : <ImageSelect uploadURL={uploadURL} uploadFile={uploadFile} />}
      {colours.length > 0 && <button onClick={() => {setColours([])}}>Try again with new pic</button>}
      {colours.length > 0 && <button onClick={() => {uploadFile(imageFile)}}>Try again</button>}
    </Div>
  );
};

const Div = styled.div`
  background-color: white;
`;

export default CreatePalettePage;
