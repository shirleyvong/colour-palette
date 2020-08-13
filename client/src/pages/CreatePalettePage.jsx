import React, { useState } from 'react';
import axios from 'axios';
import rgbHex from 'rgb-hex';
import styled from 'styled-components';
import PalettePage from './PalettePage';
import ImageSelect from '../components/ImageSelect';
import api from '../services/api';

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

    api.createPalette(formData)
      .then((res) => {
        setColours(parseColours(res.colours))
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

  const clearImage = () => {
    setColours([]);
    setImageFile();
    setImageURL('');
  };

  const buttons = [
    {
      text: 'Save',
      onClick: () => console.log('saving'),
      colour: undefined,
    },
    {
      text: 'New',
      onClick: clearImage,
      colour: undefined,
    },
  ];

  return (
    <Div>
      {colours.length > 0 && imageURL
        ? <PalettePage colours={colours} imageURL={imageURL} buttons={buttons} />
        : <ImageSelect uploadURL={uploadURL} uploadFile={uploadFile} />}
    </Div>
  );
};

const Div = styled.div`
  flex-grow: 1;
  height: 100%;
  justify-content: center;
`;

export default CreatePalettePage;
